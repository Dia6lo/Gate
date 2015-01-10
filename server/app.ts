//// <reference path="src/game.ts" />
import WebSocketServer = require('ws');
import Game = require('./src/game');

var game = new Game.Game();

var io: SocketIO.Server = require('socket.io')();
io.on('connection', function (socket) {
    console.log("connected");
    socket.emit('map', JSON.stringify(game.map));
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("move", function (data) {
        //console.log(data);
        game.newPosition(data);
        io.emit('map', JSON.stringify(game.map));
    });
});

io.listen(8080)

console.log('Server started on 8080');
//console.log(JSON.stringify(game.map));

/*var wss = new WebSocketServer.Server({ port: 8080 });

console.log('Server started on 8080');

wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        game.newPosition(message);
        console.log("message");
        //console.log(JSON.stringify(game.map.tiles[3][3]));
        //console.log(JSON.stringify(game.map.tiles[4][3]));
        ws.send(JSON.stringify(game.map));
        //var msg = JSON.parse(message);
        //if (msg.action == "init")
        //for (var i in wss.clients) {
        //    wss.clients[i].send(JSON.stringify(rabbit));
        //}

    });
    console.log("connected");
    //console.log(JSON.stringify(game.map.tiles[3][3]));
    ws.send(JSON.stringify(game.map));
});*/