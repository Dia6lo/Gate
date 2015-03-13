using System;

namespace SharpServer.Engine
{
    public class Vector2
    {
        public int X;
        public int Y;

        public Vector2(int x, int y)
        {
            X = x;
            Y = y;
        }

        public Vector2 Clone()
        {
            return new Vector2(X, Y);
        }

        public Vector2 Combine(Vector2 other)
        {
            return new Vector2(X + other.X, Y + other.Y);
        }

        public double Distance(Vector2 other)
        {
            var dx = other.X - X;
            var dy = other.Y - Y;
            return Math.Sqrt((dx*dx) + (dy*dy));
        }

        public int Manhattan(Vector2 other)
        {
            return Math.Abs(X - other.X) + Math.Abs(Y - other.Y);
        }

        public override string ToString()
        {
            return "(" + X + ", " + Y + ")";
        }
    }
}