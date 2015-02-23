/// <reference path="typings/pixi.d.ts" />
/// <reference path="typings/socket.io.d.ts" />
/// <reference path="typings/require.d.ts" />

import Game = require("src/game");

var Intialize = function initializeCanvas(data: string) {
    var a: Message = JSON.parse(data);
    var b = JSON.parse(a.Body);
    //Create a new game
    var game = new Game();
};

interface Message {
    Head: string;
    Body: string;
}

require([],() => {
    var Socket = new WebSocket("ws://127.0.0.1:8080");
    Socket.onmessage = function (evt) {
        Intialize(evt.data);
    };
});