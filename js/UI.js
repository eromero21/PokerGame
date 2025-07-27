import { renderCards } from "./CardRender.js";
import * as GameController from "./GameController.js";

const startButton = document.getElementById("start-button");
const nameInput = document.getElementById("name-entry");

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

        renderCards(result.playerHand, document.getElementById("display-hand"), false);
        document.getElementById("betting-panel").classList.remove("hidden");
        document.getElementById("intro").classList.add("hidden");
        document.getElementById("dealer").classList.remove("hidden");
    });
}

function showWarning(message) {
    document.getElementById("warning-container").classList.remove("hidden");
    document.getElementById("warning").textContent = message;
}