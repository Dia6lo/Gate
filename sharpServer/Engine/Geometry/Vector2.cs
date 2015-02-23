using System;

namespace SharpServer.Engine
{
    internal class Vector2
    {
        public int X;
        public int Y;

        public Vector2(int x, int y)
        {
            X = x;
            Y = y;
        }

        public Vector2 Combine(Vector2 other)
        {
            return new Vector2(this.X + other.X, this.Y + other.Y);
        }

        public double Distance(Vector2 other)
        {
            var dx = other.X - this.X;
            var dy = other.Y - this.Y;
            return Math.Sqrt((dx * dx) + (dy * dy));
        }

        public int Manhattan(Vector2 other)
        {
            return Math.Abs(this.X - other.X) + Math.Abs(this.Y - other.Y);
        }

        public Vector2 Clone()
        {
            return new Vector2(X, Y);
        }

        public override string ToString()
        {
            return "(" + X + ", " + Y + ")";
        }
    }
}