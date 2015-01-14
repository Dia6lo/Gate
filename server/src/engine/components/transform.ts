class Transform implements ITransform{
    position: Vector2

    constructor(position: Vector2) {
    }

    getName() {
        return "Position";
    }
}

export = Transform;