class Construct implements IConstruct {

    constructor(public type?: string) {
        if (!type)
            this.type = undefined
    }

    getType() {
        return "Construct";
    }
}

export = Construct;