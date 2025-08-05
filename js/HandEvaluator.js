import {handRanks} from "./utils/handRanks.js";

const CARD_VALUE_MAP = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10,
    'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
}

/**
 *
 * @param {Array} cards - Array of card objects
 * @returns {Array} - All 5 card combinations given the cards
 */
function getAllPossibleCombos(cards) {
    const possibleCombos = [];

    function combinations(start, combo) {
        if (combo.length === 5) {
            possibleCombos.push([...combo]);
            return;
        }

        for (let i = start; i < cards.length; i++) {
            possibleCombos.push(cards[i]);
            combinations(i + 1, combo);
            combo.pop();
        }
    }

    combinations(0, []);
    return possibleCombos;
}

export function getHandRank(combo) {
    const sorted = combo.slice().sort((a, b) => b - a);
    const values = sorted.map(card => getCardValue(card));
    const suits = sorted.map(card => card[card.length - 1]);

    const isFlushHand = isFlush(suits);
    const isStraightHand = isStraight(values);

    if (isFlushHand && isStraightHand && values[0] === 14 && values[1] === 13) {
        return {
            name: "Royal Flush",
            value: handRanks.ROYAL_FLUSH
        };
    }

    if (isFlushHand && isStraightHand) {
        return {
          name: "Straight Flush",
          value: handRanks.STRAIGHT_FLUSH
        };
    }

    const { counts } = getDuplicates(values);

    if (counts.count.includes(4)) {
        return {
          name: "Four of a Kind",
          value: handRanks.FOUR_OF_A_KIND
        };
    }

    if (counts.count.includes(3)) {
        return {
          name: "Three of a Kind",
          value: handRanks.THREE_OF_A_KIND
        };
    }

    if (counts.count.filter(count => count === 2).length === 2) {
        return {
            name: "Two Pair",
            value: handRanks.TWO_PAIR
        };
    }

    if (counts.count.includes(2)) {
        return {
            name: "One Pair",
            value: handRanks.ONE_PAIR
        };
    }

    return  {
        name: "High Card",
        value: handRanks.HIGH_CARD
    }
}

function getCardValue(card) {
    return typeof card === 'object' ? CARD_VALUE_MAP[card.value] : CARD_VALUE_MAP[card[0].toLowerCase()];
}

function isFlush(suits) {
    const firstSuit = suits[0];
    return suits.every(suit => suit === firstSuit);
}

function isStraight(values) {
    const uniqueItems = [...new Set(values)].sort((a, b) => b - a);

    if (uniqueItems.length < 5) {
        return false;
    }

    // Special case using Ace as number 1
    if (uniqueItems.includes(14) &&
        uniqueItems.includes(5) &&
        uniqueItems.includes(4) &&
        uniqueItems.includes(3) &&
        uniqueItems.includes(2)) {
        return true;
    }

    // Checks if vals are in sequence
    return uniqueItems.every((val, i, arr) =>
        i === 0 || val === arr[i - 1] - 1
    );
}

function getDuplicates(values) {
    const countMap = {};

    values.forEach(val => counts[val] = (counts[val] || 0) + 1);
    const counts = Object.entries(counts)
        .map(([val, count]) => ({val: val, count: count}))
        .sort((a, b) => {
            if (b.count !== a.count) {
                return b.count - a.count;
            }
            return b.val - a.val;
        });
    return counts;
}