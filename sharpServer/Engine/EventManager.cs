using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine
{
    class EventManager
    {
        List<int> eventQueue;

        Dictionary<string, Dictionary<int, Dictionary<string, int>>> subscriptions;

        public EventManager()
        {
            eventQueue = new List<int>();
        }

        public void eventDispatcher ()
        {

        }

        public void eventHandler()
        {

        }
    }
}
