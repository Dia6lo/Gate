import World = require("./engine/world/world");
import Systems = require("./engine/systems");
import PlayerFactory = require("./engine/factories/player");
import Vector2 = require("./engine/geometry/vector2"); 
import EntityManager = require("./engine/entitymanager");

class Game {
    world: World;
    update;
    systems: Systems;
    entityManager: EntityManager;
    isUpdated: boolean;
    players: {[id: number]: number};
    constructor() {
        this.players = [];
        this.entityManager = new EntityManager();

        this.world = new World();
        this.isUpdated = false;
        this.update = null;
        this.systems = new Systems(this);
    }

    initializePlayer(id: number) {
        do {
            var x = Math.floor((Math.random() * 18) + 1);
            var y = Math.floor((Math.random() * 8) + 1);
        } while (this.world.tiles[x][y].player != null);
        var position = new Vector2(x, y);
        var player = PlayerFactory.new(this.entityManager, id, position);
        this.players[id] = player;
        var startingTile = this.world.tiles[x][y];
        startingTile.player = player;
        this.update = new Vector2(x, y);
    }

    destroyPlayer(id: number): void {
        var player = this.players[id]
        var position = this.entityManager.getComponent(player, Transform).position;
        this.update = position;
        this.entityManager.destroyEntity(player);
        this.players[id] = undefined;
        this.world.tiles[position.x][position.y].player = null;
    }


    playerMove(id, direction) {
        var player = this.players[id];
        if (player == undefined)
            return;
        this.isUpdated = true;
        var destination = this.systems.movement.movePlayer(player, direction);
        this.update = { id: id, destination: destination }
    }
}

export = Game;