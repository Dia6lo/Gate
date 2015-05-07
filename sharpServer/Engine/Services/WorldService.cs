using System;
using SharpServer.Engine.Factories;

namespace SharpServer.Engine.Services
{
    public static class WorldService
    {
        public const int Width = 20;
        public const int Height = 10;

        public static void AddEntity(Vector2 position, uint entity)
        {
            EntityManager.GetComponent<Container>(Tiles[position.X, position.Y]).Add(entity);
        }

        public static Vector2 GetFreeTile(int neededVolume)
        {
            var rand = new Random();
            int x, y;
            do
            {
                x = rand.Next(0, Width);
                y = rand.Next(0, Height);
            } while (EntityManager.GetComponent<Container>(Tiles[x, y]).ContainingVolume > neededVolume);
            return new Vector2(x, y);
        }

        public static void Initialize()
        {
            for (var x = 0; x < Width; x++)
            {
                for (var y = 0; y < Height; y++)
                {
                    Tiles[x, y] = TileFactory.Create(new Vector2(x, y));
                    if ((y != 0) && (y != Height - 1) && (x != 0) && (x != Width - 1)) continue;
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

        public static readonly uint[,] Tiles = new uint[Width, Height];
    }
}