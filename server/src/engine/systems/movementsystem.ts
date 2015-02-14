import EntityManager = require("../entitymanager");
import WorldSystem = require("./worldsystem");
import Vector2 = require("../geometry/vector2");
import Transform = require("../components/transform");

class MovementSystem implements System{
    static maxTileVolume = 100;
    
    constructor(private entityManager: EntityManager, private world: WorldSystem) {
    }

    newCla(a: number): Cla {
        return {a: a};
    }

    moveEntity(entity: number, destination: Vector2): boolean {
        var position = this.entityManager.getComponent(entity, Transform).position;
        var startingTile = this.world.tiles[position.x][position.y];
        var finishTile = this.world.tiles[destination.x][destination.y];
        if (finishTile.volume + this.entityManager.getComponent(entity, Transform).volume < MovementSystem.maxTileVolume) {
            position.x = destination.x;
            position.y = destination.y;
            this.world.moveEntity(entity, position);
            return true;
        }
        return false;
    }

}

export = MovementSystem;