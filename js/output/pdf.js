import {dom} from "./dom.js";
import resetCSS from "../../css/reset.css?inline";
import baseCSS from "../../css/base.css?inline";
import layoutCSS from "../../css/layout.css?inline";
import utilsCSS from "../../css/utils.css?inline";
import processButtonCSS from "../../css/components/process-button.css?inline";
import pageBackdropCSS from "../../css/components/page-backdrop.css?inline";
import previewCSS from "../../css/components/output/preview.css?inline";
import personalCSS from "../../css/components/output/personal.css?inline";
import experienceCSS from "../../css/components/output/experience.css?inline";
import printCSS from "../../css/components/output/print.css?inline";
dom.downloadPdf.addEventListener("click", () => {
	const preview = dom.preview.outerHTML;
	const f = document.createElement("iframe");
	document.body.appendChild(f);
	const doc = f.contentDocument;
	doc.open();
	doc.write(`
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<style>
						${resetCSS}
						${baseCSS}
						${layoutCSS}
						${utilsCSS}
						${processButtonCSS}
						${pageBackdropCSS}
						${previewCSS}
						${personalCSS}
						${experienceCSS}
						${printCSS}
					</style>
				</head>
				<body>
					${preview}
				</body>
			</html>`);
	doc.close();
	f.onload = () => {
		f.contentWindow.focus();
		f.contentWindow.print();
	};
	setTimeout(() => f.remove(), 1000);
});