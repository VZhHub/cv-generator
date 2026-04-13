import {dom} from "./dom.js";
createAvatar();
function getImgData() {
	const storedImg = sessionStorage.getItem("uploadedImg");
	if (!storedImg) return;
	return JSON.parse(storedImg);
}
function createAvatar() {
	const data = getImgData();
	if (!data) return;
	const {src, height, width, top, left, rotate, scale} = data;
	const img = new Image();
	img.src = src;
	img.height = height;
	img.width = width;
	img.style.top = top;
	img.style.left = left;
	img.style.transform = `rotate(${rotate}deg) scale(${scale})`;
	dom.avatar.appendChild(img);
}