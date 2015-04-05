using System.Collections.Generic;
using System.Linq;

namespace SharpServer.Engine
{
    public class Container : Component
    {
        public readonly int MaxVolume;
        private List<uint> contents;

        public Container(int maxVolume)
        {
            MaxVolume = maxVolume;
        }

        public int ContainingVolume { get; private set; }

        public uint[] Contents
        {
            get { return contents != null ? contents.ToArray() : new uint[0]; }
        }

        public bool Add(uint entity)
        {
            Shape shape;
            if (!EntityManager.TryGetComponent(entity, out shape))
                return false;
            if (ContainingVolume + shape.Volume > MaxVolume)
                return false;
            if (contents == null)
                contents = new List<uint>();
            else if (contents.Contains(entity))
                return false;
            ContainingVolume += shape.Volume;
            contents.Add(entity);
            return true;
        }

        public bool Remove(uint entity)
        {
            if (contents == null)
                return false;
            if (!contents.Contains(entity))
                return false;
            var shape = EntityManager.GetComponent<Shape>(entity);
            ContainingVolume -= shape.Volume;
            contents.Remove(entity);
            if (!contents.Any())
                contents = null;
            return true;
        }
    }
}