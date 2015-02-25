using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class Tile : Component
    {
        public static int MaxVolume = 100;
        public int ContainingVolume = 0;
        public List<int> Entities = new List<int>();
        public string FloorType;

        public Tile(string floorType)
        {
            FloorType = floorType;
        }
    }
}