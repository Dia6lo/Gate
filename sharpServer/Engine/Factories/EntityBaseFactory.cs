namespace SharpServer.Engine.Factories
{
    internal static class EntityBaseFactory
    {
        public static uint Create(Vector2 position, string description = "No description")
        {
            var entity = EntityManager.CreateEntity(description);
            EntityManager.AddComponent(entity, new Transform(position));
            return entity;
        }
    }
}