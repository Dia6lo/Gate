/*
    COMPONENTS
*/


//Main interface
interface Component {
    getType(): string;
}

//Components interfaces

declare var Transform: ITransform;
interface ITransform extends Component {
    position: Vector2;
    volume: number;
}

declare var Player: IPlayer;
interface IPlayer extends Component {
    name: string;
}


declare var Construct: IConstruct;
interface IConstruct extends Component {
    type: string;
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


interface Tile {
    entities: { [entity: number]: number };
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