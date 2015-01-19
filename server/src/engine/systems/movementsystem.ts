import WorldManager = require("../worldmanager");
import EntityManager = require("../entitymanager");
import Vector2 = require("../geometry/vector2");

class MovementSystem {
    static maxTileVolume = 100;

    constructor(private world: WorldManager, private entityManager: EntityManager) {
    }

    movePlayer(player: number, direction: string): Vector2 {
        var position = this.entityManager.getComponent(player, Transform).position;
        var destination = this.getDestination(position, direction);
        var startingTile = this.world.tiles[position.x][position.y];
        var finishTile = this.world.tiles[destination.x][destination.y];
        if (finishTile.volume < 25) {
            position.x = destination.x;
            position.y = destination.y;
            this.world.moveEntity(player, position);
            return destination;
        }
        return new Vector2(0, 0);
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

export = MovementSystem;