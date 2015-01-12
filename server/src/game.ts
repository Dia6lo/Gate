import Map = require("./map");
import Entity = require("./entity");
import Systems = require("./systems");

class Game {
    map: Map;
    update;
    systems: Systems;
    isUpdated: boolean;
    players: { [id: number]: { x: number; y: number}; };
    constructor() {
        this.map = new Map();
        this.isUpdated = false;
        this.update = {};
        this.players = {};
        this.systems = new Systems(this);
    }

    initializePlayer(id: number) {
        this.update = {};
        var x = Math.floor((Math.random() * 18) + 1);
        var y = Math.floor((Math.random() * 8) + 1);
        while (this.map.tiles[x][y].player != null) {
            var x = Math.floor((Math.random() * 18) + 1) ;
            var y = Math.floor((Math.random() * 8) + 1);
        }
        var player = new Entity(id, "warrior.png", x, y);
        this.players[id] = {x: x, y: y};
        var startingTile = this.map.tiles[x][y];
        startingTile.player = player;
        this.update = { x: x, y: y}
    }

    getPlayer(id: number) {
        var player = this.players[id];
        return (player != undefined) ? this.map.tiles[player.x][player.y].player : null;
    }

    destroyPlayer(id: number) {
        this.update = {};
        var player = this.getPlayer(id);
        if (player == null)
            return;
        var playerPosition = player.getComponent("position");
        this.update = { x: playerPosition.value.x, y: playerPosition.value.y }
        //Remove the current entity from the group
        this.players[id] = undefined;
        this.map.tiles[playerPosition.value.x][playerPosition.value.y].player = null;
    }

    playerMove(id, direction) {
        var player = this.getPlayer(id);
        if (player == null)
            return;
        player.getComponent("movement"
    }
}

export = Game;