using Microsoft.VisualStudio.TestTools.UnitTesting;

using SharpServer.Engine;

namespace Server_Tests
{
    [TestClass]
    public class EntityManagerTests
    {
        [TestMethod]
        public void GeneralTest()
        {
            const string str = "Test";
            var entity = EntityManager.CreateEntity(str);
            Assert.AreEqual(EntityManager.NameFor(entity), str);
        }
    }
}
