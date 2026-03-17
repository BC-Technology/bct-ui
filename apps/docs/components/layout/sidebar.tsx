import { getAllComponentNames, getComponent } from "@/lib/registry"
import { SidebarClient } from "./sidebar-client"

interface NavItem {
	title: string
	href: string
	items?: NavItem[]
}

interface SidebarProps {
	version?: string
}

const categoryTitles: Record<string, string> = {
	"form-inputs": "Form Inputs",
	feedback: "Feedback",
	display: "Display",
	navigation: "Navigation",
	layout: "Layout",
	advanced: "Advanced",
}

export function Sidebar({ version = "0.4.0" }: SidebarProps) {
	const componentNames = getAllComponentNames(version)
	const components = componentNames.map((name) => ({
		name,
		data: getComponent(version, name),
	}))

	// Group by category
	const categories = components.reduce(
		(acc, { name, data }) => {
			if (!data) return acc
			const category = data.category || "other"
			if (!acc[category]) {
				acc[category] = []
			}
			acc[category].push({
				title: data.title,
				href: `/components/${version}/${name}`,
			})
			return acc
		},
		{} as Record<string, Array<{ title: string; href: string }>>,
	)

	const navigation: NavItem[] = [
		{
			title: "Documentation",
			href: "#",
			items: [
				{
					title: "Getting Started",
					href: "/getting-started",
				},
				{
					title: "Design Principles",
					href: "/design-principles",
				},
				{
					title: "Design Tokens",
					href: "/tokens",
				},
				{
					title: "Examples",
					href: "/examples",
				},
			],
		},
		{
			title: "Components",
			href: `/components/${version}`,
			items: Object.entries(categories).map(([category, items]) => ({
				title: categoryTitles[category] || category,
				href: `/components/${version}#${category}`,
				items,
			})),
		},
	]

	return <SidebarClient navigation={navigation} />
}
