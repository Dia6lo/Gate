import Key = require("./key");

class Keyboard {
    keys;

    onKeyDown(event) {
        return this.processKeyDown(event);
    }

    onKeyUp(event) {
        return this.processKeyUp(event);
    }

    constructor() {
        this.keys = {};
        window.addEventListener("keydown", this.onKeyDown.bind(this), false);
        window.addEventListener("keyup", this.onKeyUp.bind(this), false);
    }

    getKey(keycode) {
        if (this.keys[keycode] === undefined) {
            this.keys[keycode] = new Key(keycode);
        }
        return this.keys[keycode];
    }

    processKeyDown(event) {
        if (this.keys[event.keyCode] !== undefined) {
            event.preventDefault();
            this.keys[event.keyCode].processKeyDown(event);
        }
    }

    processKeyUp(event) {
        if (this.keys[event.keyCode] !== undefined) {
            this.keys[event.keyCode].processKeyUp(event);
        }
    }
}

export = Keyboard;