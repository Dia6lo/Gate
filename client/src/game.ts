import Client = require("./client");
import Map = require("./map");
import World = require("./world");
import Entity = require("./entity");
import Keyboard = require("./keyboard");

class Game {

    width: number;
    height: number;
    settings;
    stage: PIXI.Stage;
    renderer: PIXI.PixiRenderer;
    map: Map;
    world: World;
    player: Entity;
    keyboard: Keyboard;
    client: Client;
    assetsFolder: string;
    constructor() {
        this.assetsFolder = "assets/";
        this.settings = {
            tilesX: 20, //The number of horizontal tiles on this map
            tilesY: 10, //The number of vertical tiles on this map
            zoom: 2 //The scale of the map
        }
        this.load();
    }

    load() {
        //var assetsToLoader = ["assets/tilesets/dungeon.json"];
        //var loader = new PIXI.AssetLoader(assetsToLoader, true);

        //Define the callback when the loader has finished
        //loader.onComplete = this.initialize.bind(this);

        //Start loading the assets
        //loader.load();
        this.initialize();
    }

    initialize() {
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
    }

    update() {
        requestAnimationFrame(this.update.bind(this));
        this.renderer.render(this.stage);
    }

    initializeMap() {
        //Initialize the map
        this.map = new Map(this);

        //Add the entities group to the world
        this.world.addChild(this.map.entities);
    }

    initializeClient() {
        this.client = new Client(this);
    }
}

export = Game;