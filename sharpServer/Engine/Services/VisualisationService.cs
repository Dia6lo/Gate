using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine.Services
{
    class VisualisationService: Service
    {
        // Entity -> players that see it
        Dictionary<int, List<int>> nearbyEntities;
        private EntityManager entityManager;

        public VisualisationService (EntityManager em)
        {
            entityManager = em;
            nearbyEntities = new Dictionary<int, List<int>>();
        }

        void a() { }
    }
}
