using System;
using System.Collections.Generic;
using Fleck;
using Newtonsoft.Json;

namespace SharpServer.Engine.Services
{
    internal static class ConnectionService
    {
        public delegate void MessageHandler(int id, object data);

        private static readonly Dictionary<int, IWebSocketConnection> PlayersToSockets =
            new Dictionary<int, IWebSocketConnection>();

        private static readonly WebSocketServer Server = new WebSocketServer("ws://127.0.0.1:8080");

        private static readonly Dictionary<string, List<MessageHandler>> Handlers = new Dictionary<string, List<MessageHandler>>(); 

        public static void Broadcast(string header, object body)
        {
            var message = CreateMessage(header, body);
            foreach (var player in PlayersToSockets)
                player.Value.Send(message);
        }

        public static void Broadcast(string header, object body, IEnumerable<int> players)
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
            InitializeHandlers();
            Server.Start(socket => socket.OnOpen = () => OnPlayerConnect(socket));
            Console.WriteLine("Server started on 8080");
        }

        private static string CreateMessage(string header, object body)
        {
            var message = new Message(header, body);
            return JsonConvert.SerializeObject(message);
        }

        //KOSTYL
        private static void InitializeHandlers()
        {
            Subscribe("move", PlayerService.MovePlayer);
            Subscribe("request_map", PlayerService.SendSurroundings);
        }

        private static void HandleMessage(string message, int id)
        {
            var unpackedMessage = JsonConvert.DeserializeObject<Message>(message);
            List<MessageHandler> handlers;
            if (!Handlers.TryGetValue(unpackedMessage.Header, out handlers))
            {
                return;
            }
            foreach (var handler in handlers)
            {
                handler(id, unpackedMessage.Body);
            }
        }

        public static void Subscribe(string message, MessageHandler handler)
        {
            List<MessageHandler> handlers;
            if (!Handlers.TryGetValue(message, out handlers))
            {
                handlers = new List<MessageHandler>();
                Handlers[message] = handlers;
            }
            handlers.Add(handler);
        }

        private static void OnPlayerConnect(IWebSocketConnection socket)
        {
            var id = PlayerService.InitializePlayer();
            PlayersToSockets[id] = socket;
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

        private class Message
        {
            public readonly object Body;
            public readonly string Header;

            public Message(string header, object body)
            {
                Header = header;
                Body = body;
            }
        }
    }
}