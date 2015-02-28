namespace SharpServer.Engine.Services
{
    internal static class InformationService
    {
        public static Cell[,] GetSurroundings(uint entity, int radius)
        {
            var size = radius * 2 + 1;
            var result = new Cell[size, size];
            var center = EntityManager.GetComponent<Transform>(entity).Position;
            for (var i = 0; i < radius * 2 + 1; i++)
                for (var j = 0; j < radius * 2 + 1; j++)
                    result[i, j] = MakeCell(new Vector2(center.X - radius + i, center.Y - radius + j));
            return result;
        }

        private static Cell MakeCell(Vector2 position)
        {
            if ((position.X < 0) || (position.Y < 0) || (position.X >= WorldService.TilesX) ||
                (position.Y >= WorldService.TilesY))
                return new Cell("Void", new Entity[0]);
            var tile = EntityManager.GetComponent<Tile>(WorldService.Tiles[position.X, position.Y]);
            var entities = tile.Entities
                .ConvertAll(id => new Entity(id, EntityManager.GetComponent<Render>(id).Type))
                .ToArray();
            return new Cell(tile.FloorType, entities);
        }

        public struct Entity
        {
            public uint Id;
            public string Type;

            public Entity(uint id, string type)
            {
                Id = id;
                Type = type;
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