using System.Linq;

namespace SharpServer.Engine.Services
{
    public static class InformationService
    {
        public static Cell[,] GetSurroundings(uint entity, int radius)
        {
            var size = radius*2 + 1;
            var result = new Cell[size, size];
            var center = EntityManager.GetComponent<Transform>(entity).Position;
            for (var i = 0; i < radius*2 + 1; i++)
                for (var j = 0; j < radius*2 + 1; j++)
                    result[i, j] = MakeCell(new Vector2(center.X - radius + i, center.Y - radius + j));
            return result;
        }

        private static Cell MakeCell(Vector2 position)
        {
            if ((position.X < 0) || (position.Y < 0) || (position.X >= WorldService.TilesX) ||
                (position.Y >= WorldService.TilesY))
                return new Cell("Void", new Entity[0]);
            var tile = EntityManager.GetComponent<Tile>(WorldService.Tiles[position.X, position.Y]);
            var container = EntityManager.GetComponent<Container>(WorldService.Tiles[position.X, position.Y]);
            var entities = container.Contents
                .Select(EntityManager.GetComponent<Render>)
                .ToList()
                .ConvertAll(
                    render =>
                        new Entity(render.Sprite, render.HaveDescription, render.Name, render.Type, render.Description))
                .ToArray();
            var floorType = Tile.GetName(tile.FloorType);
            return new Cell(floorType, entities);
        }

        public struct Entity
        {
            public string Description;
            public bool HaveDescription;
            public string Name;
            public string Sprite;
            public string Type;

            public Entity(string sprite, bool haveDescription, string name = "", string type = "",
                string description = "")
            {
                Sprite = sprite;
                HaveDescription = haveDescription;
                Name = name;
                Type = type;
                Description = description;
            }
        }

        public struct Cell
        {
            public Entity[] Entities;
            public string FloorType;

            public Cell(string floorType, Entity[] entities)
            {
                FloorType = floorType;
                Entities = entities;
            }
        }
    }
}