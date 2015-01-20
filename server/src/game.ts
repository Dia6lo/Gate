import EntityManager = require("./engine/entitymanager");
import WorldManager = require("./engine/worldmanager");
import SystemManager = require("./engine/systemmanager");

class Game {
    entityManager: EntityManager;
    worldManager: WorldManager;
    systemManager: SystemManager;
    
    constructor() {
        this.entityManager = new EntityManager();
        this.worldManager = new WorldManager(this.entityManager);        
        this.systemManager = new SystemManager(this.entityManager, this.worldManager);
    }
}

export = Game;