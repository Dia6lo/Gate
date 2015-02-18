using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class Tile : Component
    {
        public static int maxVolume = 100;
        public List<int> entities;
        public int volume;

        public Tile()
        {
            entities = new List<int>();
            volume = 0;
        }
    }
}