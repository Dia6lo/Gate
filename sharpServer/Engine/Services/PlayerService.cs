using System;
using System.Collections.Generic;

// WARNING: No more BIG BULLSHIT, but still shit
namespace SharpServer.Engine.Services
{
    internal static class PlayerService
    {
        private static int lowestUnassignedPlayerID = 1;
        private static Dictionary<int, int> playersToEntities = new Dictionary<int, int>();
        public static void DestroyPlayer(int id)
        {
            var player = playersToEntities[id];
            var position = EntityManager.GetComponent<Transform>(player).Position;
            WorldService.RemoveEntity(player);
            EntityManager.DestroyEntity(player);
            playersToEntities.Remove(id);
            ConnectionService.BroadcastToAll("player_exit", new PlayerInfo(id, position));
        }

        public static int InitializePlayer()
        {
            var position = WorldService.GetFreeTile();
            var id = GenerateNewPlayerID();
            if (id < 1)
            {
                throw new ArgumentOutOfRangeException("WTF? PlayerID < 1");
            }
            var player = Factories.PlayerFactory.NewPlayer(id, position);
            playersToEntities[id] = player;
            WorldService.AddEntity(position, player);
            var playerInfo = new PlayerInfo(id, position);
            ConnectionService.BroadcastToAll("new_player", playerInfo);
            Console.WriteLine(ConnectionService.DebugMessage("new_player", playerInfo));
            return id;
        }

        public static void SendSurroundings(int id)
        {
            var player = playersToEntities[id];
            var surroundings = WorldService.GetSurroundings(player, Player.VisionRange);
            ConnectionService.SendMessage("map", surroundings, id);
            Console.WriteLine(ConnectionService.DebugMessage("map", surroundings));
        }

        public static void MovePlayer(int id, string direction)
        {
            int player;
            if (!playersToEntities.TryGetValue(id, out player))
                return;
            var offset = GetOffset(direction);
            var position = EntityManager.GetComponent<Transform>(player).Position;
            var destination = position.Combine(offset);
            if (MovementService.MoveEntity(player, destination))
            {
                ConnectionService.BroadcastToAll("map_update", new PlayerInfo(player, destination));
            }
        }

        private static int GenerateNewPlayerID()
        {
            //TODO: Make it synchronous
            {
                if (lowestUnassignedPlayerID < int.MaxValue)
                {
                    return lowestUnassignedPlayerID++;
                }
                else
                {
                    for (var i = 1; i < int.MaxValue; i++)
                    {
                        if (!playersToEntities.ContainsKey(i))
                            return i;
                    }
                    throw new IndexOutOfRangeException("ERROR: no available Player IDs; too many players(wow)!");
                }
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

        public struct PlayerInfo
        {
            public int id;
            public Vector2 position;

            public PlayerInfo(int id, Vector2 position)
            {
                this.id = id;
                this.position = position;
            }
        }
    }
}