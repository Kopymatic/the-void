import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const accent = "#a559d9";
const darkerAccent = "#6f3c91";

export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: [
						{
							a: {
								color: accent,
								"&:hover": {
									color: darkerAccent
								}
							},
							hr: {
								marginTop: "0.5rem",
								marginBottom: "2rem"
							},
							// This is here because the paragraph margins were too big
							p: {
								marginTop: "2px",
								marginBottom: "1px"
							}
						}
					]
				}
			}
		}
	},

	plugins: [typography]
} satisfies Config;
