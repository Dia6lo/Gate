/*
    COMPONENTS
*/


//Main interface
//TODO: make name final (SOMEHOW)
interface Component {
    componentName: string;
}

interface Player extends Component {
    a: number;
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