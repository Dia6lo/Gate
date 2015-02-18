using System;

namespace SharpServer.Engine
{
    internal class Vector2
    {
        public int x;
        public int y;

        public Vector2(int x, int y)
        {
            this.x = x;
            this.y = y;
        }

        public Vector2 combine(Vector2 other)
        {
            return new Vector2(this.x + other.x, this.y + other.y);
        }

        public double distance(Vector2 other)
        {
            var dx = other.x - this.x;
            var dy = other.y - this.y;
            return Math.Sqrt((dx * dx) + (dy * dy));
        }

        public int manhattan(Vector2 other)
        {
            return Math.Abs(this.x - other.x) + Math.Abs(this.y - other.y);
        }

        public Vector2 clone()
        {
            return new Vector2(x, y);
        }

        public string toString()
        {
            return "(" + x + ", " + y + ")";
        }
    }
}