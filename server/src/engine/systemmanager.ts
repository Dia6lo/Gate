import Game = require("../game");
import MovementSystem = require("./systems/movementsystem");
import PlayerSystem = require("./systems/playersystem");

interface StaticSystems {
    playerSystem: PlayerSystem
}

class SystemManager {
    movement: MovementSystem;
    staticSystems: StaticSystems;
    dynamicSystems: System[];
    constructor(game: Game) {
        this.movement = new MovementSystem(game.worldManager, game.entityManager);
        this.staticSystems = <any>{};
        this.staticSystems.playerSystem = new PlayerSystem(game.worldManager, game.systemManager, game.entityManager);
    }
}


export = SystemManager;