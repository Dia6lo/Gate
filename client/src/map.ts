import Tile = require("./tile");
import Group = require("./group");
import Entity = require("./entity");

class Map extends PIXI.SpriteBatch {

    game;
    settings;
    tiles: Array<Array<Tile>>;
    pixitiles: Array<Array<PIXI.Sprite>>;
    entities: Group;

    constructor(game) {
        super();
        this.game = game;
        this.tiles = [];
        this.pixitiles = [];
        this.entities = new Group(game);
        //TODO: Make this dynamic on the depth of the dungeon, this will allow the generator to make more complicated maps the deeper you go
        //Define settings
        this.settings = {
            tilesX: 20, //The number of horizontal tiles on this map
            tilesY: 10, //The number of vertical tiles on this map
            tileSize: 16, //The width and height of a single tile
        };

        this.initialize();
    }
    initialize() {
        for (var x = 0; x < this.settings.tilesX; x++) {

            //Initialize this row
            this.tiles[x] = [];
            this.pixitiles[x] = [];

            //Loop through every vertical row
            for (var y = 0; y < this.settings.tilesY; y++) {
                this.pixitiles[x][y] = PIXI.Sprite.fromImage(this.game.assetsFolder + "warrior.png");

                this.pixitiles[x][y].position.x = x * this.settings.tileSize;
                this.pixitiles[x][y].position.y = y * this.settings.tileSize;

                //Add the tile to the container
                this.addChild(this.pixitiles[x][y]);
                //Initialize this position by setting it to zero, and blocking light
                this.tiles[x][y] = new Tile();
            }
        }
        this.game.world.addChild(this);
    }
    create(map) {
        if (map != undefined)
            this.removeChildren();
            for (var x = 0; x < this.settings.tilesX; x++) {

                //Loop through every vertical row
                for (var y = 0; y < this.settings.tilesY; y++) {
                    this.pixitiles[x][y] = PIXI.Sprite.fromImage(this.game.assetsFolder + map.tiles[x][y].texture);

                    this.pixitiles[x][y].position.x = x * this.settings.tileSize;
                    this.pixitiles[x][y].position.y = y * this.settings.tileSize;
                    this.addChild(this.pixitiles[x][y]);
                    map.tiles[x][y].entities.forEach(entity=> {
                        var playerControls = {
                            "left": 65,
                            "right": 68,
                            "up": 87,
                            "down": 83,
                        };
                        this.game.player = new Entity(this.game, "Player", "warrior.png", x, y, playerControls);
                        this.entities.addEntity(this.game.player);
                        
                        //this.game.player = new Entity(this.game, "Player", "warrior.png", 3, 3, playerControls);
                        //this.entities.addEntity(this.game.player);
                        //var startingTile = this.tiles[this.game.player.position.x][this.game.player.position.y];
                        //this.entities.removeEntity(this.game.player);
                        //this.game.player.position = { x: x, y: y };
                        //var finishTile = this.tiles[x][y];
                        //this.entities.addEntity(this.game.player);
                    });
                }

            }
    }
    update(update) {
        var from = update.from;
        var to = update.to;
        this.entities.removeEntity(this.game.player);
        this.game.player.position = { x: update.to.x, y: update.to.y };
        this.entities.addEntity(this.game.player);
    }
}

export = Map;