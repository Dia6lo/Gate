
import Transform = require("../components/transform");
import Player = require("../components/player");
import Render = require("../components/render");
import EntityManager = require("../entitymanager");

class PlayerFactory {
    static new(em: EntityManager, id: number, position: Vector2): number {
        var player = em.createEntity("Player " + id);
        em.addComponent(player, new Transform(position, 75));
        em.addComponent(player, new Player("Player " + id.toString()));
        em.addComponent(player, new Render("Player"));
        return player;
    }
}

export = PlayerFactory