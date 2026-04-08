import {dom} from "./dom.js";
import {state} from "./state.js";
import {resetImgPos} from "./transform.js";
function savePhoto() {
	dom.overlay.classList.add("hidden");
	addPhotoOnButton();
	resetImgPos();
}
function addPhotoOnButton() {
	const mod = state.labelLength / state.editorLength;
	const obj = serializeImg(mod);
	createAvatar(obj);
}
function deletePhoto() {
	dom.defaultImg.classList.remove("hidden");
	dom.photoBtnText.classList.remove("hidden");
	dom.uploadedImg.src = "";
	dom.uploadedImg.classList.add("hidden");
	state.top = 0;
	state.left = 0;
	state.rotate = 0;
	state.scale = 1;
	state.editorLength = state.labelLength = state.src = null;
	dom.input.value = null;
	dom.deletePhoto.classList.add("hidden");
	sessionStorage.removeItem("uploadedImg");
}
function serializeImg(mod) {
	const obj = {};
	obj.src = state.src;
	obj.height = state.height * mod;
	obj.width = state.width * mod;
	obj.top = state.top * mod + "px";
	obj.left = state.left * mod + "px";
	obj.rotate = state.rotate;
	obj.scale = state.scale;
	sessionStorage.setItem("uploadedImg", JSON.stringify(obj));
	return obj;
}
function createAvatar(obj) {
	const {src, height, width, top, left, rotate, scale} = obj;
	dom.defaultImg.classList.add("hidden");
	dom.photoBtnText.classList.add("hidden");
	dom.uploadedImg.src = src;
	dom.uploadedImg.height = height;
	dom.uploadedImg.width = width;
	dom.uploadedImg.style.top = top;
	dom.uploadedImg.style.left = left;
	dom.uploadedImg.style.transform = `rotate(${rotate}deg) scale(${scale})`;
	dom.uploadedImg.onload = () => {
		dom.uploadedImg.classList.remove("hidden");
		dom.deletePhoto.classList.remove("hidden");
	}
}
export {savePhoto, deletePhoto, createAvatar};