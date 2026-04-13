const dom = {
	form: document.querySelector("form"),
};
dom.form.addEventListener("submit", goNext);
function getFormData(formName) {
	const formData = new FormData(dom.form);
	if (formName === "personal" && !formData.has("relocation")) formData.set("relocation", "");
	return formData;
}
function setSessionStorage(formName) {
	const obj = getFormData(formName);
	const toObject = Object.fromEntries(obj);
	const toJSON = JSON.stringify(toObject);
	sessionStorage.setItem(formName, toJSON);
}
async function goNext(e) {
	e.preventDefault();
	const {form, nextPage} = e.currentTarget.dataset;
	if (form === "experience") {
		await import("./get-cards-data.js").then(result => result.serializeCards());
	}
	setSessionStorage(form);
	window.location.href = nextPage;
}