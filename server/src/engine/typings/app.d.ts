/*
    COMPONENTS
*/

//Main interface
interface Component {
    getName(): string;
}

interface ComponentStatic {
    new (): Component;
    name: string;
}

declare var Component: ComponentStatic;


//Components interfaces
interface ITransform extends Component {
    position: Vector2;
}

interface IMovement extends Component {
    moveEntity(entity: IEntity, direction: string);
}

//Declares
declare var Transform: ITransform;
declare var Movement: IMovement;

/*
    ENTITIES
*/

interface IEntity {
    id: number;
    type: string;
    components: { [name: string]: Component; };

    hasComponent(name: string): boolean;
    getComponent<T extends Component>(a: { prototype: T }): T
    addComponent(component: Component): void;
    removeComponent(component: Component): void;
}

interface Entity {
    new (): IEntity;
}

declare var Entity: IEntity;

/*
    WORLD
*/

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