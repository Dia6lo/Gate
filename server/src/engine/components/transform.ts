class Transform implements ITransform{

    constructor(public position: Vector2, public volume?: number) {
        if (!volume)
            this.volume = 0;
    }

    getType() {
        return "Position";
    }
}

export = Transform;