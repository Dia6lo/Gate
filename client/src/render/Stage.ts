import TilesetProvider = require("./TilesetProvider");
import MapContainer = require("./MapContainer");

class Stage {

    width: number;
    height: number;
    stage: PIXI.Stage;
    renderer: PIXI.PixiRenderer;
    
    mc: MapContainer;

    constructor() {
        TilesetProvider.init();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stage = new PIXI.Stage(0x000000);
        this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
        document.body.appendChild(this.renderer.view);
        this.mc = new MapContainer();
        this.stage.addChild(this.mc);
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.renderer.render(this.stage);
    }
}

export = Stage;