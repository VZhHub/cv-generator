import {dom} from "./dom.js";
window.addEventListener("resize", resizePage);
resizePage();
function resizePage() {
	const {preview, main} = dom;
	const margins = getMargins(preview);
	const pageWidth = document.documentElement.clientWidth;
	const totalWidth = preview.clientWidth + margins.left + margins.right;
	const scale = Math.min(pageWidth / totalWidth, 1);
	const scaledHeight = preview.clientHeight * scale + margins.top + margins.bottom;
	preview.style.transform = `scale(${scale})`;
	main.style.gridTemplateRows = `auto ${scaledHeight}px auto`;
}
function getMargins(el) {
	const style = window.getComputedStyle(el);
	const margins = {
		top: parseFloat(style.marginTop),
		right: parseFloat(style.marginRight),
		bottom: parseFloat(style.marginBottom),
		left: parseFloat(style.marginLeft)
	};
	return margins;
}