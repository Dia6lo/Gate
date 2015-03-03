import EventManager = require("../../utility/eventmanager");

class Key {

    private isDown = false;
    private lastDown = 0;
    private delay = 50;

    private action = new EventManager();

    setup(callback: Function, context: Object) {
        this.action.on("down", callback, context);
    }

    setDelay(delay: number) {
        this.delay = delay;
    }

    processKeyDown(event: Event) {
        if (!this.isDown) {
            this.lastDown = event.timeStamp;
            this.isDown = true;
            this.action.trigger("down");
            return;
        }
        if (event.timeStamp > this.lastDown + this.delay) {
            this.action.trigger("down");
            this.lastDown = event.timeStamp;
        }
    }

    processKeyUp(event: Event) {
        this.isDown = false;
        //this.action.trigger("up");
    }
}

export = Key;