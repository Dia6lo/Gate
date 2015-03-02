class ToolTip{
    private static background = new PIXI.Graphics();
    private static title = new PIXI.Text(
            "",
            {
                font: "bold 12px Courier New",
                fill: "#ffffff",
                wordWrap: true,
                wordWrapWidth: 150
            }
            );
    private static type = new PIXI.Text(
            "",
            {
                font: "12px Courier New",
                fill: "#ffffff",
                wordWrap: true,
                wordWrapWidth: 150
            }
            );
    private static description = new PIXI.Text(
            "",
            {
                font: "12px Courier New",
                fill: "#b4b4b4",
                wordWrap: true,
                wordWrapWidth: 150
            }
        );
    private static instance: PIXI.DisplayObjectContainer = null;

    static get container() {
        if (this.instance == null) {
            this.instance = new PIXI.DisplayObjectContainer();
            this.instance.addChild(this.background);
            this.instance.children[0] = this.background;

            this.title.position.x = 15;
            this.instance.addChild(this.title);
            this.instance.children[1] = this.title;

            this.type.position.x = 15;
            this.instance.addChild(this.type);
            this.instance.children[2] = this.type;

            this.description.position.x = 15;
            this.instance.addChild(this.description);
            this.instance.children[3] = this.description;
            this.instance.visible = false;
        }
        return this.instance;
    }

    static clear() {
        this.title.setText("");
        this.type.setText("");
        this.description.setText("");
        this.background.clear();
    }

    static updateText(title: string, type: string, description: string) {
        this.title.setText(title);
        this.type.setText(type);
        this.description.setText(description);

        var yPos = 15;
        this.title.position.y = yPos;

        if (title !== "") {
            yPos += this.title.height;
        }

        this.type.position.y = yPos;

        if (type !== "") {
            yPos += this.type.height;
        }

        this.description.position.y = yPos;

        if (description !== "") {
            yPos += this.description.height;
        }

        yPos += 15;
        var width = 146 + 30; //this.instance.width + 30; - This shit is buggy. I DON'T KNOW WHY
        this.background.clear();
        this.background.beginFill(0x000000, 0.5);
        this.background.drawRect(0, 0, width, yPos);
    }
}

export = ToolTip;
 