import Keyboard = require("./keyboard");
import Client = require("../connection/client");

class KeyboardControl {
    static keyboard: Keyboard;

    constructor(controls) {
        KeyboardControl.keyboard = new Keyboard();
        for (var key in controls) {
            if (controls.hasOwnProperty(key)) {
                switch (key) {
                    case ("left"):
                    case ("right"):
                    case ("up"):
                    case ("down"):
                    KeyboardControl.bindKey(key, controls[key]);
                }
            }
        }
    }

    static bindKey(action: string, keyChar: string){
        var keyCode = keyChar.charCodeAt(0);
        KeyboardControl.keyboard.setupKey(keyCode, KeyboardControl.newPosition.bind(this, action), this);
    }

    static newPosition(direction) {
        Client.socket.send(JSON.stringify({ Header: "move", Body: JSON.stringify({ direction: direction }) }));
    }
}

export = KeyboardControl;