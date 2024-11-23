import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

//Define colors at top of file for easyness
const text = '#ffffff';
const secondaryText = '#8c8c8c';
const background = '#000000';
// const primary = '#574575';
const primary = '#453a57';
const secondary = '#272727';
const accent = '#a559d9';
const darkerAccent = '#6f3c91';
const error = '#ff4040';
const secondaryBg = '#121212';
const warnRed = '#991b1b';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: [
						{
							a: {
								color: accent,
								'&:hover': {
									color: darkerAccent
								}
							},
							hr: {
								marginTop: '0.5rem',
								marginBottom: '2rem'
							},
							// This is here because the paragraph margins were too big
							p: {
								marginTop: '2px',
								marginBottom: '1px'
							}
						}
					]
				}
			},
			colors: {
				text: text,
				'secondary-text': secondaryText,
				background: background,
				primary: primary,
				secondary: secondary,
				accent: accent,
				'darker-accent': darkerAccent,
				'secondary-bg': secondaryBg,
				error: error,
				'warn-red': warnRed
			},
			fontFamily: {
				'rock-salt': ['Rock Salt', 'cursive'],
				gaegu: ['Gaegu', 'serif']
			}
		}
	},

	plugins: [typography]
} satisfies Config;
