using System.Collections.Generic;

namespace SharpServer.Engine
{
    internal class EventManager
    {
        public delegate void Handler();

        private List<int> _eventQueue = new List<int>();

        private Dictionary<string, Dictionary<int, Dictionary<string, int>>> _subscriptions =
            new Dictionary<string, Dictionary<int, Dictionary<string, int>>>();

        private Dictionary<string, int> eventDb;

        public void EventDispatcher()
        {
        }

        public void EventHandler()
        {
        }
    }
}