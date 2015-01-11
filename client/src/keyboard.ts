import Key = require("./key");

class Keyboard {
    keys;

    _onKeyDown = function (event) {
        return this.processKeyDown(event);
    };

    //The onKeyUp event of the document is the following function:
    _onKeyUp = function (event) {
        return this.processKeyUp(event);
    };

    //Add the event listeners to the window

    constructor() {
        this.keys = {};
        window.addEventListener('keydown', this._onKeyDown.bind(this), false);
        window.addEventListener('keyup', this._onKeyUp.bind(this), false);
    }

    getKey(keycode) {

        //Check if the key allready exists
        if (this.keys[keycode] === undefined) {

            //Add a brand new key to the keyboards key list
            this.keys[keycode] = new Key(keycode);

        }

        //Return the key so we can use it in other functions
        return this.keys[keycode];
    }
    processKeyDown(event) {

        //Only continue if the key being pressed is assigned to the keyboard
        if (this.keys[event.keyCode] !== undefined) {

            //Prevent the default action of the key
            event.preventDefault();

            //Call the callback's defined on this key
            this.keys[event.keyCode].processKeyDown(event);

        }

    }

    /**
     * Function that handles keydown events
     * @protected
     *
     * @param {Object} event - The event object
     */
    processKeyUp(event) {

        //Only continue if the key being pressed is assigned to the keyboard
        if (this.keys[event.keyCode] !== undefined) {

            //Call the callback's defined on this key
            this.keys[event.keyCode].processKeyUp(event);

        }

    }
}

export = Keyboard;