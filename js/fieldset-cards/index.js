import {dom} from "./dom.js";
import {params} from "./state.js";
import {createCard} from "./creation.js";
import {deleteCard, editCard, saveCard} from "./actions.js";
dom.form.addEventListener("click", e => {
	const target = e.target;
	if (target.closest(".add-card")) return addCard(e);
	if (target.closest(".delete-card")) return deleteCard(e);
	if (target.closest(".edit-card")) return editCard(e);
	if (target.closest(".save-card")) return saveCard(e);
});
for (const i of ["skill", "job", "education", "reference"]) createCard(i, 0);
function addCard(e) {
	const button = e.target.closest(".add-card");
	if (!button) return;
	const cardType = button.dataset.cardType;
	const cardId = params.cardIndex[cardType];
	createCard(cardType, cardId);
}