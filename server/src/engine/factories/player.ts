import Transform = require("../components/transform");
import Entity = require("../entity");

class PlayerFactory {
    static new(id: number, map: World, position: Vector2): Entity {
        var player = new Entity(1, "player");
        player.addComponent(new Transform(position));

        return player;
    }
}

export = PlayerFactory