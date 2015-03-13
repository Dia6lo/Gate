using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine.Services.FlyweightComponentDB
{
    static class Tile
    {
        static Dictionary<int, string> tiles = new Dictionary<int, string>()
        {
            {1, "Dungeon"}
        };

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
