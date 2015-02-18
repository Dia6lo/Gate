using Fleck;
using System;
using System.Collections.Generic;
using SharpServer.Engine;
namespace SharpServer
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var em = new EntityManager();
            var sm = new SystemManager(em);
            Console.ReadKey();
        }
    }
}