import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { getAllComponentNames, getComponent } from "@/lib/registry"

interface ComponentsOverviewProps {
	params: Promise<{
		version: string
	}>
}

const VALID_VERSIONS = ["0.4.0", "0.3.0", "0.2.0"]

export async function generateStaticParams() {
	return VALID_VERSIONS.map((version) => ({ version }))
}

export default async function ComponentsOverview({
	params,
}: ComponentsOverviewProps) {
	const { version } = await params

	if (!VALID_VERSIONS.includes(version)) {
		notFound()
	}

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
			acc[category].push({ name, data })
			return acc
		},
		{} as Record<string, Array<{ name: string; data: any }>>,
	)

	const categoryTitles: Record<string, string> = {
		"form-inputs": "Form Inputs",
		feedback: "Feedback",
		display: "Display",
		navigation: "Navigation",
		layout: "Layout",
		advanced: "Advanced",
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0">
						{/* Hero Section */}
						<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-secondary to-accent p-12 text-white shadow-xl">
							<div className="relative z-10">
								<h1 className="font-bold text-5xl tracking-tight">
									Components
								</h1>
								<p className="mt-4 max-w-2xl text-lg text-white/90">
									Version {version} • {componentNames.length} components
								</p>
								<p className="mt-2 max-w-2xl text-white/80">
									Modern, accessible UI components built with React and Tailwind
									CSS v4
								</p>
							</div>
							<div className="absolute top-0 right-0 h-full w-1/2 bg-white/5" />
						</div>

						{/* Components Grid */}
						<div className="mt-12 space-y-12">
							{Object.entries(categories).map(([category, items]) => (
								<section key={category}>
									<h2 className="mb-6 font-bold text-2xl text-typography-primary">
										{categoryTitles[category] || category}
									</h2>
									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{items.map(({ name, data }) => (
											<Link
												key={name}
												href={`/components/${version}/${name}`}
												className="group relative overflow-hidden rounded-lg border border-border bg-surface-1 p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
											>
												<div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-primary/60 to-secondary/60 opacity-0 transition-opacity group-hover:opacity-100" />
												<h3 className="font-semibold text-lg text-typography-primary group-hover:text-primary">
													{data.title}
												</h3>
												<p className="mt-2 line-clamp-2 text-sm text-typography-secondary">
													{data.description}
												</p>
												<div className="mt-4 flex items-center text-typography-muted text-xs">
													<span className="rounded-full bg-accent/10 px-2 py-1">
														{category}
													</span>
												</div>
											</Link>
										))}
									</div>
								</section>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
