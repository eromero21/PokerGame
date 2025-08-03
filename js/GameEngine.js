import { Deck } from "./Deck.js";
import { Player } from "./Player.js";

export class GameEngine {

    constructor(playerNames) {
        this.players = playerNames.map((name) => new Player(name));
        this.deck = new Deck();
        this.boardCards = [];
        this.phase = "PreFlop"
        this.currentPlayerIndex = 0;
        this.pot = 0;
        this.currentBet = 0;
        this.playersActed = new Set();
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
            this.dealFlop();
        } else if (this.phase === "Flop") {
            this.phase = "PreRiver";
            this.dealNextCard();
        } else if (this.phase === "PreRiver") {
            this.phase = "River";
            this.dealNextCard();
        } else if (this.phase === "River") {
            this.phase = "Showdown";
            this.dealNextCard();
        } else {
            // TODO - Somebody wins and restart game
        }
    }

    nextPlayer() {
        // if (this.players.filter(p => p.inPlay).length <= 1) {
        //     console.log("1 or less players remain - end hand");
        //     this.phase = "Showdown";
        //     return;
        // }

        do {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        } while (!this.players[this.currentPlayerIndex].inPlay);
    }

    playGame() {
        if (this.phase === "PreFlop") {
            this.playerCardDeal();
            return {
                phase: this.phase,
                cards: this.players[0].hand
            }
        } else if (this.phase === "Flop") {
            return {
                phase: this.phase,
                cards: this.boardCards
            }
        } else if (this.phase === "PreRiver") {
            return {
                phase: this.phase,
                cards: this.boardCards
            }
        } else if (this.phase === "River") {
            return {
                phase: this.phase,
                cards: this.boardCards
            }
        } else {
            // TODO - End game handling
        }

    }

    hasEveryoneActed() {
        return this.playersActed.size >= this.players.filter(p => p.inPlay).length;
    }

    canAdvance() {
        const allMatched = this.players.filter(p => p.inPlay).every(p => p.currentBet === this.currentBet);
        return allMatched && this.hasEveryoneActed();
    }

    calcWinner() {
        // TODO HAND EVAL
    }
}