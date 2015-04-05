using Microsoft.VisualStudio.TestTools.UnitTesting;
using SharpServer.Engine;

namespace Server_Tests.Components
{
    [TestClass]
    public class Container
    {
        private SharpServer.Engine.Container container;
        private uint entity;

        private void CreateEntity(int maxVolume)
        {
            container = new SharpServer.Engine.Container(maxVolume);
            entity = EntityManager.CreateEntity();
        }

        [TestMethod]
        public void AddRemove()
        {
            const int maxVolume = 100;
            CreateEntity(maxVolume);
            EntityManager.AddComponent(entity, new Shape(50));
            Assert.AreEqual(container.Add(entity), true);
            CollectionAssert.AreEqual(container.Contents, new[] {entity});
            Assert.AreEqual(container.Remove(entity), true);
        }

        [TestMethod]
        public void DuplicatingAddRemove()
        {
            const int maxVolume = 100;
            CreateEntity(maxVolume);
            EntityManager.AddComponent(entity, new Shape(50));
            Assert.AreEqual(container.Add(entity), true);
            Assert.AreEqual(container.Add(entity), false);
            CollectionAssert.AreEqual(container.Contents, new[] { entity });
            Assert.AreEqual(container.Remove(entity), true);
            Assert.AreEqual(container.Remove(entity), false);
        }

        [TestMethod]
        public void RemoveAbsent()
        {
            const int maxVolume = 100;
            CreateEntity(maxVolume);
            EntityManager.AddComponent(entity, new Shape(50));
            Assert.AreEqual(container.Add(entity), true);
            Assert.AreEqual(container.Remove(entity + 1), false);
        }

        [TestMethod]
        public void Overflow()
        {
            const int maxVolume = 10;
            CreateEntity(maxVolume);
            EntityManager.AddComponent(entity, new Shape(20));
            Assert.AreEqual(container.Add(entity), false);
        }
    }
}
