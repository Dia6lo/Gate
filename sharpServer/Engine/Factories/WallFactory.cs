namespace SharpServer.Engine.Factories
{
    public static class WallFactory
    {
        public static uint Create(Vector2 position)
        {
            var wall = EntityBaseFactory.Create(position, "Wall");
            EntityManager.AddComponents(wall, 
                new Render("Dungeon wall"),
                new Shape(100));
            return wall;
        }
    }
}