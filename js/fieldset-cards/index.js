import {dom} from "./dom.js";
import {params} from "./state.js";
import {makeBlankCards} from "./creation.js";
import {restoreCards} from "../form-data/restore-cards.js";
import {addCard, deleteCard, editCard, saveCard} from "./actions.js";
dom.form.addEventListener("click", e => {
	const target = e.target;
	if (target.closest(".add-card")) return addCard(e);
	if (target.closest(".delete-card")) return deleteCard(e);
	if (target.closest(".edit-card")) return editCard(e);
	if (target.closest(".save-card")) return saveCard(e);
});
initCards();
function initCards() {
	if (!sessionStorage.getItem("cards")) {
		makeBlankCards();
	} else {
		restoreCards();
	}
}