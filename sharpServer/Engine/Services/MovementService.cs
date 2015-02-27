using System;
using System.Linq.Expressions;

namespace SharpServer.Engine.Services
{
    internal static class MovementService
    {
        public static bool MoveEntity(int entity, Vector2 destination)
        {
            var position = EntityManager.GetComponent<Transform>(entity).Position;
            var finishTile = WorldService.Tiles[destination.X, destination.Y];
            if (EntityManager.GetComponent<Tile>(finishTile).ContainingVolume +
                EntityManager.GetComponent<Shape>(entity).Volume >= Tile.MaxVolume) 
                return false;
            WorldService.MoveEntity(entity, position, destination);
            position.X = destination.X;
            position.Y = destination.Y;
            return true;
        }
    }
}