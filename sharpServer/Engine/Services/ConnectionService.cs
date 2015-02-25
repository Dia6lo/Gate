using System;
using System.Collections.Generic;
using Fleck;
using Newtonsoft.Json;

namespace SharpServer.Engine.Services
{
    internal static class ConnectionService
    {
        private static readonly Dictionary<int, IWebSocketConnection> PlayersToSockets =
            new Dictionary<int, IWebSocketConnection>();

        private static readonly WebSocketServer Server = new WebSocketServer("ws://127.0.0.1:8080");

        public static void BroadcastToAll(string header, object body)
        {
            var message = CreateMessage(header, body);
            foreach (var player in PlayersToSockets)
                player.Value.Send(message);
        }

        public static void BroadcastToPlayers(string header, object body, int[] players)
        {
            var message = CreateMessage(header, body);
            foreach (var player in players)
                PlayersToSockets[player].Send(message);
        }

        public static string DebugMessage(string header, object body)
        {
            return CreateMessage(header, body);
        }

        public static void SendMessage(string header, object body, int player)
        {
            var message = CreateMessage(header, body);
            PlayersToSockets[player].Send(message);
        }

        public static void Start()
        {
            Server.Start(socket => socket.OnOpen = () => OnPlayerConnect(socket));
            Console.WriteLine("Server started on 8080");
            Console.ReadKey();
        }

        private static string CreateMessage(string header, object body)
        {
            var message = new Message(header, JsonConvert.SerializeObject(body));
            return JsonConvert.SerializeObject(message);
        }

        private static void HandleMessage(string message, int id)
        {
            var unpackedMessage = JsonConvert.DeserializeObject<Message>(message);
            var header = unpackedMessage.Header;
            switch (header)
            {
                case "move":
                    var body = JsonConvert.DeserializeObject<Direction>(unpackedMessage.Body);
                    OnPlayerMove(body.direction, id);
                    break;
            }
        }

        private static void OnPlayerConnect(IWebSocketConnection socket)
        {
            var id = PlayerService.InitializePlayer();
            PlayersToSockets[id] = socket;
            PlayerService.SendSurroundings(id);
            Console.WriteLine("connected player " + id);
            socket.OnClose = () => OnPlayerDisconnect(id);
            socket.OnMessage = message => HandleMessage(message, id);
        }

        private static void OnPlayerDisconnect(int id)
        {
            PlayerService.DestroyPlayer(id);
            PlayersToSockets.Remove(id);
            Console.WriteLine("disconnected player " + id);
        }

        private static void OnPlayerMove(string direction, int playerId)
        {
            PlayerService.MovePlayer(playerId, direction);
        }

        public struct Direction
        {
            public string direction;

            public Direction(string direction)
            {
                this.direction = direction;
            }
        }

        private struct Message
        {
            public readonly string Body;
            public readonly string Header;

            public Message(string header, string body)
            {
                Header = header;
                Body = body;
            }
        }
    }
}