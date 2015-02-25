﻿namespace SharpServer.Engine
{
    internal class Transform : Component
    {
        public Vector2 Position;

        public Transform(Vector2 position)
        {
            Position = position;
        }
    }
}