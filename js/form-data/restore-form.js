window.addEventListener("DOMContentLoaded", restoreForm);
function restoreForm() {
	const keys = ["personal", "experience"];
	for (const keyName of keys) {
		const saved = sessionStorage.getItem(keyName);
		if (!saved) continue;
		const obj = JSON.parse(saved);
		for (const [key, value] of Object.entries(obj)) {
			const field = document.querySelector(`[name="${key}"]`);
			if (!field) continue;
			if (field.type === "checkbox") {
				field.checked = value === "Yes";
			} else {
				field.value = value;
			}
		}
	}
}