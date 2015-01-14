import Game = require("../game");
import Movement = require("./systems/movement");

class Systems {
    movement: Movement;
    constructor(game: Game) {
        this.movement = new Movement(game.world, game.entityManager);
    }
}


export = Systems;