class Tile implements ITile{
    entities: number[];
    volume: number;

    constructor(private _maxVolume: number, public floorType?: string) {
        this.entities = [];
        this.volume = 0;
        if (!floorType)
            this.floorType = "Dungeon"
    }
}

export = Tile;