using System.Collections.Generic;
using System.Linq;

namespace SharpServer.Engine
{
    public class Tile : Component
    {
        private static readonly Dictionary<int, string> tiles = new Dictionary<int, string>
        {
            {0, "Undefined"},
            {1, "Dungeon"}
        };

        public int FloorType;

        public Tile(string floorType)
        {
            FloorType = GetCode(floorType);
        }

        public static int GetCode(string name)
        {
            return tiles.ContainsValue(name) ? tiles.First(pair => pair.Value == name).Key : 0;
        }

        public static string GetName(int code)
        {
            return tiles.ContainsKey(code) ? tiles[code] : "Undefined";
        }
    }
}