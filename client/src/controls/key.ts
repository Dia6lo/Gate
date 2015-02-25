import Event = require("./event");

class Key {
    isDown: boolean;
    isUp: boolean;
    lastDown: number;
    lastUp: number;
    delay: number;
    onDown: Event;
    onUp: Event;
    keycode: number;

    constructor(keycode) {
        this.keycode = keycode;
        this.isDown = false;

        /**
         * @property {Boolean} isUp - Boolean to see if the key is up
         */
        this.isUp = false;

        /**
         * @property {Number} lastDown - Timestamp of the last key press
         */
        this.lastDown = 0;

        /**
         * @property {Number} lastUp - Timestamp of the last key release
         */
        this.lastUp = 0;

        /**
         * @property {Number} delay - Delay between two events on keydown
         */
        this.delay = 50;

        /**
         * @property {Event} onDown - Event that handles onDown event
         */
        this.onDown = new Event();

        /**
         * @property {Event} onUp - Event that handles onUp event
         */
        this.onUp = new Event();
    }

    processKeyDown(event) {


        //If the key is allready down, the user is holding it
        if (this.isDown) {

            //Check if the onDown event should be triggered again
            if (event.timeStamp > this.lastDown + this.delay) {
                this.onDown.trigger(this.keycode);
                this.lastDown = event.timeStamp;
            }

        } else {

            //Update this keys properties
            this.isDown = true;
            this.isUp = false;
            this.lastDown = event.timeStamp;

            //Trigger the event with this keycode
            this.onDown.trigger(this.keycode);

        }

    }

    /**
     * Function that handles keyup events
     * @protected
     *
     * @param {Object} event - The event object
     */
    processKeyUp(event) {

        //Update this keys properties
        this.isDown = false;
        this.isUp = true;
        this.lastUp = event.timeStamp;

        //Trigger the event with this keycode
        this.onUp.trigger(this.keycode);

    }
}

export = Key;