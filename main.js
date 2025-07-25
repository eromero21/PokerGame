import {Deck} from "./js/Deck.js";
import {renderCards} from "./js/CardRender.js";

// Elements
const pullCards = document.getElementById("pull-cards");
const riverContainer = document.getElementById("river");
const handContainer = document.getElementById("display-hand");

// Variables
const myDeck = new Deck();
let myCards = [];
let river = [];

pullCards.addEventListener("click", event => {
    myCards = myDeck.grabRandom(2);
    river = myDeck.grabRandom(3);

    renderCards(myCards, handContainer);
    renderCards(river, riverContainer);
})

