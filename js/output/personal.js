import {dom} from "./dom.js";
setPeronalInfo();
function setPersonalObject() {
	const data = getPersonalData();
	setName(data);
	return ({
		Email: data.email,
		"Phone number": data.tel,
		Address: setAddress(data),
		"Date of birth": data.birthday,
		"Driving license": data.driving,
		Website: data.website,
		LinkedIn: data.linkedin,
		"Open to relocation": data.relocation,
	});
}
function setPeronalInfo() {
	const dl = document.createElement("dl");
	const fragment = document.createDocumentFragment();
	const personal = setPersonalObject();
	for (const [key, value] of Object.entries(personal)) {
		if (value === "") continue;
		const [dt, dd] = [document.createElement("dt"), document.createElement("dd")];
		dt.textContent = key;
		dd.textContent = value;
		fragment.appendChild(dt);
		fragment.appendChild(dd);
	}
	dl.appendChild(fragment);
	dom.personal.appendChild(dl);
}
function getPersonalData() {
	return JSON.parse(sessionStorage.getItem("personal"));
}
function setAddress(data) {
	const arr = [data.state, data.city, data.street, data.zip].filter(Boolean);
	if (!arr.length) return "";
	return arr.join(", ");
}
function setName(data) {
	dom.name.textContent = `${data.fname} ${data.lname}`;
}