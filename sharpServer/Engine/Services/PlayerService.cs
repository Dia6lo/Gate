using System;
using System.Collections.Generic;
using SharpServer.Engine.Factories;

// WARNING: No more BIG BULLSHIT, but still shit

namespace SharpServer.Engine.Services
{
    internal static class PlayerService
    {
        private static int _lowestUnassignedPlayerId = 1;
        private static readonly Dictionary<int, int> PlayersToEntities = new Dictionary<int, int>();

        public static void DestroyPlayer(int id)
        {
            var player = PlayersToEntities[id];
            var position = EntityManager.GetComponent<Transform>(player);
            WorldService.RemoveEntity(player, position.Position);
            EntityManager.DestroyEntity(player);
            PlayersToEntities.Remove(id);
            BroadcastMapToAll();
        }

        private static void BroadcastMapToAll()
        {
            foreach (var player in PlayersToEntities)
                ConnectionService.SendMessage("map", InformationService.GetSurroundings(player.Value, Player.VisionRange),
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
            var player = PlayerFactory.NewPlayer(id, position);
            WorldService.AddEntity(position, player);
            BroadcastMapToAll();
            PlayersToEntities[id] = player;
            return id;
        }

        public static void SendSurroundings(int id)
        {
            var player = PlayersToEntities[id];
            var surroundings = InformationService.GetSurroundings(player, Player.VisionRange);
            ConnectionService.SendMessage("map", surroundings, id);
            //Console.WriteLine(ConnectionService.DebugMessage("map", surroundings));
        }

        public static void MovePlayer(int id, string direction)
        {
            int player;
            if (!PlayersToEntities.TryGetValue(id, out player))
                return;
            var offset = GetOffset(direction);
            var position = EntityManager.GetComponent<Transform>(player).Position;
            var destination = position.Combine(offset);
            if (MovementService.MoveEntity(player, destination))
            {
                BroadcastMapToAll();
            }
        }

        private static int GenerateNewPlayerId()
        {
            //TODO: Make it synchronous
            {
                if (_lowestUnassignedPlayerId < int.MaxValue)
                {
                    return _lowestUnassignedPlayerId++;
                }
                for (var i = 1; i < int.MaxValue; i++)
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