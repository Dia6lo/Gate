/// <reference path="typings/pixi.d.ts" />
/// <reference path="typings/socket.io.d.ts" />
/// <reference path="typings/require.d.ts" />

import Game = require("src/game");

var Intialize = function initializeCanvas() {
    
    //Create a new game
    var game = new Game();
};

require([], () => {
    Intialize();
});