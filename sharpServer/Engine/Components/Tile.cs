using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class Tile : Component
    {
        public static int maxVolume = 100;
        public string floorType;
        public List<int> entities;
        public int containingVolume;

        public Tile(string floorType)
        {
            this.floorType = floorType;
            entities = new List<int>();
            containingVolume = 0;
        }
    }
}