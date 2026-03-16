import { notFound } from "next/navigation"
import { Suspense } from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { VariantSection } from "@/components/preview/variant-section"
import {
	getComponentFromModule,
	loadComponentModule,
} from "@/lib/component-loader"
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

export default async function ComponentPage({ params }: ComponentPageProps) {
	const { version, component } = await params
	const componentData = getComponent(version, component)

	if (!componentData) {
		notFound()
	}

	const source = getComponentSource(version, component)

	// Load component module for live previews
	const componentModule = await loadComponentModule(version, component)
	const Component = componentModule
		? getComponentFromModule(componentModule, component)
		: null

	// Generate variant examples
	const variants = generateVariantExamples(component)

	return (
		<div className="flex min-h-screen flex-col">
			<Header currentVersion={version} />
			<div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
				<Sidebar version={version} />
				<main className="relative py-6 lg:gap-10 lg:py-8">
					<div className="mx-auto w-full min-w-0">
						{/* Hero Section */}
						<div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/90 via-secondary/90 to-accent/90 p-8 text-white shadow-lg">
							<div className="relative z-10">
								<h1 className="font-bold text-4xl tracking-tight">
									{componentData.title}
								</h1>
								<p className="mt-3 max-w-2xl text-lg text-white/90">
									{componentData.description}
								</p>
							</div>
							<div className="absolute top-0 right-0 h-full w-1/3 bg-white/5" />
						</div>

						{/* Installation */}
						<div className="mt-8 rounded-lg border border-border bg-surface-1 p-6">
							<h2 className="mb-3 font-semibold text-lg">Installation</h2>
							<div className="rounded-md bg-muted p-4">
								<code className="text-sm">bct add {component}</code>
							</div>
						</div>

						{/* Dependencies */}
						{componentData.deps && componentData.deps.length > 0 && (
							<div className="mt-6 rounded-lg border border-border bg-surface-1 p-6">
								<h2 className="mb-3 font-semibold text-lg">Dependencies</h2>
								<div className="flex flex-wrap gap-2">
									{componentData.deps.map((dep) => (
										<code
											key={dep}
											className="rounded-md bg-muted px-3 py-1.5 text-sm"
										>
											{dep}
										</code>
									))}
								</div>
							</div>
						)}

						{/* Variants */}
						{Component && variants.length > 0 && (
							<div className="mt-12">
								<h2 className="mb-6 font-bold text-2xl">Variants & Examples</h2>
								<div className="space-y-6">
									<Suspense fallback={<div>Loading preview...</div>}>
										{variants.map((variant, index) => (
											<VariantSection
												key={`${variant.name}-${index}`}
												name={variant.name}
												description={variant.description}
												code={variant.code}
												preview={<Component {...variant.props} />}
											/>
										))}
									</Suspense>
								</div>
							</div>
						)}

						{/* Full Source Code */}
						{source && (
							<div className="mt-12">
								<h2 className="mb-4 font-bold text-2xl">Full Source Code</h2>
								<CodeBlock code={source} language="tsx" />
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	)
}
