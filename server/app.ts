/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />
/// <reference path="src/typings/engine.d.ts" />

import Game = require('./src/game');

var game = new Game();

console.log("Game generated");

//tests
var playerSystem = game.systemManager.staticSystems.playerSystem;
var playerInfo = playerSystem.initializePlayer();
var playerId = playerInfo.id;
console.log(JSON.stringify(playerInfo));
console.log(JSON.stringify(playerSystem.getMap(playerId)));
var moving = playerSystem.movePlayer(playerId, "left");
if (moving.moved) {
    var update = { id: moving.id, destination: moving.destination };
    console.log(JSON.stringify(update));
}
console.log(JSON.stringify(playerSystem.destroyPlayer(playerId)));