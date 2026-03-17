import {
	ArrowRight,
	Box,
	Layers,
	LayoutGrid,
	MessageSquare,
	Navigation,
	Sparkles,
	TextCursor,
} from "lucide-react"
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

const categoryIcons: Record<string, any> = {
	"form-inputs": TextCursor,
	feedback: MessageSquare,
	display: Box,
	navigation: Navigation,
	layout: LayoutGrid,
	advanced: Layers,
}

const categoryColors: Record<string, string> = {
	"form-inputs": "primary",
	feedback: "secondary",
	display: "accent-1",
	navigation: "accent-2",
	layout: "accent-3",
	advanced: "info",
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

	const categoryDescriptions: Record<string, string> = {
		"form-inputs":
			"Interactive form components for user input and data collection",
		feedback:
			"Components for displaying feedback, notifications, and loading states",
		display: "Components for presenting content and information",
		navigation: "Components for navigation and menu interactions",
		layout: "Structural components for page layouts and organization",
		advanced: "Specialized components for complex use cases",
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0">
						{/* Hero Section */}
						<div className="relative overflow-hidden rounded-md bg-surface-1 shadow-md">
							{/* Background Pattern */}
							<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5" />
							<div
								className="absolute inset-0 opacity-20"
								style={{
									backgroundImage:
										"radial-gradient(circle at 1px 1px, rgb(var(--color-border) / 0.2) 1px, transparent 0)",
									backgroundSize: "32px 32px",
								}}
							/>

							<div className="relative z-10 p-8 sm:p-12">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-sm">
											<Sparkles className="h-3.5 w-3.5" />
											<span>Version {version}</span>
										</div>
										<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
											Component Library
										</h1>
										<p className="mt-4 max-w-2xl text-lg text-typography-secondary">
											{componentNames.length} modern, accessible UI components
											built with React and Tailwind CSS v4
										</p>
									</div>
								</div>

								{/* Stats */}
								<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
									{Object.entries(categories).map(([category, items]) => {
										const Icon = categoryIcons[category] || Box
										return (
											<div
												key={category}
												className="rounded-lg bg-background/50 p-4 backdrop-blur-sm"
											>
												<div className="flex items-center gap-2">
													<Icon className="h-4 w-4 text-typography-muted" />
													<span className="font-semibold text-2xl text-typography-primary">
														{items.length}
													</span>
												</div>
												<p className="mt-1 text-sm text-typography-muted">
													{categoryTitles[category]}
												</p>
											</div>
										)
									})}
								</div>
							</div>
						</div>

						{/* Components by Category */}
						<div className="mt-12 space-y-16">
							{Object.entries(categories).map(([category, items]) => {
								const Icon = categoryIcons[category] || Box
								const colorClass = categoryColors[category] || "primary"

								return (
									<section key={category} id={category}>
										{/* Category Header */}
										<div className="mb-8">
											<div className="flex items-center gap-3">
												<div
													className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${colorClass}/10 text-${colorClass}`}
												>
													<Icon className="h-5 w-5" />
												</div>
												<div>
													<h2 className="font-bold text-2xl text-typography-primary">
														{categoryTitles[category] || category}
													</h2>
													<p className="text-sm text-typography-secondary">
														{categoryDescriptions[category]}
													</p>
												</div>
											</div>
										</div>

										{/* Component Cards */}
										<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
											{items.map(({ name, data }) => (
												<Link
													key={name}
													href={`/components/${version}/${name}`}
													className="group relative cursor-pointer overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm transition-all hover:bg-surface-2"
												>
													{/* Content */}
													<div className="relative">
														<h3 className="font-semibold text-lg text-typography-primary transition-colors group-hover:text-primary">
															{data.title}
														</h3>
														<p className="mt-2 line-clamp-2 text-sm text-typography-secondary">
															{data.description}
														</p>

														{/* Footer */}
														<div className="mt-4 flex items-center justify-between">
															<span className="rounded-full bg-surface-2 px-2.5 py-1 font-medium text-typography-muted text-xs">
																{categoryTitles[category]}
															</span>
															<ArrowRight className="h-4 w-4 text-typography-muted opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
														</div>
													</div>
												</Link>
											))}
										</div>
									</section>
								)
							})}
						</div>

						{/* Bottom CTA */}
						<div className="mt-16 rounded-md bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5 p-8 text-center">
							<h3 className="font-bold text-2xl text-typography-primary">
								Can't find what you're looking for?
							</h3>
							<p className="mt-2 text-typography-secondary">
								Check out our getting started guide or explore the design tokens
							</p>
							<div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
								<Link
									href="/getting-started"
									className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-medium text-primary-on text-sm transition-all hover:bg-primary-hover"
								>
									Getting Started
									<ArrowRight className="h-4 w-4" />
								</Link>
								<Link
									href="/tokens"
									className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-1 px-6 font-medium text-sm text-typography-primary transition-all hover:bg-surface-1"
								>
									Design Tokens
								</Link>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
