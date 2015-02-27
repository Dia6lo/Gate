import Map = require("./map/Map");

class UiContainer extends PIXI.DisplayObjectContainer {
    private map: Map;
    private _zoom;
    set zoom(zoom: number) {
        this.scale = new PIXI.Point(zoom, zoom);
        this._zoom = zoom;
    }

    get zoom() {
        return this._zoom;
    }

    constructor() {
        super();
        this.zoom = 1;
        this.map = new Map();
        this.addChild(this.map);
    }
}

export = UiContainer; 