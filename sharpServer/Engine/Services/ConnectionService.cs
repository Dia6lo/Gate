using Fleck;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace SharpServer.Engine.Services
{
    internal static class ConnectionService
    {
        private static Dictionary<int, IWebSocketConnection> playersToSockets = new Dictionary<int, IWebSocketConnection>();

        private static WebSocketServer server = new WebSocketServer("ws://127.0.0.1:8080");

        public static void BroadcastToAll(string header, object body)
        {
            var message = CreateMessage(header, body);
            foreach (var player in playersToSockets)
                player.Value.Send(message);
        }

        public static void BroadcastToPlayers(string header, object body, int[] players)
        {
            var message = CreateMessage(header, body);
            foreach (var player in players)
                playersToSockets[player].Send(message);
        }

        public static string DebugMessage(string header, object body)
        {
            return CreateMessage(header, body);
        }

        static public void SendMessage(string header, object body, int player)
        {
            var message = CreateMessage(header, body);
            playersToSockets[player].Send(message);
        }

        static public void Start()
        {
            server.Start(socket => socket.OnOpen = () => OnPlayerConnect(socket));
            Console.WriteLine("Server started on 8080");
            Console.ReadKey();
        }
        private static string CreateMessage(string header, object body)
        {
            var message = new Message(header, JsonConvert.SerializeObject(body));
            return JsonConvert.SerializeObject(message);
        }
        static private void HandleMessage(string message, int id)
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
            playersToSockets[id] = socket;
            PlayerService.SendSurroundings(id);
            Console.WriteLine("connected player " + id);
            socket.OnClose = () => OnPlayerDisconnect(id);
            socket.OnMessage = message => HandleMessage(message, id);
        }

        static private void OnPlayerDisconnect(int id)
        {
            PlayerService.DestroyPlayer(id);
            playersToSockets.Remove(id);
            Console.WriteLine("disconnected player " + id);
        }

        static private void OnPlayerMove(string direction, int playerID)
        {
            PlayerService.MovePlayer(playerID, direction);
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
            public string Header;
            public string Body;
            public Message(string header, string body)
            {
                Header = header;
                Body = body;
            }
        }
    }
}