import Stage = require("./stage");

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
        this.stage = new Stage();
        this.stage.update();
    }
}

export = UiInitializer;