using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class Tile : Component
    {
        public static int MaxVolume = 100;
        public int ContainingVolume;
        public List<uint> Entities = new List<uint>();
        public string FloorType;

        public Tile(string floorType)
        {
            FloorType = floorType;
        }
    }
}