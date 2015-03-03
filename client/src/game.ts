import SystemInitializer = require("./system/systeminitializer");
import UiInitializer = require("./ui/uiinitializer");

class Game {

    static initialize() {
        SystemInitializer.initialize();
        UiInitializer.initialize();
    }
}

export = Game;