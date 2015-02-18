class Client {
    game;
    socket: Socket;
    connected: boolean;
    constructor(game) {
        this.game = game;
        this.socket = io.connect("127.0.0.1:8080");
        this.socket.on('connect', function () {
            this.connected = true;
        });
        this.socket.on('map', function (data) {
            var msg = JSON.parse(data);
            game.map.create(msg);
            game.update();
        });
        this.socket.on('map_update', function (data) {
            var msg = JSON.parse(data);
            game.map.update(msg);
            game.update();
        });
        this.socket.on('new_player', function (data) {
            var msg = JSON.parse(data);
            game.map.addPlayer(msg);
            game.update();
        });
        this.socket.on('player_exit', function (data) {
            var msg = JSON.parse(data);
            game.map.removePlayer(msg);
            game.update();
        });
        this.socket.on('disconnect', function () {

        });
    }
}

export = Client;