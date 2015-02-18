using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Fleck;
using SharpServer.Engine;

namespace SharpServer
{
    class Program
    {
        static void Main(string[] args)
        {
            Dictionary<int, int> a = new Dictionary<int, int>();
            Console.WriteLine(a[1]);
            var server = new WebSocketServer("ws://127.0.0.1:8080");
            server.Start(socket =>
            {
                socket.OnOpen = () => Console.WriteLine("Open!");
                socket.OnClose = () => Console.WriteLine("Close!");
                socket.OnMessage = message => socket.Send(message);
            });
            //Console.WriteLine("Server started");
            Console.ReadKey();
        }
    }
}
