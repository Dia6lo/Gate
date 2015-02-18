namespace SharpServer.Engine.Factories
{
    internal class WallFactory
    {
        public static int newWall(EntityManager em, Vector2 position)
        {
            var wall = em.createEntity("Wall");
            em.addComponent(wall, new Transform(position));
            em.addComponent(wall, new Render("Dungeon wall"));
            em.addComponent(wall, new Shape(100));
            return wall;
        }
    }
}