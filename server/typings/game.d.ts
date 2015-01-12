interface Component {
}

interface Entity {
    id: number;
    sprite: string;
    components: { [name: string]: Component; };

    constructor(id: number, sprite: string, x: number, y: number, movementSystem);
    hasComponent(name: string): boolean;
    getComponent(name: string): Component;
    addComponent(component: Component): void;
    removeComponent(component: Component): void;
}