using Fleck;
using System;
using System.Collections.Generic;

namespace SharpServer
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var server = new WebSocketServer("ws://127.0.0.1:8080");
            server.Start(socket =>
            {
                socket.OnOpen = () => Console.WriteLine("Open!");
                socket.OnClose = () => Console.WriteLine("Close!");
                socket.OnMessage = message => Console.WriteLine("fghfdhClose!"); //a(message); //socket.Send(message);
            });
            //Console.WriteLine("Server started");
            Console.ReadKey();
        }
    }
}