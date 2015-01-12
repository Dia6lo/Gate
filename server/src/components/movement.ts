import Component = require("./interface");
import MovementSystem = require("../systems/movement");

class Movement extends Component{
    static name = "movement";
    value;
    constructor(private movementSystem: MovementSystem) {
        super();
    }

    move(entity: Entity, destination) {
        this.movementSystem.newPosition(entity, destination);
    }
}

export = Movement;