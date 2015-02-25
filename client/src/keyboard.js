define(["require", "exports", "./key"], function (require, exports, Key) {
    var Keyboard = (function () {
        //Add the event listeners to the window
        function Keyboard() {
            this._onKeyDown = function (event) {
                return this.processKeyDown(event);
            };
            //The onKeyUp event of the document is the following function:
            this._onKeyUp = function (event) {
                return this.processKeyUp(event);
            };
            this.keys = {};
            window.addEventListener('keydown', this._onKeyDown.bind(this), false);
            window.addEventListener('keyup', this._onKeyUp.bind(this), false);
        }
        Keyboard.prototype.getKey = function (keycode) {
            //Check if the key allready exists
            if (this.keys[keycode] === undefined) {
                //Add a brand new key to the keyboards key list
                this.keys[keycode] = new Key(keycode);
            }
            //Return the key so we can use it in other functions
            return this.keys[keycode];
        };
        Keyboard.prototype.processKeyDown = function (event) {
            //Only continue if the key being pressed is assigned to the keyboard
            if (this.keys[event.keyCode] !== undefined) {
                //Prevent the default action of the key
                event.preventDefault();
                //Call the callback's defined on this key
                this.keys[event.keyCode].processKeyDown(event);
            }
        };
        /**
         * Function that handles keydown events
         * @protected
         *
         * @param {Object} event - The event object
         */
        Keyboard.prototype.processKeyUp = function (event) {
            //Only continue if the key being pressed is assigned to the keyboard
            if (this.keys[event.keyCode] !== undefined) {
                //Call the callback's defined on this key
                this.keys[event.keyCode].processKeyUp(event);
            }
        };
        return Keyboard;
    })();
    return Keyboard;
});
//# sourceMappingURL=keyboard.js.map