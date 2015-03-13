namespace SharpServer.Engine.Services
{
    public static class MovementService
    {
        public static bool MoveEntity(uint entity, Vector2 destination)
        {
            if (CooldownService.OnCooldown(entity))
                return false;

            var position = EntityManager.GetComponent<Transform>(entity).Position;
            var finishTile = WorldService.Tiles[destination.X, destination.Y];
            var finishTileContainer = EntityManager.GetComponent<Container>(finishTile);
            if (finishTileContainer.ContainingVolume +
                EntityManager.GetComponent<Shape>(entity).Volume >= finishTileContainer.MaxVolume)
                return false;
            WorldService.MoveEntity(entity, position, destination);
            position.X = destination.X;
            position.Y = destination.Y;
            var cd = EntityManager.GetComponent<Moving>(entity).Speed;
            CooldownService.Add(entity, cd);
            return true;
        }
    }
}