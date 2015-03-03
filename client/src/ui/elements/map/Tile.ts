import SpriteProvider = require("./SpriteProvider");
import ServiceProvider = require("../../../serviceprovider");

class Tile extends PIXI.Sprite {

    entities: {
        HaveDescription: boolean;
        Name: string;
        Type: string;
        Description: string;
    }[];

    constructor(type: string, entities?: any[]) {
        super(SpriteProvider.getTile(type).texture);
        this.entities = [];
        if (entities)
            for (var i = entities.length - 1; i >= 0; i--) {
                this.addChild(SpriteProvider.getEntity(entities[i].Sprite));
                this.entities.push(entities[i]);
            }
        this.interactive = true;
        this.mouseover = this.onOver.bind(this);
    }

    onOver(mouseData: PIXI.InteractionData) {
        if (this.entities.length == 0) {
            ServiceProvider.Tooltip.container.visible = false;
            return;
        }
        var entity = this.entities[this.entities.length - 1];
        if (entity.HaveDescription) {
            ServiceProvider.Tooltip.updateText(entity.Name, entity.Type, entity.Description);
            ServiceProvider.Tooltip.container.visible = true;
        } else
            ServiceProvider.Tooltip.container.visible = false;
    }
}

export = Tile;