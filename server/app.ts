/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />
/// <reference path="src/typings/engine.d.ts" />

import Game = require('./src/game');

var game = new Game();

console.log("Game generated");
var count: number = 0; 

var io: SocketIO.Server = require('socket.io')();
io.on('connection', function (socket) {
    count++;
    var playerId: number = count;
    console.log("connected player " + playerId.toString());
    socket.emit('map', JSON.stringify(game.worldManager));
    game.systemManager.staticSystems.playerSystem.initializePlayer(playerId);
    io.emit('new_player', JSON.stringify(game.systemManager.staticSystems.playerSystem.update));
    socket.on('disconnect', function () {
        console.log('disconnected player' + playerId.toString());
        game.systemManager.staticSystems.playerSystem.destroyPlayer(playerId);
        io.emit('player_exit', JSON.stringify(game.systemManager.staticSystems.playerSystem.update));
    });

    socket.on("move", function (data) {
        //console.log(JSON.stringify(game.players));
        game.systemManager.staticSystems.playerSystem.playerMove(playerId, data);
        //console.log(JSON.stringify(game.update));
        if (game.systemManager.staticSystems.playerSystem.isUpdated) {
            io.emit('map_update', JSON.stringify(game.systemManager.staticSystems.playerSystem.update));
            game.systemManager.staticSystems.playerSystem.isUpdated = false;
        }
    });
});

io.listen(8080)

console.log('Server started on 8080');