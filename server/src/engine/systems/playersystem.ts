import WorldManager = require("../worldmanager");
import SystemManager = require("../systemmanager");
import EntityManager = require("../entitymanager");
import Vector2 = require("../geometry/vector2");
import PlayerFactory = require("../factories/playerfactory");

class PlayerSystem implements System {
    private players: { [id: number]: number };
    update;
    isUpdated: boolean;

    constructor(private worldManager: WorldManager, private systemManager: SystemManager, private entityManager: EntityManager) {
        this.players = [];
        this.isUpdated = false;
        this.update = null;
    }

    initializePlayer(id: number) {
        do {
            var x = Math.floor((Math.random() * 18) + 1);
            var y = Math.floor((Math.random() * 8) + 1);
        } while (this.worldManager.tiles[x][y].volume > 50);
        var position = new Vector2(x, y);
        var player = PlayerFactory.new(this.entityManager, id, position);
        this.players[id] = player;
        this.worldManager.addEntity(new Vector2(x, y), player);
        this.update = new Vector2(x, y);
    }

    destroyPlayer(id: number): void {
        var player = this.players[id]
        var position = this.entityManager.getComponent(player, Transform).position;
        this.update = position;
        this.worldManager.removeEntity(player);
        this.entityManager.destroyEntity(player);
        this.players[id] = undefined;
    }


    playerMove(id, direction) {
        var player = this.players[id];
        if (player == undefined)
            return;
        this.isUpdated = true;
        var destination = this.systemManager.movement.movePlayer(player, direction);
        this.update = { id: id, destination: destination }
    }

    getMap(entity: number) {
    }
}

export = PlayerSystem;