import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

class GameEngine {
    constructor(playerNames) {
        this.players = playerNames.map(name => new Player(name));
        this.deck = new Deck();
        this.boardCards = [];
        this.phase = "PreFlop"
    }

    playerCardDeal() {
        this.players.forEach((player) => {
            player.setHand(this.deck.grabRandom(2));
        });
    }

    dealFlop() {
        this.boardCards.push(this.deck.grabRandom(3));
    }

    dealNextCard() {
        this.boardCards.push(this.deck.grabRandom(1));
    }

    nextTurn() {
        if (this.phase === "PreFlop") {
            this.phase = "Flop";
        } else if (this.phase === "Flop") {
            this.phase = "PreRiver";
        } else if (this.phase === "PreRiver") {
            this.phase = "River";
        } else {
            this.phase = "Showdown";
        }
    }

    calcWinner() {
        // TODO HAND EVAL
    }
}