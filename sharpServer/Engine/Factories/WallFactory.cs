namespace SharpServer.Engine.Factories
{
    public static class WallFactory
    {
        public static uint Create(Vector2 position)
        {
            var wall = EntityBaseFactory.Create(position, "Wall");
            EntityManager.AddComponent(wall, new Render("Dungeon wall", false));
            EntityManager.AddComponent(wall, new Shape(100));
            return wall;
        }
    }
}