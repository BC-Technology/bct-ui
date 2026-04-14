export interface RegistryEntry {
	title: string
	description?: string
	category?: string
	files: Array<{ src: string; dst: string }>
	deps: string[]
	registryDeps?: string[]
}

export type Registry = Record<string, RegistryEntry>

export const CATEGORY_META: Record<
	string,
	{ label: string; description: string; order: number }
> = {
	"form-inputs": {
		label: "Form & Inputs",
		description: "Input controls, buttons, and form elements",
		order: 0,
	},
	feedback: {
		label: "Feedback",
		description: "Alerts, dialogs, tooltips, and status indicators",
		order: 1,
	},
	display: {
		label: "Display",
		description: "Cards, badges, avatars, and content containers",
		order: 2,
	},
	navigation: {
		label: "Navigation",
		description: "Tabs, dropdowns, breadcrumbs, and menus",
		order: 3,
	},
	layout: {
		label: "Layout",
		description: "Structural components for page composition",
		order: 4,
	},
	advanced: {
		label: "Advanced",
		description: "Complex file handling and media components",
		order: 5,
	},
	other: {
		label: "Other",
		description: "Utility and miscellaneous components",
		order: 6,
	},
}
