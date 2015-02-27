import Ev = require("./event");

class Key {

    isDown = false;
    lastDown = 0;
    delay = 50;
    onDown = new Ev();
    onUp = new Ev();

    setup(callback: Function, context: Object) {
        this.onDown.on("down", callback, context);
    }

    processKeyDown(event: Event) {
        if (this.isDown) {
            if (event.timeStamp > this.lastDown + this.delay) {
                this.onDown.trigger("down");
                this.lastDown = event.timeStamp;
            }
        }
        else {
            this.lastDown = event.timeStamp;
            this.isDown = true;
            this.onDown.trigger("down");
        }
    }

    processKeyUp(event: Event) {
        this.isDown = false;
        this.onUp.trigger("down");
    }
}

export = Key;