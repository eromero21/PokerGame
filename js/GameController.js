import { GameEngine } from "./GameEngine.js";
import * as UI from "./UI.js";

const foldButton = document.getElementById("fold-button");
const callButton = document.getElementById("call-button");
const checkButton = document.getElementById("check-button");
const raiseButton = document.getElementById("raise-button");
const betInput = document.getElementById("bet-input");

let currentPlayerIndex = 0;
let gameEngine = null;
let playerNames = [];
let boardBet = 0;

export function requestStart(name) {
    if (!name) {
        return {
            success: false,
            message: "Please enter a name."
        };
    } else if (!isNameAvailable(name)) {
        return {
            success: false,
            message: "That name already in use."
        };
    }

    playerNames.push(name);
    gameEngine = new GameEngine(playerNames);

    const { phase, playerHand } = gameEngine.playGame();
    return {
        success: true,
        phase: phase,
        playerHand: playerHand,
    };
}

function isNameAvailable(name) {
    return !playerNames.includes(name);
}

export function getCurrentPlayer() {
    return gameEngine.getPlayers()[currentPlayerIndex];
}

foldButton.addEventListener("click", () => {
   console.log(playerNames[currentPlayerIndex] + " has folded");
   gameEngine.nextTurn();
   const { phase, flop } = gameEngine.playGame();
   console.log(phase);
   UI.displayFlop(phase, flop);
   // TODO - This function so far is to test logic. Still needs proper implementation
});

callButton.addEventListener("click", () => {
   console.log(playerNames[currentPlayerIndex] + " has called.");
   // TODO - Match the current table bet amount. Remove chips from user.
});

checkButton.addEventListener("click", () => {
   console.log(playerNames[currentPlayerIndex] + " has checked");
   // TODO - Check if there's a table bet. If allowed, pass turn with no additional bet.
});

raiseButton.addEventListener("click", () => {
    console.log(playerNames[currentPlayerIndex] + " has raised by " + betInput.value.trim() + " chips.");
    // TODO - Check if the amount is lower than current table bet. Remove chips from user and adjust table bet amount.
});

// TODO game progression