namespace SharpServer.Engine.Factories
{
    public static class TileFactory
    {
        public static uint Create(Vector2 position)
        {
            var tile = EntityBaseFactory.Create(position, "Tile");
            EntityManager.AddComponents(tile, 
                new Tile("Dungeon"),
                new Container(100));
            return tile;
        }
    }
}