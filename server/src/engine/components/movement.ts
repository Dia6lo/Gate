import MovementSystem = require("../systems/movement");
import Vector2 = require("../geometry/vector2");
import Entity = require("../entity");

class Movement implements IMovement{
    static name = "movement";
    constructor(private _world: World) {
        var a = new World();
    }

    getName() {
        return Movement.name;
    }

    moveEntity(entity: Entity, direction: string) {
        var position = entity.getComponent(Transform).position;
        var destination = this.getDestination(direction, position);
    }

    getDestination(direction: string, position: Vector2): Vector2 {
        var movement = new Vector2(0,0);
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