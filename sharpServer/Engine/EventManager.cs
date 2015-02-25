using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class EventManager
    {
        private List<int> _eventQueue = new List<int>();

        private Dictionary<string, Dictionary<int, Dictionary<string, int>>> _subscriptions =
            new Dictionary<string, Dictionary<int, Dictionary<string, int>>>();

        public void EventDispatcher()
        {
        }

        public void EventHandler()
        {
        }
    }
}