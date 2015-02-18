namespace SharpServer.Engine.Factories
{
    internal class WallFactory
    {
        public static int newWall(EntityManager em, Vector2 position)
        {
            var wall = em.createEntity("Wall");
            em.addComponent(wall, new Transform(position));
            em.addComponent(wall, new Render("Dungeon wall"));
            return wall;
        }
    }
}