import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

//Define colors at top of file for easyness
const text = '#ffffff';
const secondaryText = '#8c8c8c';
const background = '#000000';
const primary = '#574575';
const secondary = '#272727';
const accent = '#a559d9';
const darkerAccent = '#6f3c91';
const error = '#ff4040';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						a: {
							color: accent,
							'&:hover': {
								color: darkerAccent
							}
						}
					}
				}
			},
			colors: {
				text: text,
				'secondary-text': secondaryText,
				background: background,
				primary: primary,
				secondary: secondary,
				accent: accent,
				error: error
			}
		}
	},

	plugins: [typography]
} satisfies Config;
