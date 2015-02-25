import Keyboard = require("./keyboard");
import Client = require("../connection/client");

class KeyboardControl {

    static keyboard: Keyboard;

    constructor(controls) {
        KeyboardControl.keyboard = new Keyboard();
        for (var key in controls) {

            //Make sure that obj[key] belongs to the object and was not inherited
            if (controls.hasOwnProperty(key)) {

                switch (key) {

                case ("left"):

                    //Add up key and tell it to move the entities up when it hits
                    var leftKey = KeyboardControl.keyboard.getKey(controls[key]);

                    //Attach the new position function to the keydown event
                    leftKey.onDown.on(controls[key], KeyboardControl.newPosition.bind(this, "left"), this);

                    break;

                case ("right"):

                    //Add up key and tell it to move the entities up when it hits
                    var rightKey = KeyboardControl.keyboard.getKey(controls[key]);

                    //Attach the new position function to the keydown event
                    rightKey.onDown.on(controls[key], KeyboardControl.newPosition.bind(this, "right"), this);

                    break;

                case ("up"):

                    //Add up key and tell it to move the entities up when it hits
                    var upKey = KeyboardControl.keyboard.getKey(controls[key]);

                    //Attach the new position function to the keydown event
                    upKey.onDown.on(controls[key], KeyboardControl.newPosition.bind(this, "up"), this);

                    break;

                case ("down"):

                    //Add up key and tell it to move the entities up when it hits
                    var downKey = KeyboardControl.keyboard.getKey(controls[key]);

                    //Attach the new position function to the keydown event
                    downKey.onDown.on(controls[key], KeyboardControl.newPosition.bind(this, "down"), this);

                    break;

                }

            }

        }

    }

    static newPosition(direction) {
        Client.socket.send(JSON.stringify({ Header: "move", Body: JSON.stringify(direction) }));
    }
}

export = KeyboardControl;