﻿import Keyboard = require("./keyboard");
import ServiceProvider = require("../../serviceprovider");

class KeyboardControl {
    static keyboard = new Keyboard();

    static initialize(controls) {
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
        this.keyboard.setupKey(keyCode, KeyboardControl.newPosition.bind(this, action), this);
    }

    static newPosition(direction) {
        ServiceProvider.Client.sendMessage("move", direction);
    }
}

export = KeyboardControl;