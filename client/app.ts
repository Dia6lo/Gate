/// <reference path="typings/pixi.d.ts" />
/// <reference path="typings/require.d.ts" />
import Game = require("./src/game");

var intialize = () => {
    //Create a new game
    var game = new Game();
};

require([], () => {
    intialize();
});