using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine
{
    class EventManager
    {
        List<int> eventQueue = new List<int>();

        Dictionary<string, Dictionary<int, Dictionary<string, int>>> subscriptions = new Dictionary<string,Dictionary<int,Dictionary<string,int>>>();

        public void EventDispatcher ()
        {

        }

        public void EventHandler()
        {

        }
    }
}
