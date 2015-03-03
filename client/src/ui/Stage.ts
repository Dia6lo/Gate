import MapContainer = require("./elements/mapcontainer");
import PerfomanceStats = require("./perfomancestats");
import ServiceProvider = require("../serviceprovider");

class Stage {

    width: number;
    height: number;
    stage: PIXI.Stage;
    renderer: PIXI.PixiRenderer;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.stage = new PIXI.Stage(0x000000);
        this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
        document.body.appendChild(this.renderer.view);
        var ui = new MapContainer();
        this.stage.addChild(ui);
        ui.position = new PIXI.Point(this.width / 4);
        this.stage.addChild(ServiceProvider.TextLog.container);
        this.stage.addChild(ServiceProvider.Tooltip.container);
        this.stage.mousemove = this.onMove.bind(this);
    }

    onMove(mouseData: PIXI.InteractionData) {
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