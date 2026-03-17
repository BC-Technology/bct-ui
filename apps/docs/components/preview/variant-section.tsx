"use client"

import { Code2, Eye } from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { CodeBlock } from "../docs/code-block"

interface VariantSectionProps {
	name: string
	description: string
	code: string
	preview: ReactNode
}

export function VariantSection({
	name,
	description,
	code,
	preview,
}: VariantSectionProps) {
	const [showCode, setShowCode] = useState(false)

	return (
		<div className="group relative overflow-hidden rounded-lg border border-border bg-surface-1 shadow-sm">
			<div className="p-6">
				{/* Header */}
				<div className="mb-4 flex items-start justify-between">
					<div>
						<h3 className="font-semibold text-lg text-typography-primary">
							{name}
						</h3>
						<p className="mt-1 text-sm text-typography-secondary">
							{description}
						</p>
					</div>
					<button
						type="button"
						onClick={() => setShowCode(!showCode)}
						className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:bg-accent"
					>
						{showCode ? (
							<>
								<Eye className="h-4 w-4" />
								Preview
							</>
						) : (
							<>
								<Code2 className="h-4 w-4" />
								Code
							</>
						)}
					</button>
				</div>

				{/* Content */}
				{showCode ? (
					<CodeBlock code={code} language="tsx" />
				) : (
					<div className="flex min-h-32 items-center justify-center rounded-lg border border-border bg-linear-to-br from-surface-1 to-surface-2 p-8">
						{preview}
					</div>
				)}
			</div>
		</div>
	)
}
