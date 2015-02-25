using System.Collections.Generic;

namespace SharpServer.Engine.Services
{
    internal static class VisualisationService
    {
        // Entity -> players that see it
        private static Dictionary<int, List<int>> _nearbyEntities = new Dictionary<int, List<int>>();
    }
}