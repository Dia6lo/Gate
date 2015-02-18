using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharpServer.Engine
{
    class Transorm: Components.Component
    {
        int position;

        public Transorm (int position)
        {
            this.position = position;
        }
    }
}
