import Component = require("./interface");

class Position extends Component{
    static name = "position";
    value: { x: number; y:number};
    constructor(x: number, y: number) {
        super();
        this.value.x = x;
        this.value.y = y;
    }
}

export = Position;