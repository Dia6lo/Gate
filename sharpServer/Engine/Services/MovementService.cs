namespace SharpServer.Engine.Services
{
    internal class MovementService: Service
    {
        private EntityManager entityManager;
        private WorldService worldSystem;

        public MovementService(EntityManager entityManager, WorldService worldSystem)
        {
            this.entityManager = entityManager;
            this.worldSystem = worldSystem;
        }

        public bool moveEntity(int entity, Vector2 destination)
        {
            var position = entityManager.getComponent<Transform>(entity).position;
            var finishTile = worldSystem.tiles[destination.x, destination.y];
            if (entityManager.getComponent<Tile>(finishTile).containingVolume + entityManager.getComponent<Shape>(entity).volume < Tile.maxVolume)
            {
                position.x = destination.x;
                position.y = destination.y;
                worldSystem.moveEntity(entity, position);
                return true;
            }
            return false;
        }
    }
}