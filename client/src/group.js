var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function (require, exports) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group(game) {
            _super.call(this);
            this.game = game;
            this.entities = [];
        }
        Group.prototype.addEntity = function (entity) {
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
        };
        Group.prototype.removeEntity = function (entity) {
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
        };
        return Group;
    })(PIXI.DisplayObjectContainer);
    return Group;
});
//# sourceMappingURL=group.js.map