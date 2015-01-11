import Game = require('./src/game');

var game = new Game();

console.log("Game generated");

var io: SocketIO.Server = require('socket.io')();
io.on('connection', function (socket) {
    console.log("connected");
    socket.emit('map', JSON.stringify(game.map));
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("move", function (data) {
        game.newPosition(data);
        io.emit('map', JSON.stringify(game.map));
    });
});

io.listen(8080)

console.log('Server started on 8080');