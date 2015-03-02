import Stage = require("./stage");
import PerfomanceStats = require("./perfomancestats");
import SpriteProvider = require("./map/SpriteProvider");

class UiInitializer {

    static stage: Stage;

    static initialize() {

        // TODO: Use Asset Loader
        //var assetsToLoader = ["assets/tiles.json"];
        //var loader = new PIXI.AssetLoader(assetsToLoader, true);

        //Define the callback when the loader has finished
        //loader.onComplete = this.initialize.bind(this);

        //Start loading the assets
        //loader.load();
        PerfomanceStats.initialize();
        SpriteProvider.initialize();
        this.stage = new Stage();
        this.stage.update();
    }
}

export = UiInitializer; 