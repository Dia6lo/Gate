class Transform implements ITransform{
    static name: string = "position";
    position: Vector2

    constructor(position: Vector2) {
    }

    getName() {
        return Transform.name;
    }
}

export = Transform;