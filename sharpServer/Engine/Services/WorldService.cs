using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Services
{
    internal static class WorldService
    {
        private static class Surroundings
        {
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

            public struct Cell
            {
                public Entity[] entities;
                public string floorType;
                public Cell(string floorType, Entity[] entities)
                {
                    this.floorType = floorType;
                    this.entities = entities;
                }
            }

            public static Cell[,] GetSurroundings(int entity, int radius)
            {
                var size = radius * 2 + 1;
                var result = new Cell[size, size];
                for (int i = 0; i < size; i++)
                    for (int j = 0; j < size; j++)
                        result[i, j] = new Cell("Void", null);
                var center = EntityManager.GetComponent<Transform>(entity).Position;
                result[radius + 1, radius + 1] = MakeCell(center);
                int l;
                for (l = 0; (center.X - l > 0) && (l < radius); l ++)
                {
                    result[radius - l, radius + 1] = MakeCell(new Vector2(center.X - l, radius + 1));
                }
                int r;
                for (r = 0; (center.X + r < size) && (r < radius); r++)
                {
                    result[radius + 2 + r, radius + 1] = MakeCell(new Vector2(center.X + r + 1, radius + 1));
                }
                // Half done
                var tiles = new Cell[TilesX, TilesY];
                for (var x = 0; x < TilesX; x++)
                {
                    for (var y = 0; y < TilesY; y++)
                    {
                        var tile = EntityManager.GetComponent<Tile>(Tiles[x, y]);
                        var entities = tile.Entities
                            .ConvertAll<Entity>(id => new Entity(id, EntityManager.GetComponent<Render>(id).Type))
                            .ToArray();
                        tiles[x, y] = new Cell(tile.FloorType, entities);
                    }
                }
                return tiles;
            }
            private static Cell MakeCell (Vector2 position)
            {
                var tile = EntityManager.GetComponent<Tile>(WorldService.Tiles[position.X, position.Y]);
                var entities = tile.Entities
                            .ConvertAll<Entity>(id => new Entity(id, EntityManager.GetComponent<Render>(id).Type))
                            .ToArray();
                return new Cell(tile.FloorType, entities);
            }
        }
        static public int TilesX = 20;
        static public int TilesY = 10;
        static public int[,] Tiles = new int[TilesX, TilesY];
        static private Dictionary<int, Vector2> positions = new Dictionary<int, Vector2>(); //entity -> position

        static public void AddEntity(Vector2 position, int entity)
        {
            positions[entity] = position;
            var tile = EntityManager.GetComponent<Tile>(Tiles[position.X, position.Y]);
            var volume = EntityManager.GetComponent<Shape>(entity).Volume;
            tile.Entities.Add(entity);
            tile.ContainingVolume += volume;
        }

        static public Vector2 GetFreeTile()
        {
            Random rand = new Random();
            int x, y;
            do
            {
                x = rand.Next(1, 19);
                y = rand.Next(1, 9);
            } while (EntityManager.GetComponent<Tile>(Tiles[x, y]).ContainingVolume > 50);
            return new Vector2(x, y);
        }

        public static void Initialize()
        {
            for (var x = 0; x < TilesX; x++)
            {
                for (var y = 0; y < TilesY; y++)
                {
                    Tiles[x, y] = Factories.TileFactory.NewDungeon(new Vector2(x, y));
                    if ((y == 0) || (y == TilesY - 1) || (x == 0) || (x == TilesX - 1))
                    {
                        var wall = Factories.WallFactory.NewWall(new Vector2(x, y));
                        AddEntity(new Vector2(x, y), wall);
                    }
                }
            }
        }
        static public void MoveEntity(int entity, Vector2 position)
        {
            RemoveEntity(entity);
            AddEntity(position, entity);
        }

        static public void RemoveEntity(int entity)
        {
            var position = positions[entity];
            var tile = Tiles[position.X, position.Y];
            var entities = EntityManager.GetComponent<Tile>(tile).Entities;
            if (!entities.Contains(entity))
                throw new MissingMemberException("REMOVE ERROR: there is no entity " + EntityManager.NameFor(entity) + "(ID: " + entity + ") in tile " + position.X + ":" + position.Y);
            entities.Remove(entity);
            var volume = EntityManager.GetComponent<Shape>(entity).Volume;
            EntityManager.GetComponent<Shape>(tile).Volume -= volume;
        }
    }
}