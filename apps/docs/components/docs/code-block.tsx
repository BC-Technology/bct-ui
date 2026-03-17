"use client"

import { Check, Copy } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { codeToHtml } from "shiki"

interface CodeBlockProps {
	code: string
	language?: string
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
	const [copied, setCopied] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			codeToHtml(code, {
				lang: language,
				theme: "github-dark",
				decorations: [
					{
						properties: {
							class: "p-4",
						},
						alwaysWrap: true,
						start: 0,
						end: code.length,
					},
				],
			}).then((html) => {
				if (containerRef.current) {
					containerRef.current.innerHTML = html
				}
			})
		}
	}, [code, language])

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="group relative">
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-4 right-4 z-10 rounded-md border border-border bg-background p-2 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
				aria-label="Copy code"
			>
				{copied ? (
					<Check className="h-4 w-4 text-success" />
				) : (
					<Copy className="h-4 w-4" />
				)}
			</button>
			<div
				ref={containerRef}
				className="rounded-md border border-border bg-surface-1"
			/>
		</div>
	)
}
