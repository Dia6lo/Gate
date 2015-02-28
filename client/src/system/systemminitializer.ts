import Client = require("./connection/client");
import KeyboardControl = require("./controls/keyboardcontrol");

class SystemInitializer {
    static initialize() {
        Client.initialize();
        var playerControls = {
            "up": "W",
            "left": "A",
            "down": "S",
            "right": "D"
        };
        KeyboardControl.initialize(playerControls);
    }
}

export = SystemInitializer;