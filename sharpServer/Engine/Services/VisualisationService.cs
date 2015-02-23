using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine.Services
{
    static class VisualisationService
    {
        // Entity -> players that see it
        static Dictionary<int, List<int>> NearbyEntities = new Dictionary<int, List<int>>();
    }
}
