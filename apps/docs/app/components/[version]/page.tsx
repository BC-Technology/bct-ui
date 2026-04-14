import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/header"
import { DocsLayout } from "@/components/layout/docs-layout"
import {
	CATEGORY_META,
	getComponentsByCategory,
	getSortedCategories,
} from "@/lib/registry"
import { getNewInVersion } from "@/lib/versions"
import { VALID_VERSIONS, isValidVersion } from "@/lib/versions"

interface ComponentsPageProps {
	params: Promise<{ version: string }>
}

export async function generateStaticParams() {
	return VALID_VERSIONS.map((version) => ({ version }))
}

export async function generateMetadata({ params }: ComponentsPageProps): Promise<Metadata> {
	const { version } = await params
	return {
		title: `Components — v${version}`,
		description: `Browse all BCT UI components for version ${version}.`,
	}
}

export default async function ComponentsPage({ params }: ComponentsPageProps) {
	const { version } = await params

	if (!isValidVersion(version)) {
		notFound()
	}

	const grouped = getComponentsByCategory(version)
	const sortedCategories = getSortedCategories(grouped)

	const totalComponents = Object.values(grouped).reduce(
		(sum, comps) => sum + comps.length,
		0,
	)

	return (
		<div className="flex min-h-screen flex-col">
			<Header version={version} />
			<DocsLayout version={version}>
				<div>
					<div className="mb-8">
						<h1 className="mb-2 font-bold text-4xl text-typography-primary tracking-tight">
							Components
						</h1>
						<p className="text-typography-secondary">
							{totalComponents} components available in v{version}. Click any
							component to see live previews, source code, and usage examples.
						</p>
					</div>

					<div className="flex flex-col gap-12">
						{sortedCategories.map((category) => {
							const meta = CATEGORY_META[category]
							const components = grouped[category]

							return (
								<section key={category}>
									<div className="mb-4">
										<h2 className="font-semibold text-xl text-typography-primary">
											{meta?.label ?? category}
										</h2>
										{meta?.description && (
											<p className="mt-0.5 text-sm text-typography-secondary">
												{meta.description}
											</p>
										)}
									</div>
									<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
										{components.map((component) => {
											const newIn = getNewInVersion(component.name)
											return (
												<Link
													key={component.name}
													href={`/components/${version}/${component.name}`}
													className="group relative flex flex-col gap-2 rounded-xl border border-border bg-surface-1 p-5 transition-all hover:border-primary/30 hover:bg-surface-2 hover:shadow-shadow-sm"
												>
													{newIn && (
														<span className="absolute right-3 top-3 rounded-full bg-success-muted px-2 py-0.5 text-[10px] font-semibold text-typography-primary">
															New in v{newIn}
														</span>
													)}
													<h3 className="font-semibold text-typography-primary transition-colors group-hover:text-primary">
														{component.title}
													</h3>
													{component.description && (
														<p className="text-sm text-typography-secondary line-clamp-2">
															{component.description}
														</p>
													)}
													{component.deps.length > 0 && (
														<div className="mt-auto flex flex-wrap gap-1 pt-2">
															{component.deps.slice(0, 2).map((dep) => (
																<span
																	key={dep}
																	className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-typography-muted"
																>
																	{dep.replace("@base-ui/react", "@base-ui").replace("@bctechnology/", "")}
																</span>
															))}
															{component.deps.length > 2 && (
																<span className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-typography-muted">
																	+{component.deps.length - 2} more
																</span>
															)}
														</div>
													)}
												</Link>
											)
										})}
									</div>
								</section>
							)
						})}
					</div>
				</div>
			</DocsLayout>
		</div>
	)
}
