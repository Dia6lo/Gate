import SpriteProvider = require("./SpriteProvider");
import ServiceProvider = require("../../serviceprovider");

class Tile extends PIXI.Sprite {

    constructor(type: string, entities?: any[]) {
        super(SpriteProvider.getTile(type).texture);
        if (entities)
            for (var i = entities.length - 1; i >= 0; i--)
                this.addChild(SpriteProvider.getEntity(entities[i].Type));
        this.interactive = true;
        this.mouseover = this.onOver.bind(this);
        this.mouseout = this.onOut.bind(this);
    }

    onOver(mouseData: PIXI.InteractionData) {
        ServiceProvider.Tooltip.container.visible = false;
        ServiceProvider.Tooltip.updateText("Shitty hero", "Hero", "Really shitty hero");
        ServiceProvider.Tooltip.inTile = true;
        ServiceProvider.Tooltip.container.visible = true;
    }

    onOut(mouseData: PIXI.InteractionData) {
        if (ServiceProvider.Tooltip.inTile)
            ServiceProvider.Tooltip.inTile = false;
        else
            ServiceProvider.Tooltip.container.visible = false;
    }
}

export = Tile;