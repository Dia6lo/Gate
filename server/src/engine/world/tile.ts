class Tile {
    entities: number[];
    player: number;
    texture: string;
    blocking: boolean;

    constructor(texture: string, blocking: boolean) {
        this.entities = [];
        this.player = null;
        this.texture = texture;
        this.blocking = blocking;
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    removeEntity(entity) {

        //Get the current position of the entity
        var index = this.entities.indexOf(entity);

        //If the entity exists, remove it
        if (index === -1) {

            //The entity doesn't even exist on this tile
            return false;

        } else {

            //Remove the entity from the tile
            this.entities.splice(index, 1);

            //We have removed the entity
            return true;

        }

    }
}

export = Tile;