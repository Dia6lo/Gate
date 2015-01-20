import EntityManager = require("../entitymanager");
import WorldManager = require("../worldmanager");
import SystemManager = require("../systemmanager");
import Vector2 = require("../geometry/vector2");
import PlayerFactory = require("../factories/playerfactory");
import Transform = require("../components/transform");
import Render = require("../components/render");

class PlayerSystem implements System {
    private players: { [id: number]: number };

    constructor(private entityManager: EntityManager, private worldManager: WorldManager, private systemManager: SystemManager) {
        this.players = [];
    }

    initializePlayer(id: number): { id: number; position: Vector2 } {
        do {
            var x = Math.floor((Math.random() * 18) + 1);
            var y = Math.floor((Math.random() * 8) + 1);
        } while (this.worldManager.tiles[x][y].volume > 50);
        var position = new Vector2(x, y);
        var player = PlayerFactory.new(this.entityManager, id, position);
        this.players[id] = player;
        this.worldManager.addEntity(new Vector2(x, y), player);
        return { id: id, position: new Vector2(x, y) };
    }

    destroyPlayer(id: number): { id: number; position: Vector2 } {
        var player = this.players[id]
        var position = this.entityManager.getComponent(player, Transform).position;
        this.worldManager.removeEntity(player);
        this.entityManager.destroyEntity(player);
        this.players[id] = undefined;
        return { id: id, position: position };
    }


    movePlayer(id: number, direction: string): { id: number; moved: boolean; destination: Vector2 } {
        var player = this.players[id];
        if (player == undefined)
            return;
        var offset = this.getOffset(direction);
        var position = this.entityManager.getComponent(player, Transform).position;
        var destination = position.combine(offset);
        if (this.systemManager.staticSystems.movementSystem.moveEntity(player, destination))
            return { id: player, moved: true, destination: destination };
        return { id: player, moved: false, destination: destination };

    }


    getOffset(direction: string): Vector2 {
        var movement = new Vector2(0, 0);
        switch (direction) {
            case ("left"):
                movement.x = -1
                break;
            case ("up"):
                movement.y = -1
                break;
            case ("right"):
                movement.x = 1
                break;
            case ("down"):
                movement.y = 1
                break;
        }
        return movement;
    }

    getMap(id: number): { floorType: string; entities: { entity: number; type: string }[] }[][] {
        var world = this.worldManager;
        var player = this.players[id];
        var output: { floorType: string; entities: { entity: number; type: string }[] }[][] = []
        for (var x = 0; x < world.settings.tilesX; x++) {
            output[x] = [];
            for (var y = 0; y < world.settings.tilesY; y++) {
                var tile = world.tiles[x][y];
                var entities: { entity: number; type: string }[] = [];
                for (var i = 0; i < tile.entities.length; i++)
                {
                    var entity = tile.entities[i];
                    entities.push({ entity: entity, type: this.entityManager.getComponent(entity, Render).type });
                }
                output[x][y] = { floorType: tile.floorType, entities: entities };
            }
        }
        return output;
    }
}

export = PlayerSystem;