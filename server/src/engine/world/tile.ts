class Tile {
    entities: {[entity: number] : number}; //Dictionary entity->volume
    volume: number;

    constructor(public floorType?: string) {
        this.entities = [];
        this.volume = 0;
        if (!floorType)
            this.floorType = "Dungeon"
    }
}

export = Tile;