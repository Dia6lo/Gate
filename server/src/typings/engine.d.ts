/*
    COMPONENTS
*/

//Main interface
interface Component {
    getName(): string;
}

//Components interfaces

declare var Transform: ITransform;
interface ITransform extends Component {
    position: Vector2;
}

/*
    WORLD
*/
/*
interface World {
    settings;
    tiles: Array<Array<Tile>>;

    initialize()
}

interface WorldStatic {
    new (): World;
}

declare var World: WorldStatic;

interface Tile {
    entities: Array<Entity>;
    player: Entity;
    texture: string;
    blocking: boolean;
    addEntity(entity);
    removeEntity(entity);
}*/

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