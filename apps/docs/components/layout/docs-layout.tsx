import { Sidebar } from "@/components/layout/sidebar"
import { getComponentsByCategory, getSortedCategories } from "@/lib/registry"
import { DEFAULT_VERSION } from "@/lib/versions"

interface DocsLayoutProps {
	children: React.ReactNode
	version?: string
}

export function DocsLayout({ children, version = DEFAULT_VERSION }: DocsLayoutProps) {
	const grouped = getComponentsByCategory(version)
	const sortedCategories = getSortedCategories(grouped)

	return (
		<div className="mx-auto flex max-w-screen-2xl px-4 sm:px-6 lg:px-8">
			<Sidebar
				version={version}
				grouped={grouped}
				sortedCategories={sortedCategories}
			/>
			<main className="min-w-0 flex-1 py-8 md:pl-8 lg:pl-12">
				{children}
			</main>
		</div>
	)
}
