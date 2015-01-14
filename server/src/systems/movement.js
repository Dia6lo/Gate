var Movement = (function () {
    function Movement(map) {
        this.map = map;
    }
    Movement.prototype.moveEntity = function (entity, destination) {
        var position = entity.getComponent(Transform);
        var x = position.position.x;
        var y = position.position.y;
        var startingTile = this.map.tiles[x][y];
        var finishTile = this.map.tiles[destination.x][destination.y];
        //console.log(finishTile.blocking);
        if ((!finishTile.blocking) && (finishTile.entities[0] == undefined)) {
            startingTile.player = null;
            position.position.x = destination.x;
            position.position.y = destination.y;
            finishTile.player = entity;
        }
    };
    return Movement;
})();
module.exports = Movement;
//# sourceMappingURL=movement.js.map