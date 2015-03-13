using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine
{
    class Container: Component
    {
        public int MaxVolume;
        public int ContainingVolume;
        public List<uint> Entities = new List<uint>();
        
        public Container(int maxVolume)
        {
            MaxVolume = maxVolume;
        }
    }
}
