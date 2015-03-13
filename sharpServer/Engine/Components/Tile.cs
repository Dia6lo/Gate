using System.Collections.Generic;

namespace SharpServer.Engine
{
    public class Tile : Component
    {
        public int FloorType;

        public Tile(string floorType)
        {
            FloorType = Services.FlyweightComponentDB.Tile.GetCode(floorType);
        }
    }
}