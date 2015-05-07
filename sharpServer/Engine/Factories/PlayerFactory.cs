namespace SharpServer.Engine.Factories
{
    public static class PlayerFactory
    {
        public static uint Create(int id, Vector2 position)
        {
            var player = EntityBaseFactory.Create(position, "Player " + id);
            EntityManager.AddComponents(player, 
                new Player("Player " + id),
                new Render("Player", true, "Shitty hero", "Hero", "Really shitty hero"),
                new Moving(100),
                new Shape(75),
                new Health(100));
            return player;
        }
    }
}