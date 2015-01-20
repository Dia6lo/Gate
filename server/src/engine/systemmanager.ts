import EntityManager = require("./entitymanager");
import WorldManager = require("./worldmanager");
import MovementSystem = require("./systems/movementsystem");
import PlayerSystem = require("./systems/playersystem");

interface StaticSystems {
    playerSystem: PlayerSystem;
    movementSystem: MovementSystem;
}

class SystemManager {
    staticSystems: StaticSystems;
    dynamicSystems: System[];

    constructor(private entityManager: EntityManager, private worldManager: WorldManager) {
        this.staticSystems = <any>{};
        this.staticSystems.playerSystem = new PlayerSystem(this.entityManager, this.worldManager, this);
        this.staticSystems.movementSystem = new MovementSystem(this.entityManager, this.worldManager);
    }
}


export = SystemManager;