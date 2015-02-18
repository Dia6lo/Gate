/*
    COMPONENTS
*/


//Main interface
//TODO: make componentName final (SOMEHOW)
interface Component {
    componentName: string;
}

interface Player extends Component {
    name: string;
}

interface Render extends Component {
    type: string;
}


interface Shape extends Component {
    volume: number;
}

interface Transform extends Component {
    position: Vector2;
}
/*
    SYSTEMS
*/


//Main interface
interface System {
    //getType(): string;
}


/*
    WORLD
*/


interface ITile {
    entities: number[];
    volume: number;


}


/*
    GEOMETRY
*/

interface Vector2 {

    x: number;
    y: number;

    combine(other: Vector2): Vector2
    add(other: Vector2);
    distance(pos);
    manhattan(pos);
    clone();
    toString();
}