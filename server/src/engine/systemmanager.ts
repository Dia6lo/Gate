import EntityManager = require("./entitymanager");
import WorldSystem = require("./systems/worldsystem");
import MovementSystem = require("./systems/movementsystem");
import PlayerSystem = require("./systems/playersystem");

interface StaticSystems {
    playerSystem: PlayerSystem;
    movementSystem: MovementSystem;
    worldSystem: WorldSystem;
}

class SystemManager {
    staticSystems: StaticSystems;
    dynamicSystems: System[];

    constructor(private _entityManager: EntityManager) {
        this.staticSystems = <any>{};
        this.staticSystems.worldSystem = new WorldSystem(this._entityManager);
        this.staticSystems.movementSystem = new MovementSystem(this._entityManager,
                                                               this.staticSystems.worldSystem);
        this.staticSystems.playerSystem = new PlayerSystem(this._entityManager,
                                                            this.staticSystems.worldSystem,
                                                            this.staticSystems.movementSystem);
    }
}


export = SystemManager;