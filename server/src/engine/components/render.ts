class Render implements Component {

    constructor(public type?: string) {
        if (!type)
            this.type = "Nothing";
    }

    getType() {
        return "Render";
    }
}

export = Render;