namespace SharpServer.Engine
{
    internal class Render : Component
    {
        public string Sprite;
        public bool HaveDescription;
        public string Name;
        public string Type;
        public string Description;

        public Render(string sprite, bool haveDescription, string name = "", string type = "", string description = "")
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