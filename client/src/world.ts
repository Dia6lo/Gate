class World extends PIXI.DisplayObjectContainer {

    game;
    scale: PIXI.Point;

    constructor(game) {
        super();
        this.game = game;
        this.initialize();
    }

    initialize() {
        //Scale the entire world
        this.scale = new PIXI.Point(this.game.settings.zoom, this.game.settings.zoom);
        
        //Add the container object to the stage
        this.game.stage.addChild(this);
    }
}

export = World;