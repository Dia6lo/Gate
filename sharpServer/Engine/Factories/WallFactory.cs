namespace SharpServer.Engine.Factories
{
    internal static class WallFactory
    {
        public static int NewWall(Vector2 position)
        {
            var wall = EntityManager.CreateEntity("Wall");
            EntityManager.AddComponent(wall, new Transform(position));
            EntityManager.AddComponent(wall, new Render("Dungeon wall"));
            EntityManager.AddComponent(wall, new Shape(100));
            return wall;
        }
    }
}