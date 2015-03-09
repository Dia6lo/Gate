using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SharpServer.Engine.Services
{
    static class CooldownService
    {
        static private readonly List<uint> onCooldown = new List<uint>();

        public static void Add(uint entity, int cooldown)
        {
            if (OnCooldown(entity))
                return;
            onCooldown.Add(entity);
            Task.Delay(cooldown).ContinueWith(_ => { onCooldown.Remove(entity); Console.WriteLine(entity + " " + cooldown + " ms");});
        }

        public static bool OnCooldown(uint entity)
        {
            return onCooldown.Any(cd => cd == entity);
        }
    }
}
