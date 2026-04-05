import {dom} from "./dom.js";
import {state} from "./state.js";
import {pointerDown, pointerUp, rotate, imgOrientationAndSize, resetImgPos, zoomImg} from "./transform.js";
import {savePhoto, deletePhoto} from "./actions.js";
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
		state.src = dataURL;
		dom.img.src = dataURL;
		dom.img.onload = () => {
			dom.overlay.classList.remove("hidden");
			state.editorLength = dom.div.clientHeight;
			state.labelLength = dom.label.clientHeight;
			imgOrientationAndSize();
		}
	}
}