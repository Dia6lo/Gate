using SharpServer.Engine.Systems;

namespace SharpServer.Engine
{
    internal class SystemManager
    {
        private class StaticSystems
        {
            private PlayerSystem playerSystem;
            private MovementSystem movementSystem;
            private WorldSystem worldSystem;

            public StaticSystems(EntityManager entityManager)
            {
                worldSystem = new WorldSystem(entityManager);
                movementSystem = new MovementSystem(
                    entityManager,
                    worldSystem);
                playerSystem = new PlayerSystem(
                    entityManager,
                    worldSystem,
                    movementSystem);
            }
        }

        private StaticSystems staticSystems;

        public SystemManager(EntityManager entityManager)
        {
            staticSystems = new StaticSystems(entityManager);
        }
    }
}