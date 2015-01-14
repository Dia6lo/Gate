import Transform = require("../components/transform");
import EntityManager = require("../entitymanager");

class PlayerFactory {
    static new(em: EntityManager, id: number, position: Vector2): number {
        var player = em.createEntity("Player" + id);
        em.addComponent(player, new Transform(position));
        return player;
    }
}

export = PlayerFactory