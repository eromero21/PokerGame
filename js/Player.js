export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.inPlay = true;
        this.chips = 500;
    }

    setHand(hand) {
        this.hand = hand;
    }
}