import { renderCards } from "./CardRender.js";
import * as GameController from "./GameController.js";

const startButton = document.getElementById("start-button");
const nameInput = document.getElementById("name-entry");
const flop = document.getElementById("flop");
const displayHand = document.getElementById("display-hand");

let playerNames = [];
let gameEngine = null;

export function init() {
    console.log("Initializing UI");
    startButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const result = GameController.requestStart(name)

        if (!result.success) {
            showWarning(result.message);
            return;
        }

        document.getElementById("betting-panel").classList.remove("hidden");
        document.getElementById("dealer").classList.remove("hidden");
        document.getElementById("intro").classList.add("hidden");
        document.getElementById("warning-container").classList.add("hidden");
    });
}

export function displayCards(phase, cards) {
    console.log(cards);
    if (phase === "PreFlop") {
        renderCards(cards, displayHand, false);
    } else if (phase === "Flop") {
        renderCards(cards, flop, false);
    } else if (phase === "PreRiver") {
        renderCards(cards, flop, false);
    } else if (phase === "River") {
        renderCards(cards, flop, false);
    }
}

export function showWarning(message) {
    document.getElementById("warning-container").classList.remove("hidden");
    document.getElementById("warning").textContent = message;
}

export function hideWarning() {
    document.getElementById("warning-container").classList.add("hidden");
}