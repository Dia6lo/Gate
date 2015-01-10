var Game = require('./src/game');
var game = new Game.Game();
var io = require('socket.io')();
io.on('connection', function (socket) {
    console.log("connected");
    socket.emit('map', JSON.stringify(game.map));
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on("move", function (data) {
        console.log(data);
        game.newPosition(data);
        io.emit('map', JSON.stringify(game.map));
    });
});
io.listen(8080);
console.log('Server started on 8080');
//# sourceMappingURL=app.js.map