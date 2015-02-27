import UiContainer = require("./uicontainer");
import PerfomanceStats = require("./perfomancestats");

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
        var ui = new UiContainer();
        this.stage.addChild(ui);
    }

    update() {
        PerfomanceStats.stats.begin();
        this.renderer.render(this.stage);
        PerfomanceStats.stats.end();
        requestAnimationFrame(this.update.bind(this));
    }
}

export = Stage;