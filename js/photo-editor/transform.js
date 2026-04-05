import {dom} from "./dom.js";
import {state} from "./state.js";
function pointerDown(e) {
	e.preventDefault();
	state.clickX = e.clientX;
	state.clickY = e.clientY;
	state.startTop = dom.img.offsetTop;
	state.startLeft = dom.img.offsetLeft;
	dom.img.classList.add("grabbing");
	dom.img.addEventListener("pointermove", pointerMove);
}
function pointerMove(e) {
	const deltaX = e.clientX - state.clickX;
	const deltaY = e.clientY - state.clickY;
	let newTop = state.startTop + deltaY;
	let newLeft = state.startLeft + deltaX;
	let minTop, minLeft;
	const divWidth = dom.div.clientWidth, divHeight = dom.div.clientHeight, imgWidth = dom.img.clientWidth, imgHeight = dom.img.clientHeight;
	const currentRotation = state.currentRotation, currentScale = state.currentScale;
	if (currentRotation === 90 || currentRotation === 270) {
		if (state.orientation === "A") {
			minTop = (divWidth - imgWidth * currentScale) / 2;
			minLeft = divWidth - (imgWidth + imgHeight * currentScale) / 2;
			const topEdge = Math.abs(minTop);
			const leftEdge = (minLeft + (2 * dom.zoom.value));
			if (newTop > topEdge) newTop = topEdge;
			if (newLeft > leftEdge) newLeft = leftEdge;
		} else {
			minTop = (divWidth - imgHeight + imgWidth * (1 - currentScale)) / 2;
			minLeft = (divWidth - imgHeight * currentScale) / 2;
			const topEdge = (divWidth - imgHeight - imgWidth + imgWidth * currentScale) / 2;
			const leftEdge = Math.abs(minLeft);
			if (newTop > topEdge) newTop = topEdge;
			if (newLeft > leftEdge) newLeft = leftEdge;
		}
	} else {
		minTop = divHeight - imgHeight * (1 + currentScale) / 2;
		minLeft = divWidth - imgWidth * (1 + currentScale) / 2;
		const topEdge = imgHeight * (currentScale - 1) / 2;
		const leftEdge = imgWidth * (currentScale - 1) / 2;
		if (newTop > topEdge) newTop = topEdge;
		if (newLeft > leftEdge) newLeft = leftEdge;
	}
	if (newTop < minTop) newTop = minTop;
	if (newLeft < minLeft) newLeft = minLeft;
	state.top = newTop;
	state.left = newLeft;
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
	const currentRotation = state.currentRotation;
	const domWidth = dom.div.clientWidth;
	if (state.orientation === "A") {
		dom.img.style.top = "0px";
		dom.img.style.left = ((domWidth - dom.img.clientWidth) / 2) + "px";
	} else {
		dom.img.style.top = ((domWidth - dom.img.clientHeight) / 2) + "px";
		dom.img.style.left = "0px";
	}
	state.rotate = currentRotation;
	dom.img.style.transform = `rotate(${currentRotation}deg) scale(${state.currentScale})`;
}
function imgOrientationAndSize() {
	const iH = dom.img.clientHeight, iW = dom.img.clientWidth;
	state.height = iH;
	state.width = iW;
	state.orientation = iH > iW ? "P" : "A";
}
function resetImgPos() {
	dom.zoom.value = dom.img.style.left = dom.img.style.top = "0";
	dom.img.style.transform = "rotate(0deg)";
	state.orientation = state.clickX = state.clickY = state.startLeft = state.startTop = null;
	state.currentRotation = 0;
	state.currentScale = 1;
}
function zoomImg() {
	state.currentScale = 1;
	state.currentScale += (dom.zoom.value / 100);
	const topNow = state.top;
	const leftNow = state.left;
	const divWidth = dom.div.clientWidth, divHeight = dom.div.clientHeight, imgWidth = dom.img.clientWidth, imgHeight = dom.img.clientHeight;
	const currentRotation = state.currentRotation, currentScale = state.currentScale;
	let minTop, minLeft;
	if (currentRotation === 90 || currentRotation === 270) {
		if (state.orientation === "A") {
			minTop = (divWidth - imgWidth * currentScale) / 2;
			minLeft = divWidth - (imgWidth + imgHeight * currentScale) / 2;
			const topEdge = Math.abs(minTop);
			const leftEdge = ((divWidth - imgWidth) / 2) + dom.zoom.value * 1;
			if (topNow > topEdge) dom.img.style.top = topEdge + "px";
			if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
		} else {
			minTop = (divWidth - imgHeight + imgWidth * (1 - currentScale)) / 2;
			minLeft = (divHeight - imgHeight * currentScale) / 2;
			const topEdge = (divWidth - imgHeight - imgWidth + imgWidth * currentScale) / 2;
			const leftEdge = (imgHeight * currentScale - divHeight) / 2;
			if (topNow > topEdge) dom.img.style.top = topEdge + "px";
			if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
		}
	} else {
		minTop = divHeight - imgHeight * (1 + currentScale) / 2;
		minLeft = divWidth - imgWidth * (1 + currentScale) / 2;
		const topEdge = Math.abs(imgHeight * (1 - currentScale) / 2);
		const leftEdge = 0.5 * imgWidth * (currentScale - 1);
		if (topNow > topEdge) dom.img.style.top = topEdge + "px";
		if (leftNow > leftEdge) dom.img.style.left = leftEdge + "px";
	}
	if (topNow < minTop) dom.img.style.top = minTop + "px";
	if (leftNow < minLeft) dom.img.style.left = minLeft + "px";
	state.scale = currentScale;
	dom.img.style.transform = `rotate(${currentRotation}deg) scale(${currentScale})`;
}
export {pointerDown, pointerUp, rotate, imgOrientationAndSize, resetImgPos, zoomImg};