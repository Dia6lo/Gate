import Entity = require("../entity");

import World = require("../world/world");

class Movement {
    constructor(private map: World) {
    }

    moveEntity(entity: Entity, destination: { x: number; y: number }) {
        var position = entity.getComponent(Transform);
        var x = position.position.x;
        var y = position.position.y;
        var startingTile = this.map.tiles[x][y];
        var finishTile = this.map.tiles[destination.x][destination.y];
        //console.log(finishTile.blocking);
        if ((!finishTile.blocking) && (finishTile.entities[0] == undefined)) {
            
            startingTile.player = null;

            position.position.x = destination.x;
            position.position.y = destination.y;

            finishTile.player = entity;
        }
    }
}

export = Movement;