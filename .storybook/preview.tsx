import type { Preview } from "@storybook/react-vite"
import React from "react"
import "../packages/ui/src/assets/tokens/index.css"

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story, context) => {
			// Get theme from globals
			const theme = context.globals.theme || "light"

			// Apply theme class to document
			React.useEffect(() => {
				const root = document.documentElement
				if (theme === "dark") {
					root.classList.add("dark")
					root.setAttribute("data-theme", "dark")
				} else {
					root.classList.remove("dark")
					root.setAttribute("data-theme", "light")
				}

				// Persist theme preference
				localStorage.setItem("bct-storybook-theme", theme)
			}, [theme])

			return (
				<div className="min-h-screen bg-background p-4">
					<Story />
				</div>
			)
		},
	],
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				icon: "circlehollow",
				items: [
					{ value: "light", icon: "sun", title: "Light mode" },
					{ value: "dark", icon: "moon", title: "Dark mode" },
				],
			},
		},
		componentVersion: {
			name: "Version",
			description: "Component version to display",
			defaultValue: "0.2.0",
			toolbar: {
				icon: "structure",
				items: [
					{ value: "0.2.0", title: "v0.2.0" },
					{ value: "0.1.12", title: "v0.1.12" },
					{ value: "0.1.11", title: "v0.1.11" },
					{ value: "0.1.8", title: "v0.1.8" },
					{ value: "0.1.0", title: "v0.1.0" },
				],
			},
		},
	},
}

export default preview
