namespace SharpServer.Engine.Factories
{
    internal static class TileFactory
    {
        public static int NewDungeon(Vector2 position)
        {
            var tile = EntityManager.CreateEntity("Tile on " + position.X + " " + position.Y);
            EntityManager.AddComponent(tile, new Transform(position));
            EntityManager.AddComponent(tile, new Tile("Dungeon"));
            return tile;
        }
    }
}