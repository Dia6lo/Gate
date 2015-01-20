class Player implements Component {

    constructor(public name?: string) {
    }

    getType() {
        return "Player";
    }
}

export = Player;