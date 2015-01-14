import Tile = require("./tile");

class World implements World {

    settings;
    tiles: Array<Array<Tile>>;

    constructor() {
        this.tiles = [];
        this.settings = {
            tilesX: 20, //The number of horizontal tiles on this map
            tilesY: 10, //The number of vertical tiles on this map
        };
        this.initialize();
    }

    initialize() {
        
        var tile: string;
        var blocking: boolean;
        //Loop through every horizontal row
        for (var x = 0; x < this.settings.tilesX; x++) {

            //Initialize this row
            this.tiles[x] = [];

            //Loop through every vertical row
            for (var y = 0; y < this.settings.tilesY; y++) {
                blocking = false;
                tile = "dungeon.png";
                if ((y == 0) || (y == this.settings.tilesY - 1)) {
                    tile = "wall.png"
                    blocking = true;
                }
                if (x == 0) {
                    tile = "leftwall.png"
                    blocking = true;
                }
                if (x == this.settings.tilesX - 1) {
                    tile = "rightwall.png"
                    blocking = true;
                }
                //Initialize this position by setting it to zero, and blocking light
                this.tiles[x][y] = new Tile(tile, blocking);

            }

        }
    }

}

export = World;