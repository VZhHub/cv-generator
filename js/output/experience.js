import {dom} from "./dom.js";
const config = {
	reference: {
		h4: "companyInput",
		sub: ".article__p--person",
		subInput: "personInput",
		other: ".article__p--tel",
		otherInput: "contactTelInput",
		email: "contactEmailInput",
	},
	education: {
		h4: "schoolInput",
		sub: ".article__p--degree",
		subInput: "degreeInput",
		other: ".article__p--description",
		otherInput: "descriptionInput",
		start: "studyStartInput",
		end: "studyEndInput",
	},
	work: {
		h4: "workInput",
		sub: ".article__p--company",
		subInput: "employerInput",
		other: ".article__p--description",
		otherInput: "descriptionInput",
		start: "workStartInput",
		end: "workEndInput",
	},
	skill: {
		h4: "skillInput",
	}
};
addCards();
addResume();
function addCards() {
	const data = JSON.parse(sessionStorage.getItem("cards"));
	for (const key of ["education", "work", "reference", "skill"]) {
		const cards = key !== "skill" ? addEduWorkRef(data, key) : addSkills(data, key);
		if (cards) {
			dom[key].appendChild(cards);
		} else {
			const p = document.createElement("p");
			p.textContent = "--";
			dom[key].appendChild(p);
		}
	}
}
function addEduWorkRef(data, key) {
	const fragment = document.createDocumentFragment();
	let formIsFilled = false;
	const mainField = config[key].h4;
	for (const obj of data[key]) {
		if (!obj[mainField]) continue;
		formIsFilled = true;
		const card = createCard(key, obj);
		fragment.appendChild(card);
	}
	const result = formIsFilled ? fragment : false;
	return result;
}
function addSkills(data, key) {
	const dl = document.createElement("dl");
	dl.setAttribute("class", "experience__dl");
	let formIsFilled = false;
	const mainField = config[key].h4;
	for (const obj of data[key]) {
		if (!obj[mainField]) continue;
		formIsFilled = true;
		const node = dom[`${key}Template`].content.cloneNode(true);
		node.querySelector("dt").textContent = obj.skillInput;
		node.querySelector("dd").textContent = obj.selectInput || "--";
		dl.appendChild(node);
	}
	const result = formIsFilled ? dl : false;
	return result;
}
function createCard(key, obj) {
	const cfg = config[key];
	const template = dom[`${key}Template`];
	const node = template.content.cloneNode(true);
	const h4 = node.querySelector("h4");
	const sub = node.querySelector(cfg.sub);
	const other = node.querySelector(cfg.other);
	if (key === "reference") {
		const email = node.querySelector(".article__p--email");
		email.textContent = obj[cfg.email] || "";
	} else {
		const start = node.querySelector(".start");
		const end = node.querySelector(".end");
		const s = obj[cfg.start];
		const e = obj[cfg.end];
		start.textContent = s ? new Date(s).toLocaleDateString("en", {month: "short", year: "numeric"}) : "?";
		end.textContent = e ? new Date(e).toLocaleDateString("en", {month: "short", year: "numeric"}) : "?";
	}
	h4.textContent = obj[cfg.h4];
	sub.textContent = obj[cfg.subInput] || "--";
	other.textContent = obj[cfg.otherInput] || "";
	return node;
}
function addResume() {
	const data = JSON.parse(sessionStorage.getItem("experience"))["resume-descr"];
	dom.resume.textContent = !data ? "--" : data;	
}