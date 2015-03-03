namespace SharpServer.Engine
{
    internal class Health : Component
    {
        public uint CurrentHealth;
        public uint MaxHealth;

        public Health(uint maxHealth)
        {
            MaxHealth = maxHealth;
            CurrentHealth = maxHealth;
        }
    }
}