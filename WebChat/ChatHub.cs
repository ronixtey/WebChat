﻿using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChat
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.Send(name, message);
        }
    }
}