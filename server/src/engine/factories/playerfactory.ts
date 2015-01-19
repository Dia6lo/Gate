import Transform = require("../components/transform");
import Player = require("../components/player");
import EntityManager = require("../entitymanager");

class PlayerFactory {
    static new(em: EntityManager, id: number, position: Vector2): number {
        var player = em.createEntity("Player " + id);
        em.addComponent(player, new Transform(position, 75));
        em.addComponent(player, new Player("Player " + id.toString()));
        return player;
    }
}

export = PlayerFactory