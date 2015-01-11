class Entity {
    type: string;
    game;
    sprite: PIXI.Sprite;
    position;
    constructor(game, type: string, sprite: string, x: number, y: number) {
        this.position = { x: x, y: y };
        this.game = game;
        this.type = type;
        this.sprite = PIXI.Sprite.fromImage(this.game.assetsFolder + sprite);
    }
}

export = Entity;