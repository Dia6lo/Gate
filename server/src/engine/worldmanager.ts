import EntityManager = require("./entitymanager");
import Tile = require("./world/tile");
import Vector2 = require("./geometry/vector2");
import WallFactory = require("./factories/wallfactory");

class WorldManager{

    settings;
    tiles: Array<Array<Tile>>;
    private entities: {[entity: number]: Vector2} //entity -> position

    constructor(private entityManager: EntityManager) {
        this.tiles = [];
        this.entities = {};
        this.settings = {
            tilesX: 20, //The number of horizontal tiles on this map
            tilesY: 10, //The number of vertical tiles on this map
        };
        this.initialize();
    }

    initialize() {
        for (var x = 0; x < this.settings.tilesX; x++) {
            this.tiles[x] = [];
            for (var y = 0; y < this.settings.tilesY; y++) {
                this.tiles[x][y] = new Tile();
                if ((y == 0) || (y == this.settings.tilesY - 1) || (x == 0) || (x == this.settings.tilesX - 1)) {
                    var wall = WallFactory.new(this.entityManager, new Vector2(x, y));
                    this.addEntity(new Vector2(x,y), wall);
                }
            }
        }
    }

    addEntity(position: Vector2, entity: number) {
        this.entities[entity] = position;
        var tile = this.tiles[position.x][position.y];
        var volume = this.entityManager.getComponent(entity, Transform).volume;
        tile.entities[entity] = volume;
        tile.volume += volume;
    }

    removeEntity(entity: number) {
        var position = this.entities[entity];
        var tile = this.tiles[position.x][position.y];
        tile.volume -= tile.entities[entity];
        tile.entities[entity] = undefined;
    }

    moveEntity(entity: number, position: Vector2) {
        this.removeEntity(entity);
        this.addEntity(position, entity);
    }
}

export = WorldManager;