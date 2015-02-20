using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine.Factories
{
    class TileFactory
    {
        public static int newDungeon(EntityManager em, Vector2 position)
        {
            var tile = em.createEntity("Tile on " + position.x + " " + position.y);
            em.addComponent(tile, new Transform(position));
            em.addComponent(tile, new Tile("Dungeon"));
            return tile;
        }
    }
}
