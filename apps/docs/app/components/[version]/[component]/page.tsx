import { ArrowLeft, Copy, Package, Terminal } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CodeBlock } from "@/components/docs/code-block"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { ComponentExamples } from "@/components/preview/component-examples"
import { generateVariantExamples } from "@/lib/preview-generator"
import {
	getAllComponentNames,
	getComponent,
	getComponentSource,
} from "@/lib/registry"

interface ComponentPageProps {
	params: Promise<{
		version: string
		component: string
	}>
}

export async function generateStaticParams() {
	const versions = ["0.4.0", "0.3.0", "0.2.0"]
	const params: { version: string; component: string }[] = []

	for (const version of versions) {
		const components = getAllComponentNames(version)
		for (const component of components) {
			params.push({ version, component })
		}
	}

	return params
}

const categoryTitles: Record<string, string> = {
	"form-inputs": "Form Inputs",
	feedback: "Feedback",
	display: "Display",
	navigation: "Navigation",
	layout: "Layout",
	advanced: "Advanced",
}

export default async function ComponentPage({ params }: ComponentPageProps) {
	const { version, component } = await params
	const componentData = getComponent(version, component)

	if (!componentData) {
		notFound()
	}

	const source = getComponentSource(version, component)


	// Generate variant examples
	const variants = await generateVariantExamples(component, version)

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0">
						{/* Breadcrumb */}
						<div className="mb-6">
							<Link
								href={`/components/${version}`}
								className="group inline-flex items-center gap-2 text-sm text-typography-muted transition-colors hover:text-typography-primary"
							>
								<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
								Back to Components
							</Link>
						</div>

						{/* Hero Section */}
						<div className="relative overflow-hidden rounded-md bg-surface-1 shadow-md">
							{/* Background Pattern */}
							<div className="absolute inset-0 bg-linear-to-br from-primary/5 via-secondary/5 to-accent-1/5" />
							<div
								className="absolute inset-0 opacity-10"
								style={{
									backgroundImage:
										"radial-gradient(circle at 1px 1px, rgb(var(--color-border) / 0.3) 1px, transparent 0)",
									backgroundSize: "24px 24px",
								}}
							/>

							<div className="relative z-10 p-8 sm:p-10">
								{componentData.category && (
									<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-sm">
										<Package className="h-3.5 w-3.5" />
										<span>{categoryTitles[componentData.category]}</span>
									</div>
								)}
								<h1 className="font-bold text-4xl text-typography-primary tracking-tight sm:text-5xl">
									{componentData.title}
								</h1>
								<p className="mt-4 max-w-3xl text-lg text-typography-secondary">
									{componentData.description}
								</p>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="mt-8 grid gap-4 sm:grid-cols-2">
							{/* Installation */}
							<div className="relative overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm">
								<div className="flex items-start gap-4">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
										<Terminal className="h-5 w-5" />
									</div>
									<div className="min-w-0 flex-1">
										<h3 className="font-semibold text-lg text-typography-primary">
											Installation
										</h3>
										<p className="mt-1 text-sm text-typography-muted">
											Add this component to your project
										</p>
										<div className="mt-3 flex items-center gap-2 rounded-lg bg-surface-2 p-3">
											<code className="flex-1 font-mono text-sm text-typography-primary">
												bct add {component}
											</code>
											<button
												type="button"
												className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-typography-muted transition-colors hover:bg-surface-3 hover:text-typography-primary"
												aria-label="Copy command"
											>
												<Copy className="h-4 w-4" />
											</button>
										</div>
									</div>
								</div>
							</div>

							{/* Dependencies */}
							{componentData.deps && componentData.deps.length > 0 && (
								<div className="relative overflow-hidden rounded-md bg-surface-1 p-6 shadow-sm">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
											<Package className="h-5 w-5" />
										</div>
										<div className="min-w-0 flex-1">
											<h3 className="font-semibold text-lg text-typography-primary">
												Dependencies
											</h3>
											<p className="mt-1 text-sm text-typography-muted">
												Required packages
											</p>
											<div className="mt-3 flex flex-wrap gap-2">
												{componentData.deps.map((dep) => (
													<code
														key={dep}
														className="rounded-lg bg-surface-2 px-3 py-1.5 font-mono text-sm text-typography-primary"
													>
														{dep}
													</code>
												))}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Variants & Examples */}
						<ComponentExamples
							version={version}
							componentName={component}
							serverVariants={variants.map((v) => ({
								...v,
								preview: undefined,
							}))}
						/>

						{/* Full Source Code */}
						{source && (
							<div className="mt-16">
								<div className="mb-6 flex items-center justify-between">
									<div>
										<h2 className="font-bold text-3xl text-typography-primary">
											Source Code
										</h2>
										<p className="mt-2 text-typography-secondary">
											Complete component implementation
										</p>
									</div>
									<button
										type="button"
										className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-surface-1 px-4 font-medium text-sm text-typography-primary transition-all hover:bg-surface-1"
									>
										<Copy className="h-4 w-4" />
										Copy Code
									</button>
								</div>
								<CodeBlock code={source} language="tsx" />
							</div>
						)}

						{/* Related Components */}
						{componentData.registryDeps &&
							componentData.registryDeps.length > 0 && (
								<div className="mt-16">
									<h3 className="mb-4 font-bold text-2xl text-typography-primary">
										Related Components
									</h3>
									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{componentData.registryDeps.map((dep) => {
											const depData = getComponent(version, dep)
											if (!depData) return null
											return (
												<Link
													key={dep}
													href={`/components/${version}/${dep}`}
													className="group relative cursor-pointer overflow-hidden rounded-md bg-surface-1 p-4 shadow-sm transition-all hover:bg-surface-2"
												>
													<h4 className="font-semibold text-typography-primary transition-colors group-hover:text-primary">
														{depData.title}
													</h4>
													<p className="mt-1 line-clamp-2 text-sm text-typography-secondary">
														{depData.description}
													</p>
												</Link>
											)
										})}
									</div>
								</div>
							)}
					</div>
				</main>
			</div>
		</div>
	)
}
