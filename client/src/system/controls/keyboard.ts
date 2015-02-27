import Key = require("./key");

class Keyboard {
    keys: {[keycode: number]: Key} = {};

    constructor() {
        window.addEventListener("keydown", this.processKeyDown.bind(this), false);
        window.addEventListener("keyup", this.processKeyUp.bind(this), false);
    }

    setupKey(keycode: number, callback: Function, context: Object) {
        if (this.keys[keycode] === undefined) {
            this.keys[keycode] = new Key();
        }
        this.keys[keycode].setup(callback, context);
    }

    processKeyDown(event: KeyboardEvent) {
        if (this.keys[event.keyCode] !== undefined) {
            event.preventDefault();
            this.keys[event.keyCode].processKeyDown(event);
        }
    }

    processKeyUp(event: KeyboardEvent) {
        if (this.keys[event.keyCode] !== undefined) {
            this.keys[event.keyCode].processKeyUp(event);
        }
    }
}

export = Keyboard;