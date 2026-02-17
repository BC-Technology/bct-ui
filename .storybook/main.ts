import path from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
	stories: [
		"../stories/Introduction.mdx",
		"../stories/docs/**/*.mdx",
		"../stories/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},

	viteFinal: async (config) => {
		// Ensure Tailwind CSS v4 is properly configured
		if (!config.plugins) config.plugins = []

		// Add Tailwind CSS v4 plugin
		config.plugins.push(tailwindcss())

		// Add path alias for @ imports
		if (!config.resolve) config.resolve = {}
		if (!config.resolve.alias) config.resolve.alias = {}

		config.resolve.alias = {
			...config.resolve.alias,
			"@": path.resolve(__dirname, "../packages/ui/src"),
		}

		return config
	},

	// Composition for future Vue/Angular support
	refs: {
		// Placeholder for Vue Storybook
		// vue: {
		//   title: 'BCT UI Vue',
		//   url: 'http://localhost:6007',
		//   expanded: false,
		// },
		// Placeholder for Angular Storybook
		// angular: {
		//   title: 'BCT UI Angular',
		//   url: 'http://localhost:6008',
		//   expanded: false,
		// },
	},

	addons: ["@storybook/addon-docs"],
}

export default config
