//export module Game {
    export class Game {
        map: Map;
        player: Entity;
        constructor() {
            this.initialize();
        }

        initialize() {
            this.map = new Map();
            this.initializePlayer();
        }

        initializePlayer() {
            this.player = new Entity("Player", "warrior.png", 3, 3);
            var startingTile = this.map.tiles[3][3];
            startingTile.addEntity(this.player);
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
            var startingTile = this.map.tiles[this.player.position.x][this.player.position.y];
            var finishTile = this.map.tiles[this.player.position.x + movement.x][this.player.position.y + movement.y];
            //console.log(finishTile.blocking);
            if (!finishTile.blocking) {
                startingTile.removeEntity(this.player);

                this.player.position.x += movement.x;
                this.player.position.y += movement.y;

                var finishTile = this.map.tiles[this.player.position.x][this.player.position.y];
                finishTile.addEntity(this.player);
            }
        }
    }

    class Entity {
        type: string;
        sprite: string;
        position;
        constructor(type: string, sprite: string, x: number, y: number) {
            this.position = { x: x, y: y };
            this.type = type;
            this.sprite = sprite;
        }
    }

    class Map {

        settings;
        tiles: Array<Array<Tile>>;

        constructor() {

            this.tiles = [];
            this.initialize();
        }

        initialize() {
            this.settings = {
                tilesX: 20, //The number of horizontal tiles on this map
                tilesY: 10, //The number of vertical tiles on this map
            };
            var tile: string;
            var blocking: boolean;
            //Loop through every horizontal row
            for (var x = 0; x < this.settings.tilesX; x++) {

                //Initialize this row
                this.tiles[x] = [];

                //Loop through every vertical row
                for (var y = 0; y < this.settings.tilesY; y++) {
                    blocking = false;
                    tile = "dungeon.png";
                    if ((y == 0) || (y == this.settings.tilesY - 1)) {
                        tile = "wall.png"
                        blocking = true;
                    }
                    if (x == 0) {
                        tile = "leftwall.png"
                        blocking = true;
                    }
                    if (x == this.settings.tilesX - 1) {
                        tile = "rightwall.png"
                        blocking = true;
                    }
                    //Initialize this position by setting it to zero, and blocking light
                    this.tiles[x][y] = new Tile(tile, blocking);

                }

            }
        }
        
    }

    class Tile {
        entities: Array<Entity>;
        texture: string;
        blocking: boolean;

        constructor(texture: string, blocking: boolean) {
            this.entities = [];
            this.texture = texture;
            this.blocking = blocking;
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

//}