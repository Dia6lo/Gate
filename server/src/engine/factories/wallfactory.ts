import Transform = require("../components/transform");
import Render = require("../components/render");
import EntityManager = require("../entitymanager");

class WallFactory {
    static new(em: EntityManager, position: Vector2): number {
        var wall = em.createEntity("Wall");
        em.addComponent(wall, new Transform(position, 100));
        em.addComponent(wall, new Render("Dungeon wall"));
        return wall;
    }
}

export = WallFactory