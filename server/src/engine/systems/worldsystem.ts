import EntityManager = require("../entitymanager");
import Tile = require("../world/tile");
import Vector2 = require("../geometry/vector2");
import WallFactory = require("../factories/wallfactory");
import Transform = require("../components/transform");

class WorldSystem{

    settings;
    tiles: Array<Array<Tile>>;
    private _positions: { [entity: number]: Vector2 } //entity -> position

    constructor(private _entityManager: EntityManager) {
        this.tiles = [];
        this._positions = {};
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
                    var wall = WallFactory.new(this._entityManager, new Vector2(x, y));
                    this.addEntity(new Vector2(x,y), wall);
                }
            }
        }
    }

    addEntity(position: Vector2, entity: number) {
        this._positions[entity] = position;
        var tile = this.tiles[position.x][position.y];
        var volume = this._entityManager.getComponent(entity, Transform).volume;
        tile.entities.push(entity);
        tile.volume += volume;
    }

    removeEntity(entity: number) {
        var position = this._positions[entity];
        var tile = this.tiles[position.x][position.y];
        var index = tile.entities.indexOf(entity);
        if (index === -1) {
            return;
        }
        tile.entities.splice(index, 1);
        var volume = this._entityManager.getComponent(entity, Transform).volume;
        tile.volume -= volume;
    }

    moveEntity(entity: number, position: Vector2) {
        this.removeEntity(entity);
        this.addEntity(position, entity);
    }
}

export = WorldSystem;