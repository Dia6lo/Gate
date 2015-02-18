/// <reference path="typings/pixi.d.ts" />
/// <reference path="typings/socket.io.d.ts" />
/// <reference path="typings/require.d.ts" />

import Game = require("src/game");

var Intialize = function initializeCanvas() {
   
    //Create a new game
    var game = new Game();
};

require([],() => {
    var Socket = new WebSocket("ws://127.0.0.1:8080");
    Socket.onmessage = function (evt) {
        var a = JSON.parse(evt.data);
        var b = JSON.parse(a.body);
    };
    Intialize();
});