var Tile = require("./tile");
var World = (function () {
    function World() {
        this.tiles = [];
        this.settings = {
            tilesX: 20,
            tilesY: 10,
        };
        this.initialize();
    }
    World.prototype.initialize = function () {
        var tile;
        var blocking;
        for (var x = 0; x < this.settings.tilesX; x++) {
            //Initialize this row
            this.tiles[x] = [];
            for (var y = 0; y < this.settings.tilesY; y++) {
                blocking = false;
                tile = "dungeon.png";
                if ((y == 0) || (y == this.settings.tilesY - 1)) {
                    tile = "wall.png";
                    blocking = true;
                }
                if (x == 0) {
                    tile = "leftwall.png";
                    blocking = true;
                }
                if (x == this.settings.tilesX - 1) {
                    tile = "rightwall.png";
                    blocking = true;
                }
                //Initialize this position by setting it to zero, and blocking light
                this.tiles[x][y] = new Tile(tile, blocking);
            }
        }
    };
    return World;
})();
module.exports = World;
//# sourceMappingURL=map.js.map