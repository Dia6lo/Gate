using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Services
{
    internal static class WorldService
    {
        static public int[,] Tiles = new int[TilesX, TilesY];
        static public int TilesX = 20;
        static public int TilesY = 10;
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
            } while (EntityManager.GetComponent<Engine.Tile>(Tiles[x, y]).ContainingVolume > 50);
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