import {storedCards, params} from "./state.js";
import {hideCard} from "./ui.js";
function deleteCard(e) {
	const button = e.target.closest(".delete-card");
	if (!button) return;
	const {cardType, cardIndex} = button.dataset;
	const cardId = Number(cardIndex);
	const cards = storedCards[cardType];
	cards.get(cardId).card.remove();
	cards.delete(cardId);
}
function editCard(e) {
	const button = e.target.closest(".edit-card");
	if (!button) return;
	const {cardType, cardIndex} = button.dataset;
	const cardId = Number(cardIndex);
	const card = storedCards[cardType].get(cardId);
	hideCard(cardType);
	card.output.style.height = "0px";
	card.output.classList.remove("appear");
	card.enterField.classList.remove("fade");
	card.card.style.height = params.cardHeight[cardType] + "px";
	params.openingIndex[cardType] = cardId;
}
function saveCard(e) {
	const button = e.target.closest(".save-card");
	if (button) hideCard(button.dataset.cardType);
}
export {deleteCard, editCard, saveCard};