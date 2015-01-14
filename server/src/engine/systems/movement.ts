import World = require("../world/world");
import EntityManager = require("../entitymanager");
import Vector2 = require("../geometry/vector2");

class Movement {
    constructor(private world: World, private entityManager: EntityManager) {
    }

    movePlayer(entity: number, direction: string): Vector2 {
        var position = this.entityManager.getComponent(entity, Transform).position;
        var destination = this.getDestination(position, direction);
        var startingTile = this.world.tiles[position.x][position.y];
        var finishTile = this.world.tiles[destination.x][destination.y];
        if ((!finishTile.blocking) && (finishTile.player == null)) {

            startingTile.player = null;

            position.x = destination.x;
            position.y = destination.y;

            finishTile.player = entity;
        }
        return destination;
    }

    getDestination(position: Vector2, direction: string): Vector2 {
        var movement = new Vector2(0, 0);
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

        return position.combine(movement);
    }
}

export = Movement;