import Map = require("../map");

class Movement {
    private map: Map;
    constructor(map: Map) {
        this.map = map;
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
        var positionComponent = player.getComponent("position");
        var x = positionComponent.value.x;
        var y = positionComponent.value.y;
        var startingTile = this.map.tiles[x][y];
        var finishTile = this.map.tiles[x + movement.x][y + movement.y];
        this.update.from = { x: x, y: y };
        //console.log(finishTile.blocking);
        if ((!finishTile.blocking) && (finishTile.entities[0] == undefined)) {
            startingTile.removeEntity(player);

            x += movement.x;
            y += movement.y;

            finishTile.addEntity(player);
            this.isUpdated = true;
        }
        this.update.to = { x: x, y: y };
    }
}

export = Movement;