import {Deck} from "./js/Deck.js";
import {renderCards} from "./js/CardRender.js";

// Elements
const header = document.getElementById("main-header");
const pullCards = document.getElementById("pull-cards");
const riverContainer = document.getElementById("river");
const handContainer = document.getElementById("display-hand");
const dealDeck = document.getElementById("dealer");

// Variables
const myDeck = new Deck();
let myCards = [];
let river = [];

pullCards.addEventListener("click", event => {
    // Make header/button disappear and dealer deck appear
    header.classList.toggle("hidden");
    pullCards.classList.toggle("hidden");
    dealDeck.classList.toggle("hidden");

    myCards = myDeck.grabRandom(2);
    river = myDeck.grabRandom(3);

    renderCards(myCards, handContainer, false);
    renderCards(river, riverContainer, false);
    console.log(myDeck.availableCards.length);
})

