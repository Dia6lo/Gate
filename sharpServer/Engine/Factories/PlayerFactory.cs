namespace SharpServer.Engine.Factories
{
    internal static class PlayerFactory
    {
        public static int NewPlayer(int id, Vector2 position)
        {
            var player = EntityManager.CreateEntity("Player " + id);
            EntityManager.AddComponent(player, new Transform(position));
            EntityManager.AddComponent(player, new Player("Player " + id));
            EntityManager.AddComponent(player, new Render("Player"));
            EntityManager.AddComponent(player, new Shape(75));
            return player;
        }
    }
}