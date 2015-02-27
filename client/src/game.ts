import SystemInitializer = require("./system/systemminitializer");
import UiInitializer = require("./ui/uiinitializer");
class Game {

    static initialize() {
        UiInitializer.initialize();
        SystemInitializer.initialize();
    }
}

export = Game;