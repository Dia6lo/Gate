import Stage = require("./render/Stage");
import KeyboardControl = require("./controls/keyboardcontrol");

class Game {

    stage: Stage;
    keyboard: KeyboardControl;

    constructor() {
        //var assetsToLoader = ["assets/tiles.json"];
        //var loader = new PIXI.AssetLoader(assetsToLoader, true);

        //Define the callback when the loader has finished
        //loader.onComplete = this.initialize.bind(this);

        //Start loading the assets
        //loader.load();
        this.initialize();
    }

    initialize() {
        this.stage = new Stage();
        this.stage.update();
        var playerControls = {
            "up": "W",
            "left": "A",
            "down": "S",
            "right": "D"
        };
        this.keyboard = new KeyboardControl(playerControls);
    }
}

export = Game;