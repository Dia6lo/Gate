/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />
/// <reference path="src/typings/engine.d.ts" />

import Game = require('./src/game');

var game = new Game();
var playerSystem = game.systemManager.staticSystems.playerSystem;

console.log("Game generated");
console.log(JSON.stringify(playerSystem.initializePlayer(1)));
console.log(JSON.stringify(playerSystem.getMap(1)));
var moving = playerSystem.movePlayer(1, "left");
if (moving.moved) {
    var update = { id: moving.id, destination: moving.destination };
    console.log(JSON.stringify(update));
}
console.log(JSON.stringify(playerSystem.destroyPlayer(1)));

var count: number = 0; 

var io: SocketIO.Server = require('socket.io')();
io.on('connection', function (socket) {
    var playerId = count++;
    console.log("connected player " + playerId.toString());
    io.emit('new_player', JSON.stringify(playerSystem.initializePlayer(playerId)));
    socket.emit('map', JSON.stringify(playerSystem.getMap(playerId)));
    socket.on('disconnect', function () {
        console.log('disconnected player' + playerId.toString());
        io.emit('player_exit', JSON.stringify(playerSystem.destroyPlayer(playerId)));
    });

    socket.on("move", function (data) {
        var moving = playerSystem.movePlayer(playerId, data);
        if (moving.moved) {
            var update = { id: moving.id, destination: moving.destination };
            io.emit('map_update', JSON.stringify(update));
        }
    });
});

io.listen(8080)

console.log('Server started on 8080');