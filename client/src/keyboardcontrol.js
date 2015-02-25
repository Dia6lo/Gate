define(["require", "exports"], function (require, exports) {
    var KeyboardControl = (function () {
        function KeyboardControl(game, entity, controls) {
            this.game = game;
            this.entity = entity;
            this.controls = controls;
            this.keyboard = game.keyboard;
            for (var key in this.controls) {
                //Make sure that obj[key] belongs to the object and was not inherited
                if (this.controls.hasOwnProperty(key)) {
                    switch (key) {
                        case ("left"):
                            //Add up key and tell it to move the entities up when it hits
                            var leftKey = this.keyboard.getKey(this.controls[key]);
                            //Attach the new position function to the keydown event
                            leftKey.onDown.on(this.controls[key], this.newPosition.bind(this, "left"), this);
                            break;
                        case ("right"):
                            //Add up key and tell it to move the entities up when it hits
                            var rightKey = this.keyboard.getKey(this.controls[key]);
                            //Attach the new position function to the keydown event
                            rightKey.onDown.on(this.controls[key], this.newPosition.bind(this, "right"), this);
                            break;
                        case ("up"):
                            //Add up key and tell it to move the entities up when it hits
                            var upKey = this.keyboard.getKey(this.controls[key]);
                            //Attach the new position function to the keydown event
                            upKey.onDown.on(this.controls[key], this.newPosition.bind(this, "up"), this);
                            break;
                        case ("down"):
                            //Add up key and tell it to move the entities up when it hits
                            var downKey = this.keyboard.getKey(this.controls[key]);
                            //Attach the new position function to the keydown event
                            downKey.onDown.on(this.controls[key], this.newPosition.bind(this, "down"), this);
                            break;
                    }
                }
            }
        }
        KeyboardControl.prototype.newPosition = function (direction) {
            this.game.client.socket.emit("move", direction); //ws.send(direction);
        };
        return KeyboardControl;
    })();
    return KeyboardControl;
});
//# sourceMappingURL=keyboardcontrol.js.map