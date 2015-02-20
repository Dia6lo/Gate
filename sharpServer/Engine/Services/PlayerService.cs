using Fleck;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

// WARNING: THIS US BULLSHIT
namespace SharpServer.Engine.Services
{
    internal class PlayerService: Service
    {
        private struct Message
        {
            public string header;
            public string body;

            public Message(string header, string body)
            {
                this.header = header;
                this.body = body;
            }
        }

        private Dictionary<int, int> playersToEntities;
        private Dictionary<int, IWebSocketConnection> playersToSockets;

        private int lowestUnassignedPlayerID;
        private EntityManager entityManager;
        private WorldService worldSystem;
        private MovementService movementSystem;
        private WebSocketServer server;

        public PlayerService(EntityManager entityManager, WorldService worldSystem, MovementService movementSystem)
        {
            this.entityManager = entityManager;
            this.worldSystem = worldSystem;
            this.movementSystem = movementSystem;
            playersToEntities = new Dictionary<int, int>();
            playersToSockets = new Dictionary<int, IWebSocketConnection>();
            server = new WebSocketServer("ws://127.0.0.1:8080");
            lowestUnassignedPlayerID = 1;
            server.Start(socket => socket.OnOpen = () => onPlayerConnect(socket));
            Console.WriteLine("Server started on 8080");
        }

        private int generateNewPlayerID()
        {
            //TODO: Make it synchronous
            {
                if (lowestUnassignedPlayerID < int.MaxValue)
                {
                    return lowestUnassignedPlayerID++;
                }
                else
                {
                    for (var i = 1; i < int.MaxValue; i++)
                    {
                        if (!playersToEntities.ContainsKey(i))
                            return i;
                    }
                    throw new IndexOutOfRangeException("ERROR: no available Player IDs; too many players(wow)!");
                }
            }
        }

        private void broadcastToAll(string message)
        {
            foreach (var player in playersToSockets)
                player.Value.Send(message);
        }

        private void broadcastToPlayers(string message, int[] players)
        {
            foreach (var player in players)
                playersToSockets[player].Send(message);
        }

        private string createMessage(string header, object obj)
        {
            return JsonConvert.SerializeObject(new Message(header, JsonConvert.SerializeObject(obj)));
        }

        private struct PlayerInfo
        {
            public int id;
            public Vector2 position;

            public PlayerInfo(int id, Vector2 position)
            {
                this.id = id;
                this.position = position;
            }
        }

        private void onPlayerConnect(IWebSocketConnection socket)
        {
            var playerInfo = initializePlayer();
            var playerID = playerInfo.id;
            Console.WriteLine("connected player " + playerID);
            broadcastToAll(createMessage("new_player", playerInfo));
            Console.WriteLine(createMessage("new_player", playerInfo));
            socket.Send(createMessage("map", getMap(playerID)));
            Console.WriteLine(createMessage("map", getMap(playerID)));
            socket.OnClose = () => onPlayerDisconnect(playerID);
            socket.OnMessage = message => handleMessage(message, playerID);
        }

        private void onPlayerDisconnect(int id)
        {
            Console.WriteLine("disconnected player " + id);
            broadcastToAll(createMessage("player_exit", destroyPlayer(id)));
        }

        private struct Direction
        {
            public string direction;
            public Direction(string direction)
            {
                this.direction = direction;
            }
        }

        private void handleMessage(string message, int id)
        {
            var m = JsonConvert.DeserializeObject<Message>(message);
            switch (m.header)
            {
                case "move": onPlayerMove(JsonConvert.DeserializeObject<Direction>(m.body).direction, id); break;
            }
        }

        private void onPlayerMove(string direction, int playerID)
        {
            PlayerInfo update;
            if (movePlayer(playerID, direction, out update))
            {
                broadcastToAll(createMessage("map_update", update));
            }
        }

        private PlayerInfo initializePlayer()
        {
            Random rand = new Random();
            int x, y;
            do
            {
                x = rand.Next(1, 19);
                y = rand.Next(1, 9);
            } while ( entityManager.getComponent<Engine.Tile>(worldSystem.tiles[x, y]).containingVolume > 50);
            var position = new Vector2(x, y);
            var id = generateNewPlayerID();
            if (id < 1)
            {
                throw new ArgumentOutOfRangeException("WTF? PlayerID < 1");
            }
            var player = Factories.PlayerFactory.newPlayer(entityManager, id, position);
            playersToEntities[id] = player;
            worldSystem.addEntity(new Vector2(x, y), player);
            return new PlayerInfo(id, position);
        }

        private PlayerInfo destroyPlayer(int id)
        {
            var player = playersToEntities[id];
            var position = entityManager.getComponent<Transform>(player).position;
            worldSystem.removeEntity(player);
            entityManager.destroyEntity(player);
            playersToEntities.Remove(id);
            return new PlayerInfo(id, position);
        }

        private bool movePlayer(int id, string direction, out PlayerInfo PI)
        {
            PI = new PlayerInfo();
            int player;
            if (!playersToEntities.TryGetValue(id, out player))
                return false;
            var offset = getOffset(direction);
            var position = entityManager.getComponent<Transform>(player).position;
            var destination = position.combine(offset);
            if (movementSystem.moveEntity(player, destination))
            {
                PI = new PlayerInfo(player, destination);
            }
            return false;
        }

        private Vector2 getOffset(string direction)
        {
            var movement = new Vector2(0, 0);
            switch (direction)
            {
                case ("left"):
                    movement.x = -1;
                    break;

                case ("up"):
                    movement.y = -1;
                    break;

                case ("right"):
                    movement.x = 1;
                    break;

                case ("down"):
                    movement.y = 1;
                    break;
            }
            return movement;
        }

        private struct Entity
        {
            public int entity;
            public string type;

            public Entity(int entity, string type)
            {
                this.entity = entity;
                this.type = type;
            }
        }

        private struct Tile
        {
            public string floorType;
            public Entity[] entities;

            public Tile(string floorType, Entity[] entities)
            {
                this.floorType = floorType;
                this.entities = entities;
            }
        }

        private Tile[,] getMap(int id)
        {
            var world = worldSystem;
            var player = playersToEntities[id];
            var tiles = new Tile[world.tilesX, world.tilesY];
            for (var x = 0; x < world.tilesX; x++)
            {
                for (var y = 0; y < world.tilesY; y++)
                {
                    var tile = world.tiles[x, y];
                    var entities = entityManager.getComponent<Engine.Tile>(tile).entities
                        .ConvertAll<Entity>(entity => new Entity(entity, entityManager.getComponent<Render>(entity).type))
                        .ToArray();
                    tiles[x, y] = new Tile("Dungeon", entities);
                }
            }
            return tiles;
        }
    }
}