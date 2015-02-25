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
                ConnectionService.SendMessage("map", Surroundings.GetSurroundings(player.Value, Player.VisionRange),
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
            var surroundings = Surroundings.GetSurroundings(player, Player.VisionRange);
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

        public static class Surroundings
        {
            public static Cell[,] GetSurroundings(int entity, int radius)
            {
                var size = radius*2 + 1;
                var result = new Cell[size, size];
                var center = EntityManager.GetComponent<Transform>(entity).Position;
                for (var i = 0; i < radius*2 + 1; i++)
                    for (var j = 0; j < radius*2 + 1; j++)
                        result[i, j] = MakeCell(new Vector2(center.X - radius + i, center.Y - radius + j));
                return result;
            }

            private static Cell MakeCell(Vector2 position)
            {
                if ((position.X < 0) || (position.Y < 0) || (position.X >= WorldService.TilesX) ||
                    (position.Y >= WorldService.TilesY))
                    return new Cell("Void", new Entity[0]);
                var tile = EntityManager.GetComponent<Tile>(WorldService.Tiles[position.X, position.Y]);
                var entities = tile.Entities
                    .ConvertAll(id => new Entity(id, EntityManager.GetComponent<Render>(id).Type))
                    .ToArray();
                return new Cell(tile.FloorType, entities);
            }

            public struct Entity
            {
                public int Id;
                public string Type;

                public Entity(int id, string type)
                {
                    Id = id;
                    Type = type;
                }
            }

            public struct Cell
            {
                public Entity[] Entities;
                public string FloorType;

                public Cell(string floorType, Entity[] entities)
                {
                    FloorType = floorType;
                    Entities = entities;
                }
            }
        }
    }
}