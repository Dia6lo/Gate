namespace SharpServer.Engine
{
    internal class Player : Component
    {
        public static int visionRange = 5;
        public string name;

        public Player(string name)
        {
            this.name = name;
        }
    }
}