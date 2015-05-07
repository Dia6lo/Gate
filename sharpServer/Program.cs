using System;
using SharpServer.Engine.Services;

namespace SharpServer
{
    static class Program
    {
        private static void Main(string[] args)
        {
            WorldService.Initialize();
            ConnectionService.Start();
            Console.ReadKey();
        }
    }
}