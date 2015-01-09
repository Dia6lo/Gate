module Game {
    export class Game {

        width: number;
        height: number;
        settings;
        stage: PIXI.Stage;
        renderer: PIXI.PixiRenderer;
        map: Map;
        world: World;

        constructor() {
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
            this.initializeMap();
            this.update();
            //this.renderer.render(this.stage);
        }

        update() {
            //requestAnimationFrame(this.update.bind(this));
            this.renderer.render(this.stage);
        }

        initializeMap() {
            //Initialize the map
            this.map = new Map(this);

            //Add the entities group to the world
            //this.world.addChild(this.map.entities);
        }
    }

    class World extends PIXI.DisplayObjectContainer {

        game: Game;
        camera: Camera;
        scale: PIXI.Point;

        constructor(game: Game) {
            super();
            this.game = game;
            this.initialize();
        }

        initialize() {
        this.camera = new Camera();//(this.game, new Vector2(0, 0));

        //Scale the entire world
        this.scale = new PIXI.Point(this.game.settings.zoom, this.game.settings.zoom);

        //Add the container object to the stage
        this.game.stage.addChild(this);
        }
    }

    class Camera {
        constructor() {

        }
    }

    class Map extends PIXI.SpriteBatch{

        game: Game;
        settings;
        tiles: Array<Array<Tile>>;
        pixitiles: Array<Array<PIXI.Sprite>>;
        //entities;

        constructor(game: Game) {
            super();
            this.game = game;
            this.tiles = [];
            this.pixitiles = [];
            this.initialize();
        }

        initialize() {
            //TODO: Make this dynamic on the depth of the dungeon, this will allow the generator to make more complicated maps the deeper you go
            //Define settings
            this.settings = {
                tilesX: 20, //The number of horizontal tiles on this map
                tilesY: 10, //The number of vertical tiles on this map
                tileSize: 16, //The width and height of a single tile
            };
            var tile: string;
            //Loop through every horizontal row
            for (var x = 0; x < this.settings.tilesX; x++) {

                //Initialize this row
                this.tiles[x] = [];
                this.pixitiles[x] = [];
                
                //Loop through every vertical row
                for (var y = 0; y < this.settings.tilesY; y++) {
                    if ((y == 0) || (y == this.settings.tilesY - 1))
                        tile = "wall.png"
                    else
                        tile = "dungeon.png"
                    if (x == 0)
                        tile = "leftwall.png"
                    if (x == this.settings.tilesX - 1)
                        tile = "rightwall.png"
                    //Initialize this position by setting it to zero, and blocking light
                    this.tiles[x][y] = new Tile(0, true, 0);

                    this.pixitiles[x][y] = PIXI.Sprite.fromImage(tile);

                    this.pixitiles[x][y].position.x = x * this.settings.tileSize;
                    this.pixitiles[x][y].position.y = y * this.settings.tileSize;

                    //Add the tile to the container
                    this.addChild(this.pixitiles[x][y]);

                }

            }

            //Add the container object to the stage
            this.game.world.addChild(this);
        }
    }

    class Tile {
        constructor(type: number, blockLight: boolean, room: number) {
        }
    }
}