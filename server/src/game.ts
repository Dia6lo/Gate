import Map = require("./map");
import Entity = require("./entity");

class Game {
    map: Map;
    update;
    isUpdated: boolean;
    players: Array<Entity>;
    constructor() {
        this.map = new Map();
        this.isUpdated = false;
        this.update = {};
        this.players = [];
    }

    initializePlayer(id: number) {
        this.update = {};
        var x = Math.floor(Math.random() * 19);
        var y = Math.floor(Math.random() * 9);
        while (this.map.tiles[x][y].entities[0] != undefined) {
            var x = Math.floor(Math.random() * 19);
            var y = Math.floor(Math.random() * 9);
        }
        var player = new Entity(id, "warrior.png", x, y);
        this.players.push(player);
        var startingTile = this.map.tiles[x][y];
        startingTile.addEntity(player);
        this.update = { x: player.position.x,y: player.position.y}
    }

    getPlayer(id: number) {
        for (var i = 0; i < this.players.length; i++) {
            var player = this.players[i];
            if (player.id == id)
                return player;
        }
        return null;
    }

    destroyPlayer(id: number) {
        this.update = {};
        var player = this.getPlayer(id);
        //Check if the entity exists, if not, we don't have to delete it
        var index = this.players.indexOf(player);

        //The element doesn't exist in the list
        if (index === -1) {

            return;

        }
        this.update = { x: player.position.x, y: player.position.y }
        //Remove the current entity from the group
        this.players.splice(index, 1);
        this.map.tiles[player.position.x][player.position.y].removeEntity(player);
    }

    newPosition(id, direction) {
        this.update = {};
        var player = this.getPlayer(id);
        //Define variables
        var movement = { x: 0, y: 0 };

        //Check which controls are being pressed and update the player accordingly
        switch (direction) {

            case ("left"):

                movement.x = -1

                break;

            case ("up"):

                movement.y = -1

                break;

            case ("right"):

                movement.x = 1

                break;

            case ("down"):

                movement.y = 1

                break;

        }
        var startingTile = this.map.tiles[player.position.x][player.position.y];
        var finishTile = this.map.tiles[player.position.x + movement.x][player.position.y + movement.y];
        this.update.from = { x: player.position.x, y: player.position.y };
        //console.log(finishTile.blocking);
        if ((!finishTile.blocking)&&(finishTile.entities[0] == undefined)) {
            startingTile.removeEntity(player);

            player.position.x += movement.x;
            player.position.y += movement.y;

            finishTile.addEntity(player);
            this.isUpdated = true;
        }
        this.update.to = {x: player.position.x, y: player.position.y};
    }
}

export = Game;