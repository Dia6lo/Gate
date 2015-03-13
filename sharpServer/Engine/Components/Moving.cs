namespace SharpServer.Engine
{
    //TODO: Make a better name for this comp
    public class Moving : Component
    {
        public int Speed;

        public Moving(int speed)
        {
            Speed = speed;
        }
    }
}