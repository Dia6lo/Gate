import Map = require("./elements/map");
import PerfomanceStats = require("./perfomancestats");
import ServiceProvider = require("../serviceprovider");

class Stage {

    private width: number;
    private height: number;
    private stage: PIXI.Stage;
    private renderer: PIXI.PixiRenderer;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stage = new PIXI.Stage(0x000000);
        this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
        document.body.appendChild(this.renderer.view);
        this.initializeMap();
        this.stage.addChild(ServiceProvider.TextLog.container);
        this.stage.addChild(ServiceProvider.Tooltip.container);
        this.stage.mousemove = this.onMove.bind(this);
    }

    private initializeMap() {
        var map = new Map(2);
        this.stage.addChild(map);
        map.position = new PIXI.Point(this.width / 4);
    }

    private onMove(mouseData: PIXI.InteractionData) {
        ServiceProvider.Tooltip.container.position = mouseData.global;
    }

    update() {
        PerfomanceStats.stats.begin();
        this.renderer.render(this.stage);
        PerfomanceStats.stats.end();
        requestAnimationFrame(this.update.bind(this));
    }
}

export = Stage;