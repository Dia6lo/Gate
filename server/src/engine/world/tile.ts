class Tile {
    entities: number[];
    volume: number;

    constructor(public floorType?: string) {
        this.entities = [];
        this.volume = 0;
        if (!floorType)
            this.floorType = "Dungeon"
    }
}

export = Tile;