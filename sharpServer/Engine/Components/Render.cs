﻿namespace SharpServer.Engine
{
    public class Render : Component
    {
        public string Description;
        public bool HaveDescription;
        public string Name;
        public string Sprite;
        public string Type;

        public Render(string sprite, bool haveDescription = false, string name = "", string type = "", string description = "")
        {
            Sprite = sprite;
            HaveDescription = haveDescription;
            if (!HaveDescription) return;
            Name = name;
            Type = type;
            Description = description;
        }
    }
}