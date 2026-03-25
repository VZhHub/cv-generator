const dom = {
	template: document.getElementById("skill-template"),
	skillsCardsWrapper: document.querySelector(".fieldset-cards-wrapper--skills"),
	addCard: document.querySelector(".add-card--skill"),
};
const skillCards = new Map();
const state = {
	cardHeight: 0,
	outputHeight: 0,
	cardIndex: 0,
	openedIndex: 0,
	cardPadding: 4,
};

dom.addCard.addEventListener("click", addCard);
dom.skillsCardsWrapper.addEventListener("click", deleteCard);
dom.skillsCardsWrapper.addEventListener("click", editCard);

addCard();

function addCard() {
	if (skillCards.size > 0) hideCard();
	const node = dom.template.content.cloneNode(true);
	const card = node.querySelector(".fieldset-card");
	const output = node.querySelector(".fieldset-card-output");
	const enterField = node.querySelector(".fieldset-card-enter-field");
	const input = node.querySelector("input");
	const inputLabel = node.querySelector(".input-group--skill label");
	const select = node.querySelector("select");
	const selectLabel = node.querySelector(".input-group--skill-level label");
	const editButton = node.querySelector(".edit-card");
	const deleteButtons = node.querySelectorAll(".delete-card");
	const skillName = node.querySelector(".fieldset-card--skill-name");
	const skillLevel = node.querySelector(".fieldset-card--skill-level");
	input.id = input.name = inputLabel.htmlFor = "skill_" + state.cardIndex;
	select.id = select.name = "skill-level_" + state.cardIndex;
	editButton.dataset.cardSkill = state.cardIndex;
	deleteButtons.forEach(button => button.dataset.cardSkill = state.cardIndex);
	state.openedIndex = state.cardIndex;
	dom.skillsCardsWrapper.appendChild(card);
	skillCards.set(state.cardIndex, {card, output, enterField, input, select, skillName, skillLevel});
	calcCard(state.cardIndex);
	state.cardIndex++;
}
function calcCard(cardIndex) {
	const output = skillCards.get(cardIndex).output, card = skillCards.get(cardIndex).card;
	state.outputHeight = output.clientHeight;
	output.style.height = "0px";
	state.cardHeight = card.clientHeight;
	card.style.height = state.cardHeight + "px";
}
function deleteCard(e) {
	const button = e.target.closest(".delete-card");
	if (button) {
		const cardId = Number(button.dataset.cardSkill);
		skillCards.get(cardId).card.remove();
		skillCards.delete(cardId);
	}
}
function editCard(e) {
	const button = e.target.closest(".edit-card");
	if (button) {
		const cardId = Number(button.dataset.cardSkill);
		hideCard();
		const editedCard = skillCards.get(cardId);
		editedCard.output.style.height = "0px";
		editedCard.output.classList.remove("appear");
		editedCard.enterField.classList.remove("fade");
		editedCard.card.style.height = state.cardHeight + "px";
		state.openedIndex = cardId;
	}
}
function hideCard() {
	const openedCard = skillCards.get(state.openedIndex);
	if (!openedCard) return;
	addDescription();
	openedCard.output.style.height = state.outputHeight + "px";
	openedCard.output.classList.add("appear");
	openedCard.enterField.classList.add("fade");
	openedCard.card.style.height = state.cardPadding + state.outputHeight + "px";
}
function addDescription() {
	const card = skillCards.get(state.openedIndex);
	if (card.input.value !== "") card.skillName.textContent = card.input.value;
	if (card.select.value !== "") card.skillLevel.textContent = card.select.value;
}