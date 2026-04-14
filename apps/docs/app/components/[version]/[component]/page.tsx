import { ArrowLeft, Package, Terminal } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { codeToHtml } from "shiki"
import { TerminalBlock } from "@/components/docs/code-block"
import { ComponentPreview } from "@/components/docs/component-preview"
import { DocsLayout } from "@/components/layout/docs-layout"
import { Header } from "@/components/layout/header"
import {
	CATEGORY_META,
	getAllComponentNames,
	getAllVersionsForComponent,
	getComponent,
	getComponentSource,
} from "@/lib/registry"
import { isValidVersion, VALID_VERSIONS } from "@/lib/versions"

interface ComponentPageProps {
	params: Promise<{ version: string; component: string }>
}

export async function generateStaticParams() {
	const params: { version: string; component: string }[] = []
	for (const version of VALID_VERSIONS) {
		for (const component of getAllComponentNames(version)) {
			params.push({ version, component })
		}
	}
	return params
}

export async function generateMetadata({
	params,
}: ComponentPageProps): Promise<Metadata> {
	const { version, component } = await params
	const entry = getComponent(version, component)
	return {
		title: entry?.title ?? component,
		description: entry?.description,
	}
}

export default async function ComponentPage({ params }: ComponentPageProps) {
	const { version, component } = await params

	if (!isValidVersion(version)) {
		notFound()
	}

	const entry = getComponent(version, component)
	if (!entry) {
		notFound()
	}

	const sourceCode = getComponentSource(version, component) ?? ""
	const categoryMeta = entry.category ? CATEGORY_META[entry.category] : null
	const allVersionsForComponent = getAllVersionsForComponent(component, [
		...VALID_VERSIONS,
	])

	// Syntax highlight the source code with Shiki
	let highlightedSource: string | undefined
	try {
		highlightedSource = await codeToHtml(sourceCode, {
			lang: "tsx",
			theme: "github-dark",
		})
	} catch {
		highlightedSource = undefined
	}

	return (
		<div className="flex min-h-screen flex-col">
			<Header version={version} currentComponent={component} />
			<DocsLayout version={version}>
				<div>
					{/* Breadcrumb */}
					<div className="mb-6 flex items-center gap-2">
						<Link
							href={`/components/${version}`}
							className="group flex items-center gap-1.5 text-sm text-typography-muted transition-colors hover:text-typography-primary"
						>
							<ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
							Components
						</Link>
						<span className="text-typography-muted">/</span>
						<span className="text-sm text-typography-primary">
							{entry.title}
						</span>
					</div>

					{/* Hero */}
					<div className="mb-8">
						{categoryMeta && (
							<div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-medium text-primary text-xs">
								<Package className="h-3 w-3" />
								{categoryMeta.label}
							</div>
						)}
						<h1 className="mb-3 font-bold text-4xl text-typography-primary tracking-tight">
							{entry.title}
						</h1>
						{entry.description && (
							<p className="text-lg text-typography-secondary">
								{entry.description}
							</p>
						)}
					</div>

					{/* Install command */}
					<div className="mb-8 rounded-xl border border-border bg-surface-1 p-5">
						<div className="mb-3 flex items-center gap-2">
							<Terminal className="h-4 w-4 text-typography-muted" />
							<h2 className="font-semibold text-sm text-typography-primary">
								Installation
							</h2>
						</div>
						<TerminalBlock
							code={`npx @bctechnology/ui@${version} add ${component}`}
						/>
					</div>

					{/* Live Preview */}
					<div className="mb-8">
						<h2 className="mb-4 font-semibold text-typography-primary text-xl">
							Preview
						</h2>
						<ComponentPreview
							version={version}
							component={component}
							sourceCode={sourceCode}
							highlightedSource={highlightedSource}
						/>
					</div>

					{/* Dependencies */}
					{(entry.deps.length > 0 ||
						(entry.registryDeps && entry.registryDeps.length > 0)) && (
						<div className="mb-8">
							<h2 className="mb-4 font-semibold text-typography-primary text-xl">
								Dependencies
							</h2>
							<div className="rounded-xl border border-border bg-surface-1">
								{entry.deps.length > 0 && (
									<div className="p-5">
										<h3 className="mb-3 font-medium text-sm text-typography-muted uppercase tracking-wider">
											npm packages
										</h3>
										<div className="flex flex-wrap gap-2">
											{entry.deps.map((dep) => (
												<span
													key={dep}
													className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-sm text-typography-primary"
												>
													{dep}
												</span>
											))}
										</div>
									</div>
								)}
								{entry.registryDeps && entry.registryDeps.length > 0 && (
									<div className="border-border border-t p-5">
										<h3 className="mb-3 font-medium text-sm text-typography-muted uppercase tracking-wider">
											BCT UI components required
										</h3>
										<div className="flex flex-wrap gap-2">
											{entry.registryDeps.map((dep) => (
												<Link
													key={dep}
													href={`/components/${version}/${dep}`}
													className="rounded-md border border-border bg-background px-2.5 py-1 font-mono text-primary text-sm transition-colors hover:border-primary/30"
												>
													{dep}
												</Link>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Available in versions */}
					<div className="mb-8">
						<h2 className="mb-4 font-semibold text-typography-primary text-xl">
							Versions
						</h2>
						<div className="flex flex-wrap gap-2">
							{[...VALID_VERSIONS].map((v) => {
								const exists = allVersionsForComponent.includes(v)
								return (
									<span
										key={v}
										className={`rounded-md px-3 py-1.5 font-medium text-sm ${
											exists
												? v === version
													? "bg-primary text-primary-on"
													: "border border-border bg-surface-1 text-typography-primary"
												: "border border-border bg-surface-1 text-typography-muted line-through opacity-50"
										}`}
									>
										v{v}
									</span>
								)
							})}
						</div>
					</div>
				</div>
			</DocsLayout>
		</div>
	)
}
