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
	const {outputTitle, outputSubtitle, skillInput, selectInput, companyInput, personInput, schoolInput, degreeInput, workInput, employerInput, interestInput} = card;
	const insertString = (string1, string2 = false) => {
		outputTitle.textContent = string1.value || defaultStrings[cardType][0];
		if (string2) outputSubtitle.textContent = string2.value || defaultStrings[cardType][1];
	};
	switch(cardType) {
		case "skill":
			insertString(skillInput, selectInput);
			break;
		case "reference":
			insertString(companyInput, personInput);
			break;
		case "work":
			insertString(workInput, employerInput);
			break;
		case "education":
			insertString(schoolInput, degreeInput);
			break;
		case "interest":
			insertString(interestInput);
			break;
	}
}