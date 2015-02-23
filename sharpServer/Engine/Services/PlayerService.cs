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

        public static Tile[,] GetMap(int id)
        {
            var player = playersToEntities[id];
            var tiles = new Tile[WorldService.TilesX, WorldService.TilesY];
            for (var x = 0; x < WorldService.TilesX; x++)
            {
                for (var y = 0; y < WorldService.TilesY; y++)
                {
                    var tile = WorldService.Tiles[x, y];
                    var entities = EntityManager.GetComponent<Engine.Tile>(tile).Entities
                        .ConvertAll<Entity>(entity => new Entity(entity, EntityManager.GetComponent<Render>(entity).Type))
                        .ToArray();
                    tiles[x, y] = new Tile("Dungeon", entities);
                }
            }
            return tiles;
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
            ConnectionService.SendMessage("map", GetMap(id), id);
            Console.WriteLine(ConnectionService.DebugMessage("map", PlayerService.GetMap(id)));
            return id;
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

        public struct Entity
        {
            public int entity;
            public string type;

            public Entity(int entity, string type)
            {
                this.entity = entity;
                this.type = type;
            }
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
        public struct Tile
        {
            public Entity[] entities;
            public string floorType;
            public Tile(string floorType, Entity[] entities)
            {
                this.floorType = floorType;
                this.entities = entities;
            }
        }
    }
}