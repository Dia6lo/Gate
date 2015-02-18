namespace SharpServer.Engine.Systems
{
    internal class MovementSystem
    {
        private EntityManager entityManager;
        private WorldSystem worldSystem;

        public MovementSystem(EntityManager entityManager, WorldSystem worldSystem)
        {
            this.entityManager = entityManager;
            this.worldSystem = worldSystem;
        }

        public bool moveEntity(int entity, Vector2 destination)
        {
            var position = entityManager.getComponent<Transform>(entity).position;
            var startingTile = worldSystem.tiles[position.x, position.y];
            var finishTile = worldSystem.tiles[destination.x, destination.y];
            if (finishTile.volume + entityManager.getComponent<Shape>(entity).volume < Tile.maxVolume)
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