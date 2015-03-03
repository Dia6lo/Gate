class SpriteProvider {
    private static entityToSprite: { [type: string]: PIXI.Sprite } = null;
    private static tileToSprite: { [type: string]: PIXI.Sprite } = null;
    private static assetsFolder = "assets/";

    private static initEntityToSprite() {
        this.entityToSprite = {};
        this.entityToSprite["Dungeon wall"] = PIXI.Sprite.fromImage(this.assetsFolder + "wall.png");
        this.entityToSprite["Player"] = PIXI.Sprite.fromImage(this.assetsFolder + "warrior.png");
        this.entityToSprite["Skeleton"] = PIXI.Sprite.fromImage(this.assetsFolder + "skeleton.png");
    }

    private static initTileToSprite() {
        this.tileToSprite = {};
        this.tileToSprite["Void"] = PIXI.Sprite.fromImage(this.assetsFolder + "void.png");
        this.tileToSprite["Dungeon"] = PIXI.Sprite.fromImage(this.assetsFolder + "dungeon.png");
    }

    static getEntity(type: string) {
        if (this.entityToSprite == null)
            this.initEntityToSprite();
        var sprite = this.entityToSprite[type];
        if (sprite == undefined)
            return PIXI.Sprite.fromImage(this.assetsFolder + "undef.png");
        return new PIXI.Sprite(sprite.texture);
    }

    static getTile(type: string) {
        if (this.tileToSprite == null)
            this.initTileToSprite();
        var sprite = this.tileToSprite[type];
        if (sprite == undefined)
            return PIXI.Sprite.fromImage(this.assetsFolder + "undef.png");
        return new PIXI.Sprite(sprite.texture);
    }
}

export = SpriteProvider;