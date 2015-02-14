import EntityManager = require("./engine/entitymanager");
import SystemManager = require("./engine/systemmanager");

class Game {
    entityManager: EntityManager;
    systemManager: SystemManager;
    
    constructor() {
        this.entityManager = new EntityManager();   
        this.systemManager = new SystemManager(this.entityManager);
    }
}

export = Game;