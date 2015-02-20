using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Services
{
    internal class WorldService: Service
    {
        public int tilesX;
        public int tilesY;
        public int[,] tiles;
        private Dictionary<int, Vector2> positions; //entity -> position
        private EntityManager entityManager;

        public WorldService(EntityManager em)
        {
            positions = new Dictionary<int, Vector2>();
            entityManager = em;
            tilesX = 20;
            tilesY = 10;
            tiles = new int[tilesX, tilesY];
            initialize();
        }

        private void initialize()
        {
            for (var x = 0; x < tilesX; x++)
            {
                for (var y = 0; y < tilesY; y++)
                {
                    tiles[x, y] = Factories.TileFactory.newDungeon(entityManager, new Vector2(x, y));
                    if ((y == 0) || (y == tilesY - 1) || (x == 0) || (x == tilesX - 1))
                    {
                        var wall = Factories.WallFactory.newWall(entityManager, new Vector2(x, y));
                        addEntity(new Vector2(x, y), wall);
                    }
                }
            }
        }

        public void addEntity(Vector2 position, int entity)
        {
            positions[entity] = position;
            var tile = entityManager.getComponent<Tile>(tiles[position.x, position.y]);
            var volume = entityManager.getComponent<Shape>(entity).volume;
            tile.entities.Add(entity);
            tile.containingVolume += volume;
        }

        public void removeEntity(int entity)
        {
            var position = positions[entity];
            var tile = this.tiles[position.x, position.y];
            var entities = entityManager.getComponent<Tile>(tile).entities;
            if (!entities.Contains(entity))
                throw new MissingMemberException("REMOVE ERROR: there is no entity " + entityManager.nameFor(entity) + "(ID: " + entity + ") in tile " + position.x + ":" + position.y);
            entities.Remove(entity);
            var volume = entityManager.getComponent<Shape>(entity).volume;
            entityManager.getComponent<Shape>(tile).volume -= volume;
        }

        public void moveEntity(int entity, Vector2 position)
        {
            removeEntity(entity);
            addEntity(position, entity);
        }
    }
}