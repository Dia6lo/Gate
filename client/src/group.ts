import Entity = require("./entity");

class Group extends PIXI.DisplayObjectContainer {
    game;
    entities: Array<Entity>;
    constructor(game) {
        super();
        this.game = game;
        this.entities = [];
    }
    addEntity(entity: Entity) {
        this.addChild(entity.sprite);
        var position = entity.position;

        //Translate to a new position
        var newPosition = {
            x: position.x * 16,
            y: position.y * 16
        };

        //Set the position
        entity.sprite.position = new PIXI.Point(newPosition.x, newPosition.y);
        this.entities.push(entity);
    }
    removeEntity(entity) {

        //Check if the entity exists, if not, we don't have to delete it
        var index = this.entities.indexOf(entity);

        //The element doesn't exist in the list
        if (index === -1) {

            return;

        }

        //Remove the sprite component from the the DisplayObjectContainer
        this.removeChild(entity.sprite);

        //Remove the current entity from the group
        this.entities.splice(index, 1);

    }
}

export = Group;