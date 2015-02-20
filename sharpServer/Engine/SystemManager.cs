using SharpServer.Engine.Services;

namespace SharpServer.Engine
{
    internal class SystemManager
    {
        private class StaticSystems
        {
            private PlayerService playerSystem;
            private MovementService movementSystem;
            private WorldService worldSystem;

            public StaticSystems(EntityManager entityManager)
            {
                worldSystem = new WorldService(entityManager);
                movementSystem = new MovementService(
                    entityManager,
                    worldSystem);
                playerSystem = new PlayerService(
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