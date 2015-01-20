/*
    COMPONENTS
*/


//Main interface
interface Component {
    getType(): string;
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