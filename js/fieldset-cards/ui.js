import {storedCards, params, defaultStrings} from "./state.js";
export function hideCard(cardType) {
	const openedCard = storedCards[cardType].get(params.openingIndex[cardType]);
	if (!openedCard) return;
	addDescription(openedCard, cardType);
	const oH = params.outputHeight[cardType];
	openedCard.output.style.height = oH + "px";
	openedCard.output.classList.add("appear");
	openedCard.enterField.classList.add("fade");
	openedCard.card.style.height = params.cardPadding + oH + "px";
}
function addDescription(card, cardType) {
	const {outputTitle, outputSubtitle, skillInput, selectInput, companyInput, personInput, schoolInput, degreeInput, jobInput, employerInput} = card;
	const insertString = (string1, string2) => {
		outputTitle.textContent = string1.value || defaultStrings[cardType][0];
		outputSubtitle.textContent = string2.value || defaultStrings[cardType][1];
	};
	switch(cardType) {
		case "skill":
			insertString(skillInput, selectInput);
			break;
		case "reference":
			insertString(companyInput, personInput);
			break;
		case "job":
			insertString(jobInput, employerInput);
			break;
		case "education":
			insertString(schoolInput, degreeInput);
			break;
	}
}