/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/socket.io/socket.io.d.ts" />

import Game = require('./src/game');

var game = new Game();

console.log("Game generated");
var count: number = 0; 

var io: SocketIO.Server = require('socket.io')();
io.on('connection', function (socket) {
    count++;
    var playerId: number = count;
    console.log("connected player " + playerId.toString());
    socket.emit('map', JSON.stringify(game.map));
    game.initializePlayer(playerId);
    io.emit('new_player', JSON.stringify(game.update));
    socket.on('disconnect', function () {
        console.log('disconnected player' + playerId.toString());
        game.destroyPlayer(playerId);
        io.emit('player_exit', JSON.stringify(game.update));
    });

    socket.on("move", function (data) {
        console.log(JSON.stringify(game.players));
        game.newPosition(playerId, data);
        console.log(JSON.stringify(game.update));
        if (game.isUpdated) {
            io.emit('map_update', JSON.stringify(game.update));
            game.isUpdated = false;
        }
    });
});

io.listen(8080)

console.log('Server started on 8080');