import {storedCards} from "../fieldset-cards/state.js";
import {createCard} from "../fieldset-cards/creation.js";
function restoreCards() {
	const cards = JSON.parse(sessionStorage.cards);
	for (const [category, array] of Object.entries(cards)) {
		for (let id = 0, len = array.length; id < len; id++) {
			const card = array[id];
			createCard(category, id);
			const newCard = storedCards[category].get(id);
			for (const [key, value] of Object.entries(card)) {
				newCard[key].value = value;
			}
		}
	}
}
export {restoreCards};