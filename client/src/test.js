define(["require", "exports"], function (require, exports) {
    var Game = (function () {
        function Game() {
            this.assetsFolder = "assets/";
            this.settings = {
                zoom: 2 //The scale of the map
            };
            this.load();
        }
        Game.prototype.load = function () {
            //var assetsToLoader = ["assets/tilesets/dungeon.json"];
            //var loader = new PIXI.AssetLoader(assetsToLoader, true);
            //Define the callback when the loader has finished
            //loader.onComplete = this.initialize.bind(this);
            //Start loading the assets
            //loader.load();
            this.initialize();
        };
        Game.prototype.initialize = function () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.stage = new PIXI.Stage(0x000000);
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
            document.body.appendChild(this.renderer.view);
            this.world = new World(this);
            this.keyboard = new Keyboard();
            this.initializeMap();
            //this.initializePlayer();
            this.update();
            this.initializeClient();
            //this.isInitialized = true;
            //this.update();
            //this.renderer.render(this.stage);
        };
        Game.prototype.update = function () {
            requestAnimationFrame(this.update.bind(this));
            this.renderer.render(this.stage);
        };
        Game.prototype.initializeMap = function () {
            //Initialize the map
            this.map = new Map(this);
            //Add the entities group to the world
            this.world.addChild(this.map.entities);
        };
        Game.prototype.initializeClient = function () {
            this.client = new Client(this);
        };
        return Game;
    })();
    return Game;
});
//# sourceMappingURL=test.js.map