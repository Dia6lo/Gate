namespace SharpServer.Engine
{
    internal class Transform : Component
    {
        public Vector2 position;

        public Transform(Vector2 position)
        {
            this.position = position;
        }
    }
}