import {dom} from "./dom.js";
import {state, coords} from "./state.js";
import {pointerDown, pointerUp, rotate, imgOrientationAndSize, resetImgPos, zoomImg} from "./transform.js";
dom.input.addEventListener("change", handleImage);
dom.closeBtn.addEventListener("click", () => {
	dom.overlay.classList.add("hidden");
	resetImgPos();
});
dom.img.addEventListener("pointerdown", pointerDown);
window.addEventListener("pointerup", pointerUp);
dom.rotate.addEventListener("click", rotate);
dom.zoom.addEventListener("input", zoomImg);
dom.save.addEventListener("click", savePhoto);
dom.deletePhoto.addEventListener("click", deletePhoto);
function handleImage(e) {
	const file = e.target.files[0];
	console.log(file);
	if (!file) return;
	const url = URL.createObjectURL(file);
	const img = new Image();
	img.src = url;
	img.onload = () => {
		let {height, width} = img;
		const scale = 200 / Math.min(height, width);
		if (height > width) {
			height = height * scale;
			width = 200;
		} else {
			width = width * scale;
			height = 200;
		}
		createBitmapIMG(file, width, height);
		URL.revokeObjectURL(url);
	}
	async function createBitmapIMG(file, width, height) {
		const bitmap = await createImageBitmap(file, {
			resizeWidth: width,
			resizeHeight: height,
			resizeQuality: "high",
		});
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = bitmap.width;
		canvas.height = bitmap.height;
		ctx.drawImage(bitmap, 0, 0);
		bitmap.close();
		const dataURL = canvas.toDataURL("image/jpeg", 0.8);
		console.log("DataURL length:", dataURL.length);
		console.log("DataURL size in sessionStorage (browser):", dataURL.length * 2);
		const restString = dataURL.split(",")[1];
		const padding = restString.endsWith("==") ? 2 : restString.endsWith("=") ? 1 : 0;
		const size = restString.length * 3 / 4 - padding;
		console.log("Image size after loading:", size);
		state.uploadedImgSrc = dataURL;
		dom.img.src = dataURL;
		dom.img.onload = () => {
			dom.overlay.classList.remove("hidden");
			state.editorLength = dom.div.clientHeight;
			state.labelLength = dom.label.clientHeight;
			imgOrientationAndSize();
		}
	}
}
function savePhoto() {
	coords.top = dom.img.style.top.split("px")[0] * 1;
	coords.left = dom.img.style.left.split("px")[0] * 1;
	coords.rotate = state.currentRotation;
	coords.scale = state.currentScale;
	dom.overlay.classList.add("hidden");
	addPhotoOnButton();
	sessionStorage.setItem("state", JSON.stringify(state));
	sessionStorage.setItem("coords", JSON.stringify(coords));
	resetImgPos();
}
function addPhotoOnButton() {
	const mod = state.labelLength / state.editorLength;
	dom.defaultImg.classList.add("hidden");
	dom.photoBtnText.classList.add("hidden");
	dom.uploadedImg.src = state.uploadedImgSrc;
	dom.uploadedImg.height = state.imgH * mod;
	dom.uploadedImg.width = state.imgW * mod;
	dom.uploadedImg.style.top = coords.top * mod + "px";
	dom.uploadedImg.style.left = coords.left * mod + "px";
	dom.uploadedImg.style.transform = `rotate(${coords.rotate}deg) scale(${coords.scale})`;
	dom.uploadedImg.onload = () => {
		dom.uploadedImg.classList.remove("hidden");
		dom.deletePhoto.classList.remove("hidden");
	}
}
function deletePhoto() {
	dom.defaultImg.classList.remove("hidden");
	dom.photoBtnText.classList.remove("hidden");
	dom.uploadedImg.src = "";
	dom.uploadedImg.classList.add("hidden");
	coords.top = 0;
	coords.left = 0;
	coords.rotate = 0;
	coords.scale = 1;
	state.editorLength = state.labelLength = state.uploadedImgSrc = null;
	dom.input.value = null;
	dom.deletePhoto.classList.add("hidden");
}