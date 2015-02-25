import Map = require("./Map");
import Client = require("../connection/client");

class MapContainer extends PIXI.DisplayObjectContainer {
    scale: PIXI.Point;
    map: Map;
    client: Client;
    zoom: number;

    constructor() {
        super();
        this.zoom = 1;
        this.scale = new PIXI.Point(this.zoom, this.zoom);
        this.map = new Map();
        this.addChild(this.map);
        this.client = new Client(this.map);
    }
}

export = MapContainer;