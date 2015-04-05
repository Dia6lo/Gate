using System;
using SharpServer.Engine.Factories;

namespace SharpServer.Engine.Services
{
    public static class WorldService
    {
        public const int TilesX = 1000;
        public const int TilesY = 1000;

        public static void AddEntity(Vector2 position, uint entity)
        {
            EntityManager.GetComponent<Container>(Tiles[position.X, position.Y]).Add(entity);
        }

        public static Vector2 GetFreeTile()
        {
            var rand = new Random();
            int x, y;
            do
            {
                x = rand.Next(1, 19);
                y = rand.Next(1, 9);
            } while (EntityManager.GetComponent<Container>(Tiles[x, y]).ContainingVolume > 50);
            return new Vector2(x, y);
        }

        public static void Initialize()
        {
            for (var x = 0; x < TilesX; x++)
            {
                for (var y = 0; y < TilesY; y++)
                {
                    Tiles[x, y] = TileFactory.Create(new Vector2(x, y));
                    if ((y != 0) && (y != TilesY - 1) && (x != 0) && (x != TilesX - 1)) continue;
                    var wall = WallFactory.Create(new Vector2(x, y));
                    AddEntity(new Vector2(x, y), wall);
                }
            }
        }

        public static void MoveEntity(uint entity, Vector2 startPosition, Vector2 finishPosition)
        {
            RemoveEntity(entity, startPosition);
            AddEntity(finishPosition, entity);
        }

        public static void RemoveEntity(uint entity, Vector2 position)
        {
            //var position = Positions[entity];
            if (!EntityManager.GetComponent<Container>(Tiles[position.X, position.Y]).Remove(entity))
                throw new MissingMemberException("REMOVE ERROR: there is no entity " + EntityManager.NameFor(entity) +
                                                 "(ID: " + entity + ") in tile " + position.X + ":" + position.Y);
        }

        public static readonly uint[,] Tiles = new uint[TilesX, TilesY];
    }
}