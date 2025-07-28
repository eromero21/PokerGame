import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

export class GameEngine {

    constructor(playerNames) {
        this.players = playerNames.map((name) => new Player(name));
        this.deck = new Deck();
        this.boardCards = [];
        this.phase = "PreFlop"
    }

    playerCardDeal() {
        this.players.forEach((player) => {
            player.setHand(this.deck.grabRandom(2));
        });
    }

    getPlayers() {
        return this.players;
    }

    dealFlop() {
        const newCards = this.deck.grabRandom(3);
        newCards.forEach((card) => {
            this.boardCards.push(card);
        });
    }

    dealNextCard() {
        this.boardCards.push(this.deck.grabRandom(1)[0]);
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

    playGame() {
        if (this.phase === "PreFlop") {
            this.playerCardDeal();
            return {
                phase: this.phase,
                playerHand: this.players[0].hand
            }
        } else if (this.phase === "Flop") {
            this.dealFlop();
            return {
                phase: this.phase,
                flop: this.boardCards
            }

        } else if (this.phase === "PreRiver") {

        } else if (this.phase === "River") {
            console.log("Someone wins.");
        } else {

        }

    }

    calcWinner() {
        // TODO HAND EVAL
    }
}