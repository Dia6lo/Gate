class TextLog {
    private static color = "rgba(255, 255, 255, 1)";
    private static fontSize = 12;
    private static margin = 5;
    private static font = "Courier New";
    private static maxMessages = 5;
    private static messages: string[] = [];
    private static instance: PIXI.DisplayObjectContainer = null;

    static get container(): PIXI.DisplayObjectContainer {
        if (this.instance == null) {
            this.instance = new PIXI.DisplayObjectContainer();
            for (var i = 0; i < this.maxMessages; i++) {
                var textObject = new PIXI.Text("", { font: this.fontSize + "px " + this.font, fill: this.color, align: "left" });
                textObject.position.x = 15;
                textObject.position.y = 15 + ((textObject.height + this.margin) * i);
                TextLog.instance.addChild(textObject);
            }
        }
        return this.instance;
    }

    static updateText() {
        var messages = this.messages;
        var instance = this.container;
        for (var i = 0; i < this.maxMessages; i++) {
            if (!messages[messages.length - 1 - i]) {
                break;
            }
            (<PIXI.Text>instance.getChildAt(i)).setText(messages[messages.length - 1 - i]);
        }
    }

    static addMessage(message) {
        this.messages.push(message);
        this.updateText();
    }

    static clear() {
        this.messages = [];
        var instance = this.container;
        for (var i = 0; i < this.maxMessages; i++) {
            (<PIXI.Text>instance.getChildAt(i)).setText("");
        }
    }
}

export = TextLog;