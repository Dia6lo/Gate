class TextLog extends PIXI.DisplayObjectContainer{
    color = "rgba(255, 255, 255, 1)";
    fontSize = 12;
    margin = 5;
    font = "Courier New";
    maxMessages = 5;
    messages = [];

    constructor() {
        super();
        for (var i = 0; i < this.maxMessages; i++) {
            var textObject = new PIXI.Text("", { font: this.fontSize + "px " + this.font, fill: this.color, align: "left" });
            textObject.position.x = 15;
            textObject.position.y = 15 + ((textObject.height + this.margin) * i);
            this.addChild(textObject);
        }
    }

    updateText () {
        var messages = this.messages;
        for (var i = 0; i < this.maxMessages; i++) {
            if (!messages[messages.length - 1 - i]) {
                break;
            }
            (<PIXI.Text>this.getChildAt(i)).setText(messages[messages.length - 1 - i]);
        }
    }

    addMessage(message) {
        this.messages.push(message);
        this.updateText();
    }

    clear() {
        this.messages = [];
        for (var i = 0; i < this.maxMessages; i++) {
            (<PIXI.Text>this.getChildAt(i)).setText("");
        }
    }
}

export = TextLog;