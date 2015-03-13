using System;
using System.Collections.Generic;
using SharpServer.Engine.Factories;

// WARNING: No more BIG BULLSHIT, but still shit

namespace SharpServer.Engine.Services
{
    public static class PlayerService
    {
        private const int VisionRange = 5;
        private static int _lowestUnassignedPlayerId = 1;
        private static readonly Dictionary<int, uint> PlayersToEntities = new Dictionary<int, uint>();

        public static void DestroyPlayer(int id)
        {
            var player = PlayersToEntities[id];
            var position = EntityManager.GetComponent<Transform>(player);
            WorldService.RemoveEntity(player, position.Position);
            EntityManager.DestroyEntity(player);
            PlayersToEntities.Remove(id);
            BroadcastMap();
        }

        private static void BroadcastMap()
        {
            foreach (var player in PlayersToEntities)
                ConnectionService.SendMessage("map", InformationService.GetSurroundings(player.Value, VisionRange),
                    player.Key);
        }

        public static int InitializePlayer()
        {
            var position = WorldService.GetFreeTile();
            var id = GenerateNewPlayerId();
            if (id < 1)
            {
                throw new ArgumentOutOfRangeException("WTF? PlayerID < 1");
            }
            var player = PlayerFactory.Create(id, position);
            WorldService.AddEntity(position, player);
            BroadcastMap();
            PlayersToEntities[id] = player;
            return id;
        }

        public static void SendSurroundings(int id, object data)
        {
            var player = PlayersToEntities[id];
            var surroundings = InformationService.GetSurroundings(player, VisionRange);
            ConnectionService.SendMessage("map", surroundings, id);
            //Console.WriteLine(ConnectionService.DebugMessage("map", surroundings));
        }

        public static void MovePlayer(int id, object data)
        {
            var direction = (string) data;
            uint player;
            if (!PlayersToEntities.TryGetValue(id, out player))
                return;
            var offset = GetOffset(direction);
            var position = EntityManager.GetComponent<Transform>(player).Position;
            var destination = position.Combine(offset);
            if (MovementService.MoveEntity(player, destination))
            {
                BroadcastMap();
            }
        }

        private static int GenerateNewPlayerId()
        {
            //TODO: Make it synchronous
            {
                if (_lowestUnassignedPlayerId < Int32.MaxValue)
                {
                    return _lowestUnassignedPlayerId++;
                }
                for (var i = 1; i < Int32.MaxValue; i++)
                {
                    if (!PlayersToEntities.ContainsKey(i))
                        return i;
                }
                throw new IndexOutOfRangeException("ERROR: no available Player IDs; too many players(wow)!");
            }
        }

        private static Vector2 GetOffset(string direction)
        {
            var movement = new Vector2(0, 0);
            switch (direction)
            {
                case ("left"):
                    movement.X = -1;
                    break;

                case ("up"):
                    movement.Y = -1;
                    break;

                case ("right"):
                    movement.X = 1;
                    break;

                case ("down"):
                    movement.Y = 1;
                    break;
            }
            return movement;
        }
    }
}