﻿namespace SharpServer.Engine.Factories
{
    public static class PlayerFactory
    {
        public static uint Create(int id, Vector2 position)
        {
            var player = EntityBaseFactory.Create(position, "Player " + id);
            EntityManager.AddComponent(player, new Player("Player " + id));
            EntityManager.AddComponent(player, new Render("Player", true, "Shitty hero", "Hero", "Really shitty hero"));
            EntityManager.AddComponent(player, new Moving(100));
            EntityManager.AddComponent(player, new Shape(75));
            EntityManager.AddComponent(player, new Health(100));
            return player;
        }
    }
}