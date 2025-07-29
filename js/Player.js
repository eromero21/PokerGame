export class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.inPlay = true;
        this.chips = 500;
        this.currentBet = 0;
    }

    setHand(hand) {
        this.hand = hand;
    }
}