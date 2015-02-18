using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Systems
{
    internal class WorldSystem
    {
        public int tilesX;
        public int tilesY;
        public Tile[,] tiles;
        private Dictionary<int, Vector2> positions; //entity -> position
        private EntityManager entityManager;

        public WorldSystem(EntityManager em)
        {
            positions = new Dictionary<int, Vector2>();
            entityManager = em;
            tilesX = 20;
            tilesY = 10;
            tiles = new Tile[tilesX, tilesY];
            initialize();
        }

        private void initialize()
        {
            for (var x = 0; x < tilesX; x++)
            {
                for (var y = 0; y < tilesY; y++)
                {
                    tiles[x, y] = new Tile();
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
            var tile = tiles[position.x, position.y];
            var volume = entityManager.getComponent<Shape>(entity).volume;
            tile.entities.Add(entity);
            tile.volume += volume;
        }

        public void removeEntity(int entity)
        {
            var position = positions[entity];
            var tile = this.tiles[position.x, position.y];
            if (!tile.entities.Contains(entity))
                throw new MissingMemberException("REMOVE ERROR: there is no entity " + entityManager.nameFor(entity) + "(ID: " + entity + ") in tile " + position.x + ":" + position.y);
            tile.entities.Remove(entity);
            var volume = entityManager.getComponent<Shape>(entity).volume;
            tile.volume -= volume;
        }

        public void moveEntity(int entity, Vector2 position)
        {
            removeEntity(entity);
            addEntity(position, entity);
        }
    }
}