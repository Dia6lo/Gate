class Entity {
    type: string;
    sprite: string;
    position;
    constructor(type: string, sprite: string, x: number, y: number) {
        this.position = { x: x, y: y };
        this.type = type;
        this.sprite = sprite;
    }
}

export = Entity;