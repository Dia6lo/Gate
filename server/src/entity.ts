class Entity {
    id: number;
    sprite: string;
    position;
    constructor(id: number, sprite: string, x: number, y: number) {
        this.position = { x: x, y: y };
        this.id = id;
        this.sprite = sprite;
    }
}

export = Entity;