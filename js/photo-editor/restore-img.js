import {dom} from "./dom.js";
import {createAvatar} from "./actions.js";
restoreImg();
function restoreImg() {
	const storedImg = sessionStorage.getItem("uploadedImg");
	if (!storedImg) return;
	const obj = JSON.parse(storedImg);
	createAvatar(obj);
}