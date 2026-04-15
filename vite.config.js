import {dirname, resolve} from "node:path";
import {defineConfig} from "vite";

export default defineConfig({
	build: {
		rolldownOptions: {
			input: {
				index: resolve(import.meta.dirname, "index.html"),
				personal: resolve(import.meta.dirname, "personal.html"),
				experience: resolve(import.meta.dirname, "experience.html"),
				output: resolve(import.meta.dirname, "output.html"),
			},
		},
	},
})