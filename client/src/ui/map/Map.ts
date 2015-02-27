import TilesetProvider = require("./TilesetProvider");
import ServiceProvider = require("../../serviceprovider");

class Map extends PIXI.SpriteBatch {

    settings;

    constructor() {
        super();
        TilesetProvider.initialize();
        this.settings = {
            tilesX: 11,
            tilesY: 11,
            tileSize: 32
        };
        this.initialize();
    }

    initialize() {
        for (var x = 0; x < this.settings.tilesX; x++) {
            for (var y = 0; y < this.settings.tilesY; y++) {
                this.addSprite(TilesetProvider.getTile("Undefined"), x, y);
            }
        }

        ServiceProvider.Client.subscribe("map", this.update.bind(this), this);
    }

    update(map: any) {
        if (map != undefined)
            this.removeChildren();
        else
            return;
        for (var x = 0; x < this.settings.tilesX; x++) {
            for (var y = 0; y < this.settings.tilesY; y++) {
                var tile = map[x][y];
                this.addSprite(TilesetProvider.getTile(tile.FloorType), x, y);
                for (var i = 0; i < tile.Entities.length; i++) {
                    var type = tile.Entities[i].Type;
                    this.addSprite(TilesetProvider.getEntity(type), x, y);
                }
            }
        }
    }

    addSprite(sprite: PIXI.Sprite, x: number, y: number) {
        sprite.position.x = x * this.settings.tileSize;
        sprite.position.y = y * this.settings.tileSize;
        this.addChild(sprite);
    }
}

export = Map;