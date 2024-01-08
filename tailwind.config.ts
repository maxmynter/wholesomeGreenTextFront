import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				postBackgroundBlue: "#d6daf0",
				postBorderBlue: "#b7c5d9",
				nameBlockGreen: "#117743",
			},
		},
	},
	plugins: [],
}
export default config
