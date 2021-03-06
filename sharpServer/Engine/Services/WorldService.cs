﻿using System;
using System.Collections.Generic;
using SharpServer.Engine.Factories;

namespace SharpServer.Engine.Services
{
    internal static class WorldService
    {
        private static readonly Dictionary<int, Vector2> Positions = new Dictionary<int, Vector2>();
            //entity -> position

        public static void AddEntity(Vector2 position, int entity)
        {
            Positions[entity] = position;
            var tile = EntityManager.GetComponent<Tile>(Tiles[position.X, position.Y]);
            var volume = EntityManager.GetComponent<Shape>(entity).Volume;
            tile.Entities.Add(entity);
            tile.ContainingVolume += volume;
        }

        public static Vector2 GetFreeTile()
        {
            var rand = new Random();
            int x, y;
            do
            {
                x = rand.Next(1, 19);
                y = rand.Next(1, 9);
            } while (EntityManager.GetComponent<Tile>(Tiles[x, y]).ContainingVolume > 50);
            return new Vector2(x, y);
        }

        public static void Initialize()
        {
            for (var x = 0; x < TilesX; x++)
            {
                for (var y = 0; y < TilesY; y++)
                {
                    Tiles[x, y] = TileFactory.NewDungeon(new Vector2(x, y));
                    if ((y == 0) || (y == TilesY - 1) || (x == 0) || (x == TilesX - 1))
                    {
                        var wall = WallFactory.NewWall(new Vector2(x, y));
                        AddEntity(new Vector2(x, y), wall);
                    }
                }
            }
        }

        public static void MoveEntity(int entity, Vector2 startPosition, Vector2 finishPosition)
        {
            RemoveEntity(entity, startPosition);
            AddEntity(finishPosition, entity);
        }

        public static void RemoveEntity(int entity, Vector2 position)
        {
            //var position = Positions[entity];
            var tile = Tiles[position.X, position.Y];
            var entities = EntityManager.GetComponent<Tile>(tile).Entities;
            if (!entities.Contains(entity))
                throw new MissingMemberException("REMOVE ERROR: there is no entity " + EntityManager.NameFor(entity) +
                                                 "(ID: " + entity + ") in tile " + position.X + ":" + position.Y);
            entities.Remove(entity);
            var volume = EntityManager.GetComponent<Shape>(entity).Volume;
            EntityManager.GetComponent<Tile>(tile).ContainingVolume -= volume;
        }

        public static int TilesX = 20;
        public static int TilesY = 10;
        public static int[,] Tiles = new int[TilesX, TilesY];
    }
}