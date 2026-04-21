"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { CodeBlock } from "@/components/docs/code-block"
import { PREVIEW_REGISTRY } from "@/previews/registry"
import type { VariantPreview } from "@/previews/types"

interface ComponentPreviewProps {
	version: string
	component: string
	sourceCode: string
	highlightedSource?: string
}

export function ComponentPreview({
	version,
	component,
	sourceCode,
	highlightedSource,
}: ComponentPreviewProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code" | "source">(
		"preview",
	)
	const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light")
	const [variants, setVariants] = useState<VariantPreview[]>([])
	const [activeVariant, setActiveVariant] = useState(0)
	const [loading, setLoading] = useState(true)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		async function loadVariants() {
			setLoading(true)
			try {
				const loader = PREVIEW_REGISTRY[version]?.[component]
				if (loader) {
					const mod = await loader()
					setVariants(mod.variants)
				}
			} catch {
				setVariants([])
			} finally {
				setLoading(false)
			}
		}
		loadVariants()
	}, [version, component])

	const currentVariant = variants[activeVariant]
	const hasVariants = variants.length > 0

	return (
		<div className="overflow-hidden rounded-xl border border-border">
			{/* Tab bar */}
			<div className="flex items-center justify-between border-border border-b bg-surface-1 px-4">
				<div className="flex gap-0">
					{[
						{ id: "preview" as const, label: "Preview" },
						{ id: "code" as const, label: "Code" },
						{ id: "source" as const, label: "Source" },
					].map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={`border-b-2 px-4 py-3 font-medium text-sm transition-colors ${
								activeTab === tab.id
									? "border-primary text-primary"
									: "border-transparent text-typography-muted hover:text-typography-primary"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				{/* Controls */}
				<div className="flex items-center gap-2">
					{/* Variant selector */}
					{hasVariants && variants.length > 1 && activeTab === "preview" && (
						<select
							value={activeVariant}
							onChange={(e) => setActiveVariant(Number(e.target.value))}
							className="h-7 rounded-md border border-border bg-background px-2 text-typography-secondary text-xs"
						>
							{variants.map((v, i) => (
								<option key={v.name} value={i}>
									{v.name}
								</option>
							))}
						</select>
					)}

					{/* Inner theme toggle */}
					{activeTab === "preview" && (
						<button
							type="button"
							onClick={() =>
								setPreviewTheme(previewTheme === "light" ? "dark" : "light")
							}
							className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-typography-muted transition-colors hover:border-border-hover hover:text-typography-primary"
							aria-label="Toggle preview theme"
						>
							{previewTheme === "dark" ? (
								<Sun className="h-3.5 w-3.5" />
							) : (
								<Moon className="h-3.5 w-3.5" />
							)}
						</button>
					)}
				</div>
			</div>

			{/* Preview pane */}
			{activeTab === "preview" && (
				<div
					ref={containerRef}
					data-theme={previewTheme}
					className={`min-h-80 p-8 ${previewTheme === "dark" ? "dark" : ""}`}
					style={{
						backgroundColor: "var(--color-surface-2)",
					}}
				>
					{loading ? (
						<div className="flex h-40 items-center justify-center">
							<div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
						</div>
					) : !hasVariants ? (
						<div className="flex h-40 flex-col items-center justify-center gap-2 text-typography-muted">
							<p className="text-sm">Preview not available</p>
						</div>
					) : (
						<div className="flex min-h-48 items-center justify-center">
							{currentVariant?.render()}
						</div>
					)}
				</div>
			)}

			{/* Code pane (variant code) */}
			{activeTab === "code" && (
				<div className="bg-surface-2 p-4">
					{currentVariant ? (
						<>
							{currentVariant.description && (
								<p className="mb-3 text-sm text-typography-secondary">
									{currentVariant.description}
								</p>
							)}
							<CodeBlock code={currentVariant.code} language="tsx" />
						</>
					) : (
						<p className="text-sm text-typography-muted">
							No code example available.
						</p>
					)}
				</div>
			)}

			{/* Source pane (full component source) */}
			{activeTab === "source" && (
				<div className="bg-surface-2 p-4">
					<CodeBlock
						code={sourceCode}
						language="tsx"
						highlightedHtml={highlightedSource}
					/>
				</div>
			)}
		</div>
	)
}
