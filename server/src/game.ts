import Map = require("./map");
import Entity = require("./entity");

class Game {
    map: Map;
    player: Entity;
    update;
    isUpdated: boolean;
    constructor() {
        this.initialize();
        this.isUpdated = false;
        this.update = {};
    }

    initialize() {
        this.map = new Map();
        this.initializePlayer();
    }

    initializePlayer() {
        this.player = new Entity("Player", "warrior.png", 3, 3);
        var startingTile = this.map.tiles[3][3];
        startingTile.addEntity(this.player);
    }
    newPosition(direction) {

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
        var startingTile = this.map.tiles[this.player.position.x][this.player.position.y];
        var finishTile = this.map.tiles[this.player.position.x + movement.x][this.player.position.y + movement.y];
        this.update.from = this.player.position;
        //console.log(finishTile.blocking);
        if (!finishTile.blocking) {
            startingTile.removeEntity(this.player);

            this.player.position.x += movement.x;
            this.player.position.y += movement.y;

            var finishTile = this.map.tiles[this.player.position.x][this.player.position.y];
            finishTile.addEntity(this.player);
            this.isUpdated = true;
        }
        this.update.to = this.player.position;
    }
}

export = Game;