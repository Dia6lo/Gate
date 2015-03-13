namespace SharpServer.Engine
{
    public class Health : Component
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