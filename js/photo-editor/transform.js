import {dom} from "./dom.js";
import {state} from "./state.js";
function pointerDown(e) {
	e.preventDefault();
	state.startX = e.clientX;
	state.startY = e.clientY;
	state.startTop = dom.img.offsetTop;
	state.startLeft = dom.img.offsetLeft;
	dom.img.classList.add("grabbing");
	dom.img.addEventListener("pointermove", pointerMove);
}
function pointerMove(e) {
	const deltaX = e.clientX - state.startX;
	const deltaY = e.clientY - state.startY;
	let newTop = state.startTop + deltaY;
	let newLeft = state.startLeft + deltaX;
	let minTop, minLeft;
	const divWidth = dom.div.clientWidth, divHeight = dom.div.clientHeight, imgWidth = dom.img.clientWidth, imgHeight = dom.img.clientHeight;
	if (state.currentRotation === 90 || state.currentRotation === 270) {
		if (state.orientation === "A") {
			minTop = (divWidth - imgWidth * state.currentScale) / 2;
			minLeft = divWidth - (imgWidth + imgHeight * state.currentScale) / 2;
			const topEdge = Math.abs(minTop);
			const leftEdge = (minLeft + (2 * dom.zoom.value));
			if (newTop > topEdge) newTop = topEdge;
			if (newLeft > leftEdge) newLeft = leftEdge;
		} else {
			minTop = (divWidth - imgHeight + imgWidth * (1 - state.currentScale)) / 2;
			minLeft = (divWidth - imgHeight * state.currentScale) / 2;
			const topEdge = (divWidth - imgHeight - imgWidth + imgWidth * state.currentScale) / 2;
			const leftEdge = Math.abs(minLeft);
			if (newTop > topEdge) newTop = topEdge;
			if (newLeft > leftEdge) newLeft = leftEdge;
		}
	} else {
		minTop = divHeight - imgHeight * (1 + state.currentScale) / 2;
		minLeft = divWidth - imgWidth * (1 + state.currentScale) / 2;
		const topEdge = imgHeight * (state.currentScale - 1) / 2;
		const leftEdge = imgWidth * (state.currentScale - 1) / 2;
		if (newTop > topEdge) newTop = topEdge;
		if (newLeft > leftEdge) newLeft = leftEdge;
	}
	if (newTop < minTop) newTop = minTop;
	if (newLeft < minLeft) newLeft = minLeft;
	dom.img.style.top = newTop + "px";
	dom.img.style.left = newLeft + "px";
}
function pointerUp() {
	dom.img.classList.remove("grabbing");
	dom.img.removeEventListener("pointermove", pointerMove);
}
function rotate() {
	if (state.currentRotation === 360) state.currentRotation = 0;
	state.currentRotation += 90;
	const domWidth = dom.div.clientWidth;
	if (state.orientation === "A") {
		dom.img.style.top = "0px";
		dom.img.style.left = ((domWidth - dom.img.clientWidth) / 2) + "px";
	} else {
		dom.img.style.top = ((domWidth - dom.img.clientHeight) / 2) + "px";
		dom.img.style.left = "0px";
	}
	dom.img.style.transform = `rotate(${state.currentRotation}deg) scale(${state.currentScale})`;
}
function imgOrientationAndSize() {
	const iH = dom.img.clientHeight, iW = dom.img.clientWidth;
	state.imgH = iH;
	state.imgW = iW;
	state.orientation = iH > iW ? "P" : "A";
}
function resetImgPos() {
	dom.zoom.value = dom.img.style.left = dom.img.style.top = "0";
	dom.img.style.transform = "rotate(0deg)";
	state.orientation = state.startX = state.startY = state.startLeft = state.startTop = null;
	state.currentRotation = 0;
	state.currentScale = 1;
}
function zoomImg() {
	state.currentScale = 1;
	state.currentScale += (dom.zoom.value / 100);
	const topNow = dom.img.style.top.split("px")[0] * 1;
	const leftNow = dom.img.style.left.split("px")[0] * 1;
	const divWidth = dom.div.clientWidth, divHeight = dom.div.clientHeight, imgWidth = dom.img.clientWidth, imgHeight = dom.img.clientHeight;
	let minTop, minLeft;
	if (state.currentRotation === 90 || state.currentRotation === 270) {
		if (state.orientation === "A") {
			minTop = (divWidth - imgWidth * state.currentScale) / 2;
			minLeft = divWidth - (imgWidth + imgHeight * state.currentScale) / 2;
			const topEdge = Math.abs(minTop);
			const leftEdge = ((divWidth - imgWidth) / 2) + dom.zoom.value * 1;
			if (topNow > topEdge) dom.img.style.top = topEdge + "px";
			if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
		} else {
			minTop = (divWidth - imgHeight + imgWidth * (1 - state.currentScale)) / 2;
			minLeft = (divHeight - imgHeight * state.currentScale) / 2;
			const topEdge = (divWidth - imgHeight - imgWidth + imgWidth * state.currentScale) / 2;
			const leftEdge = (imgHeight * state.currentScale - divHeight) / 2;
			if (topNow > topEdge) dom.img.style.top = topEdge + "px";
			if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
		}
	} else {
		minTop = divHeight - imgHeight * (1 + state.currentScale) / 2;
		minLeft = divWidth - imgWidth * (1 + state.currentScale) / 2;
		const topEdge = Math.abs(imgHeight * (1 - state.currentScale) / 2);
		const leftEdge = 0.5 * imgWidth * (state.currentScale - 1);
		if (topNow > topEdge) dom.img.style.top = topEdge + "px";
		if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
	}
	if (topNow < minTop) dom.img.style.top = minTop + "px";
	if (leftNow < minLeft) dom.img.style.left = minLeft + "px";
	dom.img.style.transform = `rotate(${state.currentRotation}deg) scale(${state.currentScale})`;
}
export {pointerDown, pointerUp, rotate, imgOrientationAndSize, resetImgPos, zoomImg};