namespace SharpServer.Engine
{
    internal class Player : Component
    {
        public const int VisionRange = 5;
        public string Name;

        public Player(string name)
        {
            Name = name;
        }
    }
}