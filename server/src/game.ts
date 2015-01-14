import World = require("./engine/world/world");
import Entity = require("./engine/entity");
import Systems = require("./engine/systems");
import Movement = require("./engine/components/movement");
import PlayerFactory = require("./engine/factories/player");
import Vector2 = require("./engine/geometry/vector2");

class Game {
    world: World;
    update;
    systems: Systems;
    isUpdated: boolean;
    players: { [id: number]: { x: number; y: number}; };
    constructor() {
        this.world = new World();
        this.isUpdated = false;
        this.update = {};
        this.players = {};
        this.systems = new Systems(this);
    }

    initializePlayer(id: number) {
        this.update = {};
        do {
            var x = Math.floor((Math.random() * 18) + 1);
            var y = Math.floor((Math.random() * 8) + 1);
        } while (this.world.tiles[x][y].player != null);
        var position = new Vector2(x, y);
        var player = PlayerFactory.new(id, this.world, position);
        //player.getC(Position).contents;
        player.addComponent(new Movement(this.systems.movement));
        this.players[id] = {x: x, y: y};
        var startingTile = this.world.tiles[x][y];
        startingTile.player = player;
        this.update = { x: x, y: y }
    }

    getPlayer(id: number): Entity {
        var player = this.players[id];
        return (player != undefined) ? this.world.tiles[player.x][player.y].player : null;
    }

    destroyPlayer(id: number): void {
        this.update = {};
        var player = this.getPlayer(id);
        if (player == null)
            return;
        var position = player.getComponent(Transform).position;
        this.update = { position: position }
        //Remove the current entity from the group
        this.players[id] = undefined;
        this.world.tiles[playerPosition.x][playerPosition.y].player = null;
    }

    playerMove(id, direction) {
        var player = this.getPlayer(id);
        if (player == null)
            return;
        this.update = { id: id, destination: direction }
        this.isUpdated = true;
        var destination = player.getComponent(Movement).move(player, direction);
        this.players[id].x = destination.x;
        this.players[id].y = destination.y;
    }
}

export = Game;