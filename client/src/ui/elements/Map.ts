import Tile = require ("./map/tile");
import ServiceProvider = require("../../serviceprovider");

class Map extends PIXI.DisplayObjectContainer {
    private map: Map;
    private _zoom;

    set zoom(zoom: number) {
        this.scale = new PIXI.Point(zoom, zoom);
        this._zoom = zoom;
    }

    get zoom() {
        return this._zoom;
    }

    settings;

    constructor(zoom: number) {
        super();
        this.zoom = zoom;
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
                this.addTile(new Tile("Undefined"), x, y);
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
                this.addTile(new Tile(tile.FloorType, tile.Entities), x, y);
            }
        }
    }

    addTile(tile: Tile, x: number, y: number) {
        tile.position.x = x * this.settings.tileSize;
        tile.position.y = y * this.settings.tileSize;
        this.addChild(tile);
    }
}

export = Map;