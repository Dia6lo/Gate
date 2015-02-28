namespace SharpServer.Engine.Factories
{
    internal static class TileFactory
    {
        public static uint Create(Vector2 position)
        {
            var tile = EntityBaseFactory.Create(position, "Tile on " + position.X + " " + position.Y);
            EntityManager.AddComponent(tile, new Tile("Dungeon"));
            return tile;
        }
    }
}