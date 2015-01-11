import Tile = require("./tile");
import Group = require("./group");
import Entity = require("./entity");
import KeyboardControl = require("./keyboardcontrol");

class Player extends Entity {
    keyboard: KeyboardControl;
    constructor(game, type: string, sprite: string, x: number, y: number, controls) {
        super(game, type, sprite, x, y);
        this.keyboard = new KeyboardControl(game, this, controls);
    }
}

class Map extends PIXI.SpriteBatch {

    game;
    settings;
    tiles: Array<Array<Tile>>;
    pixitiles: Array<Array<PIXI.Sprite>>;
    entities: Group;
    init: boolean;
    constructor(game) {
        super();
        this.init = false;
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
                        var poop = new Entity(this.game, "Poop", "skeleton.png", x, y);
                        this.entities.addEntity(poop);
                        this.tiles[x][y].entities[0] = poop;
                    });
                }

            }
    }

    addPlayer(position) {
        if (!this.init) {
            var playerControls = {
                "left": 65,
                "right": 68,
                "up": 87,
                "down": 83,
            };
            this.game.player = new Player(this.game, "Player", "warrior.png", position.x, position.y, playerControls);
            this.entities.addEntity(this.game.player);
            this.tiles[position.x][position.y].entities[0] = this.game.player;
            this.init = true;
        }
        else {
            var poop = new Entity(this.game, "Poop", "skeleton.png", position.x, position.y);
            this.tiles[position.x][position.y].entities[0] = poop;
            this.entities.addEntity(poop);
        }
    }

    removePlayer(position) {
        var ent = this.tiles[position.x][position.y].entities[0];
        this.entities.removeEntity(ent);
    }

    update(position) {
        var from = position.from;
        var to = position.to;
        var ent = this.tiles[from.x][from.y].entities[0];
        this.entities.removeEntity(ent);
        ent.position = { x: to.x, y: to.y };
        this.entities.addEntity(ent);
        this.tiles[to.x][to.y].entities[0] = ent;
    }
}

export = Map;