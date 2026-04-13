import {dom} from "./dom.js";
import {storedCards, params, addAttributes} from "./state.js";
import {hideCard} from "./ui.js";
function createCard(cardType, cardId) {
	if (storedCards[cardType].size > 0) hideCard(cardType);
	const nodes = createNodes(cardType);
	addAttributes[cardType](nodes, cardId);
	configButtons(nodes, cardType, cardId);
	renderCard(nodes, cardType);
	registrateCard(nodes, cardType, cardId);
	setCardSizes(cardType, cardId);
	params.openingIndex[cardType] = cardId;
	params.cardIndex[cardType]++;
}
function createNodes(cardType) {
	const node = dom[`${cardType}Template`].content.cloneNode(true);
	const elements = node.querySelectorAll("[data-role]");
	const obj = {};
	elements.forEach(el => obj[el.dataset.role] = el);
	obj.deleteButtons = node.querySelectorAll(".delete-card");
	return {card: node,	...obj};
}
function configButtons(nodes, cardType, cardId) {
	nodes.editButton.dataset.cardType = cardType;
	nodes.editButton.dataset.cardIndex = cardId;
	nodes.deleteButtons.forEach(button => {
		button.dataset.cardType = cardType;
		button.dataset.cardIndex = cardId;
	});
	nodes.saveButton.dataset.cardType = cardType;
}
function renderCard(nodes, cardType) {
	dom[`${cardType}Wrapper`].appendChild(nodes.card);
}
function registrateCard(nodes, cardType, cardId) {
	storedCards[cardType].set(cardId, {...nodes});
}
function setCardSizes(cardType, cardId) {
	const {card, output} = storedCards[cardType].get(cardId);
	params.outputHeight[cardType] = output.clientHeight;
	output.style.height = "0px";
	const cardHeight = card.clientHeight;
	params.cardHeight[cardType] = cardHeight;
	card.style.height = cardHeight + "px";
}
function makeBlankCards() {
	for (const i of ["skill", "work", "education", "reference", "interest"]) createCard(i, 0);
}
export {createCard, makeBlankCards};