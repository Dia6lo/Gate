module Game {
    export class Game {

        width: number;
        height: number;
        settings;
        stage: PIXI.Stage;
        renderer: PIXI.PixiRenderer;
        map: Map;
        world: World;
        player: Entity;
        keyboard: Keyboard;
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
            this.keyboard = new Keyboard();
            this.initializeMap();
            this.initializePlayer();
            this.update();
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

        initializePlayer() {
            var playerControls = {
                "left": 65,
                "right": 68,
                "up": 87,
                "down": 83,
            };
            this.player = new Entity(this, "Player", "warrior.png", 3, 3, playerControls);
            this.map.entities.addEntity(this.player);
            var startingTile = this.map.tiles[3][3];
            startingTile.addEntity(this.player);
        }
    }

    class Entity {
        type: string;
        game: Game;
        sprite: PIXI.Sprite;
        position;
        keyboard: KeyboardControl;
        constructor(game: Game, type: string, sprite: string, x: number, y: number, controls) {
            this.position = { x: x, y: y };
            this.game = game;
            this.type = type;
            this.sprite = PIXI.Sprite.fromImage(sprite);
            this.keyboard = new KeyboardControl(game, this, controls);
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

    class Map extends PIXI.SpriteBatch {

        game: Game;
        settings;
        tiles: Array<Array<Tile>>;
        pixitiles: Array<Array<PIXI.Sprite>>;
        entities: Group;

        constructor(game: Game) {
            super();
            this.game = game;
            this.tiles = [];
            this.pixitiles = [];
            this.entities = new Group(game);
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
        entities: Array<Entity>;

        constructor(type: number, blockLight: boolean, room: number) {
            this.entities = [];
        }
        addEntity(entity) {
            this.entities.push(entity);
        }
        removeEntity(entity) {

            //Get the current position of the entity
            var index = this.entities.indexOf(entity);

            //If the entity exists, remove it
            if (index === -1) {

                //The entity doesn't even exist on this tile
                return false;

            } else {

                //Remove the entity from the tile
                this.entities.splice(index, 1);

                //We have removed the entity
                return true;

            }

        }
    }

    class Group extends PIXI.DisplayObjectContainer {
        game: Game;
        entities: Array<Entity>;
        constructor(game) {
            super();
            this.game = game;
            this.entities = [];
        }
        addEntity(entity: Entity) {
            this.addChild(entity.sprite);
            var position = entity.position;

            //Translate to a new position
            var newPosition = {
                x: position.x * 16,
                y: position.y * 16
            };

            //Set the position
            entity.sprite.position = new PIXI.Point(newPosition.x, newPosition.y);
            this.entities.push(entity);
        }
        removeEntity(entity) {

            //Check if the entity exists, if not, we don't have to delete it
            var index = this.entities.indexOf(entity);

            //The element doesn't exist in the list
            if (index === -1) {

                return;

            }

            //Remove the sprite component from the the DisplayObjectContainer
            this.removeChild(entity.sprite);

            //Remove the current entity from the group
            this.entities.splice(index, 1);

        }
    }

    class KeyboardControl {
        game: Game;
        entity: Entity;
        controls;
        keyboard: Keyboard;
        constructor(game: Game, entity: Entity, controls) {
            this.game = game;
            this.entity = entity;
            this.controls = controls;
            this.keyboard = game.keyboard;
            for (var key in this.controls) {

                //Make sure that obj[key] belongs to the object and was not inherited
                if (this.controls.hasOwnProperty(key)) {

                    switch (key) {

                        case ("left"):

                            //Add up key and tell it to move the entities up when it hits
                            var leftKey = this.keyboard.getKey(this.controls[key]);

                            //Attach the new position function to the keydown event
                            leftKey.onDown.on(this.controls[key], this.newPosition.bind(this, "left"), this);

                            break;

                        case ("right"):

                            //Add up key and tell it to move the entities up when it hits
                            var rightKey = this.keyboard.getKey(this.controls[key]);

                            //Attach the new position function to the keydown event
                            rightKey.onDown.on(this.controls[key], this.newPosition.bind(this, "right"), this);

                            break;

                        case ("up"):

                            //Add up key and tell it to move the entities up when it hits
                            var upKey = this.keyboard.getKey(this.controls[key]);

                            //Attach the new position function to the keydown event
                            upKey.onDown.on(this.controls[key], this.newPosition.bind(this, "up"), this);

                            break;

                        case ("down"):

                            //Add up key and tell it to move the entities up when it hits
                            var downKey = this.keyboard.getKey(this.controls[key]);

                            //Attach the new position function to the keydown event
                            downKey.onDown.on(this.controls[key], this.newPosition.bind(this, "down"), this);

                            break;

                    }

                }

            }

        }
        newPosition(direction) {

            //Define variables
            var movement = { x: 0, y: 0 };

            //Check which controls are being pressed and update the player accordingly
            switch (direction) {

                case ("left"):

                    movement.x = -1

                    break;

                case ("up"):

                    movement.y = -1

                    break;

                case ("right"):

                    movement.x = 1

                    break;

                case ("down"):

                    movement.y = 1

                    break;

            }
            this.game.map.entities.removeEntity(this.entity);
            var startingTile = this.game.map.tiles[this.entity.position.x][this.entity.position.y];
            startingTile.removeEntity(this.entity);

            this.entity.position.x += movement.x;
            this.entity.position.y += movement.y;

            this.game.map.entities.addEntity(this.entity);
            var finishTile = this.game.map.tiles[this.entity.position.x][this.entity.position.y];
            startingTile.addEntity(this.entity);
        }
    }

    class Keyboard {
        keys;

        _onKeyDown = function (event) {
            return this.processKeyDown(event);
        };

        //The onKeyUp event of the document is the following function:
        _onKeyUp = function (event) {
            return this.processKeyUp(event);
        };

        //Add the event listeners to the window

        constructor() {
            this.keys = {};
            window.addEventListener('keydown', this._onKeyDown.bind(this), false);
            window.addEventListener('keyup', this._onKeyUp.bind(this), false);
        }

        getKey(keycode) {

            //Check if the key allready exists
            if (this.keys[keycode] === undefined) {

                //Add a brand new key to the keyboards key list
                this.keys[keycode] = new Key(keycode);

            }

            //Return the key so we can use it in other functions
            return this.keys[keycode];
        }
        processKeyDown(event) {

            //Only continue if the key being pressed is assigned to the keyboard
            if (this.keys[event.keyCode] !== undefined) {

                //Prevent the default action of the key
                event.preventDefault();

                //Call the callback's defined on this key
                this.keys[event.keyCode].processKeyDown(event);

            }

        }

        /**
         * Function that handles keydown events
         * @protected
         *
         * @param {Object} event - The event object
         */
        processKeyUp(event) {

            //Only continue if the key being pressed is assigned to the keyboard
            if (this.keys[event.keyCode] !== undefined) {

                //Call the callback's defined on this key
                this.keys[event.keyCode].processKeyUp(event);

            }

        }
    }

    class Key {
        isDown: boolean;
        isUp: boolean;
        lastDown: number;
        lastUp: number;
        delay: number;
        onDown: Event;
        onUp: Event;
        keycode: number;
        constructor(keycode) {
            this.keycode = keycode;
            this.isDown = false;

            /**
             * @property {Boolean} isUp - Boolean to see if the key is up
             */
            this.isUp = false;

            /**
             * @property {Number} lastDown - Timestamp of the last key press
             */
            this.lastDown = 0;

            /**
             * @property {Number} lastUp - Timestamp of the last key release
             */
            this.lastUp = 0;

            /**
             * @property {Number} delay - Delay between two events on keydown
             */
            this.delay = 50;

            /**
             * @property {Event} onDown - Event that handles onDown event
             */
            this.onDown = new Event();

            /**
             * @property {Event} onUp - Event that handles onUp event
             */
            this.onUp = new Event();
        }
        processKeyDown(event) {


            //If the key is allready down, the user is holding it
            if (this.isDown) {

                //Check if the onDown event should be triggered again
                if (event.timeStamp > this.lastDown + this.delay) {
                    this.onDown.trigger(this.keycode);
                    this.lastDown = event.timeStamp;
                }

            } else {

                //Update this keys properties
                this.isDown = true;
                this.isUp = false;
                this.lastDown = event.timeStamp;

                //Trigger the event with this keycode
                this.onDown.trigger(this.keycode);

            }

        }

        /**
         * Function that handles keyup events
         * @protected
         *
         * @param {Object} event - The event object
         */
        processKeyUp(event) {

            //Update this keys properties
            this.isDown = false;
            this.isUp = true;
            this.lastUp = event.timeStamp;

            //Trigger the event with this keycode
            this.onUp.trigger(this.keycode);

        }
    }

    class Event {
        events;
        constructor() {
            this.events = {};
        }
        on(type, callback, context) {

            //If this.events doesn't have the event property, create an empty array
            if (!this.events.hasOwnProperty(type)) {
                this.events[type] = [];
            }

            //Insert the callback into the current event
            this.events[type].push([callback, context]);

        }

        /**
         * Function that is called when an event is triggered
         * @protected
         *
         * @param {String} type - The type of event that is triggered
         */
        trigger(type) {

            //Because we don't know how many arguments are being send to
            //the callbacks, let's get them all except the first one ( the tail )
            var tail = Array.prototype.slice.call(arguments, 1);

            //Get all the callbacks for the current event
            var callbacks = this.events[type];

            //Check if there are callbacks defined for this key, if not, stop!
            if (callbacks !== undefined) {

                //Loop through the callbacks and run each callback
                for (var i = 0; i < callbacks.length; i++) {

                    //Get the current callback function
                    var callback = callbacks[i][0];
                    var context;

                    //Get the current context object, if it exists
                    if (callbacks[i][1] === undefined) {

                        //If the context is not defined, the scope is going to be this ( Event object )
                        context = this;

                    } else {

                        //Get the context object
                        context = callbacks[i][1];

                    }

                    //Run the current callback and send the tail along with it
                    //The apply() method calls a function with a given this value and arguments provided as an array
                    callback.apply(context, tail);

                }

            }

        }
    }
}