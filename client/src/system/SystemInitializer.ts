import KeyboardControl = require("./controls/keyboardcontrol");
import ServiceProvider = require("../serviceprovider");

class SystemInitializer {

    private static serverUrl = "ws://127.0.0.1:8080";
    private static playerControls = {
            "up": "W",
            "left": "A",
            "down": "S",
            "right": "D"
    };

    static initialize() {
        ServiceProvider.Client.initialize(this.serverUrl);
        KeyboardControl.initialize(this.playerControls);
    }
}

export = SystemInitializer;