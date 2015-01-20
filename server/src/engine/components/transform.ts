class Transform implements Component{

    constructor(public position: Vector2, public volume?: number) {
        if (!volume)
            this.volume = 0;
    }

    getType() {
        return "Transform";
    }
}

export = Transform;