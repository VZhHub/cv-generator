import {storedCards} from "../fieldset-cards/state.js";
export function serializeCards() {
	const obj = {};
	for (const [category, map] of Object.entries(storedCards)) {
		obj[category] = [];
		for (const object of map.values()) {
			const fieldsData = {};
			for (const [key, input] of Object.entries(object)) {
				if (!key.includes("Input")) continue;
				fieldsData[key] = input.value;
			}
			obj[category].push(fieldsData);
		}
	}
	const toJSON = JSON.stringify(obj);
	sessionStorage.setItem("cards", toJSON);
}