import {dom} from "./dom.js";
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
					<link rel="stylesheet" type="text/css" href="./css/reset.css">
					<link rel="stylesheet" type="text/css" href="./css/base.css">
					<link rel="stylesheet" type="text/css" href="./css/layout.css">
					<link rel="stylesheet" type="text/css" href="./css/utils.css">
					<link rel="stylesheet" type="text/css" href="./css/typography.css">
					<link rel="stylesheet" type="text/css" href="./css/components/process-button.css">
					<link rel="stylesheet" type="text/css" href="./css/components/page-backdrop.css">
					<link rel="stylesheet" type="text/css" href="./css/components/output/preview.css">
					<link rel="stylesheet" type="text/css" href="./css/components/output/personal.css">
					<link rel="stylesheet" type="text/css" href="./css/components/output/experience.css">
					<link rel="stylesheet" type="text/css" href="./css/components/output/print.css">
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