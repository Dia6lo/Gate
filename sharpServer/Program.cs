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