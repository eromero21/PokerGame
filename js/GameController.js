import { GameEngine } from "./GameEngine.js";
import * as UI from "./UI.js";

const foldButton = document.getElementById("fold-button");
const callButton = document.getElementById("call-button");
const checkButton = document.getElementById("check-button");
const raiseButton = document.getElementById("raise-button");
const betInput = document.getElementById("bet-input");

let gameEngine = null;
let playerNames = [];

/**
 *
 * @param {String} name
 * @returns {{success: boolean}|{success: boolean, message: string}}
 */
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

    const { phase, cards } = gameEngine.playGame();
    UI.displayCards(phase, cards);
    return {
        success: true
    };
}

function isNameAvailable(name) {
    return !playerNames.includes(name);
}

export function getCurrentPlayer() {
    return gameEngine.getPlayers()[gameEngine.currentPlayerIndex];
}

foldButton.addEventListener("click", () => {
   console.log(playerNames[gameEngine.currentPlayerIndex] + " has folded");
   UI.hideWarning();
   // gameEngine.getPlayers()[gameEngine.currentPlayerIndex].inPlay = false;

   progressToNextCheck();
   const { phase, cards } = gameEngine.playGame();
   UI.displayCards(phase, cards);
});

callButton.addEventListener("click", () => {
   console.log(playerNames[gameEngine.currentPlayerIndex] + " has called.");
    UI.hideWarning();

    const player = gameEngine.getPlayers()[gameEngine.currentPlayerIndex];
    if (player.currentBet === gameEngine.currentBet) {
        UI.showWarning("You cannot call as there is no bet on the table. Either check, fold, or raise.");
        return;
    }
    progressToNextCheck();
    const { phase, cards } = gameEngine.playGame();
    UI.displayCards(phase, cards);
});

checkButton.addEventListener("click", () => {
    console.log(playerNames[gameEngine.currentPlayerIndex] + " has checked.");
    UI.hideWarning();

    const player = gameEngine.getPlayers()[gameEngine.currentPlayerIndex];
    if (player.currentBet !== gameEngine.currentBet) {
        UI.showWarning("You cannot check as there's a bet on the table. Either call, raise, or fold.")
        return;
    }
    progressToNextCheck();
    const { phase, cards } = gameEngine.playGame();
    UI.displayCards(phase, cards);
});

raiseButton.addEventListener("click", () => {
    console.log(playerNames[gameEngine.currentPlayerIndex] + " has raised by " + betInput.value.trim() + " chips.");
    UI.hideWarning();

    const raiseAmount = parseInt(betInput.value.trim());
    const player = getCurrentPlayer();

    if (raiseAmount > player.chips) {
        UI.showWarning("You are trying to raise by more chips than you have.");
        return;
    }

    gameEngine.currentBet += raiseAmount;
    gameEngine.pot += raiseAmount;
    player.chips -= raiseAmount;
    player.currentBet += raiseAmount;

    progressToNextCheck();
    const { phase, cards } = gameEngine.playGame();
    UI.displayCards(phase, cards);
});

function progressToNextCheck() {
    gameEngine.playersActed.add(gameEngine.currentPlayerIndex);

    if (gameEngine.canAdvance()) {
        gameEngine.nextTurn();
        gameEngine.playersActed.clear();
    }

    gameEngine.nextPlayer();
}