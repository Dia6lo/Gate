using Fleck;
using System;
using System.Collections.Generic;
using SharpServer.Engine;
using System.Linq;
using SharpServer.Engine.Services;
namespace SharpServer
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            WorldService.Initialize();
            ConnectionService.Start();
        }
    }
}