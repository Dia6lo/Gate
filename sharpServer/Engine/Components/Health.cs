namespace SharpServer.Engine
{
    class Health: Component
    {
        public uint MaxHealth;
        public uint CurrentHealth;

        public Health(uint maxHealth)
        {
            MaxHealth = maxHealth;
            CurrentHealth = maxHealth;
        }
    }
}
