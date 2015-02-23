using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class Tile : Component
    {
        public static int MaxVolume = 100;
        public string FloorType;
        public List<int> Entities = new List<int>();
        public int ContainingVolume = 0;

        public Tile(string floorType)
        {
            FloorType = floorType;
        }
    }
}