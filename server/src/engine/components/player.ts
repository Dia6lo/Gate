class Player implements IPlayer {

    constructor(public name?: string) {
    }

    getType() {
        return "Player";
    }
}

export = Player;