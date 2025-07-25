export function renderCards(cards, element) {
    if (!element) {
        console.error(`No element found for ${cards.length} cards`);
        return;
    }
    element.innerHTML = '';

    cards.forEach(card => {
        const img = document.createElement("img");
        img.src = cardToImageFilename(card);
        img.alt = card.toString();
        img.className = "card-img";
        element.appendChild(img);
    });
}

function cardToImageFilename(cardName) {
    return `assets/cards/${cardName.toString().toLowerCase().replace(/ /g, '_')}.png`;
}
