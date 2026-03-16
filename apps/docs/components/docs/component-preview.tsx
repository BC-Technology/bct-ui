"use client"

import { useState } from "react"
import { CodeBlock } from "./code-block"

interface ComponentPreviewProps {
	children: React.ReactNode
	code: string
}

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
	const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

	return (
		<div className="my-6 space-y-4">
			<div className="flex gap-2 border-border border-b">
				<button
					type="button"
					onClick={() => setActiveTab("preview")}
					className={`px-4 py-2 font-medium text-sm transition-colors ${
						activeTab === "preview"
							? "border-primary border-b-2 text-primary"
							: "text-typography-secondary hover:text-typography-primary"
					}`}
				>
					Preview
				</button>
				<button
					type="button"
					onClick={() => setActiveTab("code")}
					className={`px-4 py-2 font-medium text-sm transition-colors ${
						activeTab === "code"
							? "border-primary border-b-2 text-primary"
							: "text-typography-secondary hover:text-typography-primary"
					}`}
				>
					Code
				</button>
			</div>

			{activeTab === "preview" ? (
				<div className="flex min-h-[200px] items-center justify-center rounded-md border border-border bg-background p-8">
					{children}
				</div>
			) : (
				<CodeBlock code={code} />
			)}
		</div>
	)
}
