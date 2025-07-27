import { GameEngine } from "./GameEngine.js";

let currentPlayerIndex = 0;
let gameEngine = null;
let playerNames = [];

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

// TODO game progression