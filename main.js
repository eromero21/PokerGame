import { Deck } from "./js/Deck.js";
import { renderCards } from "./js/CardRender.js";

// Elements
const intro = document.getElementById("intro");
const nameInput = document.getElementById("name-entry");
const startButton = document.getElementById("start-button");
const flopContainer = document.getElementById("flop");
const handContainer = document.getElementById("display-hand");
const dealDeck = document.getElementById("dealer");
const warning = document.getElementById("warning");

// Variables
const myDeck = new Deck();
let myCards = [];
let flop = [];
let players = [];

startButton.addEventListener("click", event => {
    // Check for valid name
    if (nameInput.value === "") {
        warning.classList.remove("hidden");
        warning.textContent = "Please enter a name.";
        console.log(warning.textContent);
        return;
    } else if (players.includes(nameInput.value)) {
        warning.classList.remove("hidden");
        warning.textContent = "That name is already in use. Please enter a different name.";
        console.log(warning.textContent);
        return;
    }

    // Make header/button disappear and dealer deck appear
    intro.classList.toggle("hidden");
    dealDeck.classList.toggle("hidden");

    myCards = myDeck.grabRandom(2);
    flop = myDeck.grabRandom(3);

    renderCards(myCards, handContainer, false);
    renderCards(flop, flopContainer, false);
    console.log(myDeck.availableCards.length);
})

