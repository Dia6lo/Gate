class Vector2 {

    constructor(public x: number, public y: number) {
    }

    combine(other: Vector2): Vector2{
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    
    add(other: Vector2) {
        var dx = other.x - this.x;
        var dy = other.y - this.y;
        return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
    }
    
    distance(pos) {
        var dx = pos.x - this.x;
        var dy = pos.y - this.y;
        return Math.abs(Math.sqrt((dx * dx) + (dy * dy)));
    }

    manhattan(pos) {
        return (Math.abs(this.x - pos.x) + Math.abs(this.y - pos.y));
    }

    clone() {
        return (new Vector2(this.x, this.y));
    }

    toString() {
        return ("(" + this.x + ", " + this.y + ")");
    }
}

export = Vector2;
