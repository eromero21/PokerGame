export class Deck {
    cardRank = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    cardSuit = ["Hearts", "Clubs", "Diamonds", "Spades"];
    availableCards = [];
    #fullDeck = [];

    constructor() {
        this.availableCards = [];

        for (const suit of this.getRanks()) {
            for (const rank of this.getSuit()) {
                this.availableCards.push(`${suit} of ${rank}`);
            }
        }
        this.#fullDeck = [...this.availableCards];
        this.shuffleDeck();
    }

    getRanks() {
        return this.cardRank;
    }

    getSuit() {
        return this.cardSuit;
    }

    getAvailableCards() {
        return this.availableCards;
    }

    resetDeck() {
        this.availableCards = [...this.#fullDeck];
        this.shuffleDeck();
    }

    grabRandom(amountOfCards) {
        let cards = [];

        // Grab random card and delete it from current cards
        for (let i = 0; i < amountOfCards; i++) {
            cards.push(this.availableCards
                .splice(Math.floor(Math.random() * this.availableCards.length), 1)[0]);
        }
        return cards;
    }

    shuffleDeck() {
        for (let i = this.availableCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.availableCards[i], this.availableCards[j]] = [this.availableCards[j], this.availableCards[i]];
        }
    }

}