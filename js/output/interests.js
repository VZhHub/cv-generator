import {dom} from "./dom.js";
setListOfInterests();
function setListOfInterests() {
	const interests = JSON.parse(sessionStorage.getItem("cards")).interest;
	const list = dom.list;
	for (const i of interests) {
		const input = i.interestInput;
		if (input === "") continue;
		const li = document.createElement("li");
		li.textContent = input;
		list.appendChild(li);
	}
}