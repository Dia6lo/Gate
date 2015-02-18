namespace SharpServer.Engine.Factories
{
    internal class PlayerFactory
    {
        public static int newPlayer(EntityManager em, int id, Vector2 position)
        {
            var player = em.createEntity("Player " + id);
            em.addComponent(player, new Transform(position));
            em.addComponent(player, new Player("Player " + id));
            em.addComponent(player, new Render("Player"));
            em.addComponent(player, new Shape(75));
            return player;
        }
    }
}