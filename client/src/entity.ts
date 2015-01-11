import KeyboardControl = require("./keyboardcontrol");

class Entity {
    type: string;
    game;
    sprite: PIXI.Sprite;
    position;
    keyboard: KeyboardControl;
    constructor(game, type: string, sprite: string, x: number, y: number, controls) {
        this.position = { x: x, y: y };
        this.game = game;
        this.type = type;
        this.sprite = PIXI.Sprite.fromImage(this.game.assetsFolder + sprite);
        this.keyboard = new KeyboardControl(game, this, controls);
    }
}

export = Entity;