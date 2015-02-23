namespace SharpServer.Engine.Services
{
    internal static class MovementService
    {
        public static bool MoveEntity(int entity, Vector2 destination)
        {
            var position = EntityManager.GetComponent<Transform>(entity).Position;
            var finishTile = WorldService.Tiles[destination.X, destination.Y];
            if (EntityManager.GetComponent<Tile>(finishTile).ContainingVolume + EntityManager.GetComponent<Shape>(entity).Volume < Tile.MaxVolume)
            {
                position.X = destination.X;
                position.Y = destination.Y;
                WorldService.MoveEntity(entity, position);
                return true;
            }
            return false;
        }
    }
}