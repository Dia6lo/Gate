define(["require", "exports"], function (require, exports) {
    var Tile = (function () {
        function Tile() {
            this.entities = [];
        }
        Tile.prototype.addEntity = function (entity) {
            this.entities.push(entity);
        };
        Tile.prototype.removeEntity = function (entity) {
            //Get the current position of the entity
            var index = this.entities.indexOf(entity);
            //If the entity exists, remove it
            if (index === -1) {
                //The entity doesn't even exist on this tile
                return false;
            }
            else {
                //Remove the entity from the tile
                this.entities.splice(index, 1);
                //We have removed the entity
                return true;
            }
        };
        return Tile;
    })();
    return Tile;
});
//# sourceMappingURL=tile.js.map