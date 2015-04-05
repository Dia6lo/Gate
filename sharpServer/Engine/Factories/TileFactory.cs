namespace SharpServer.Engine.Factories
{
    public static class TileFactory
    {
        public static uint Create(Vector2 position)
        {
            var tile = EntityBaseFactory.Create(position, "Tile");
            EntityManager.AddComponent(tile, new Tile("Dungeon"));
            EntityManager.AddComponent(tile, new Container(100));
            return tile;
        }
    }
}