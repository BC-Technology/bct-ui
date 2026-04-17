"use client"

import { Check, Copy } from "lucide-react"
import { useCallback, useState } from "react"

interface CodeBlockProps {
	code: string
	language?: string
	highlightedHtml?: string
	filename?: string
	_showLineNumbers?: boolean
}

export function CodeBlock({
	code,
	language = "tsx",
	highlightedHtml,
	filename,
	_showLineNumbers = false,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}, [code])

	return (
		<div className="group relative overflow-hidden rounded-lg border border-border bg-surface-1">
			{filename && (
				<div className="flex items-center gap-2 border-border border-b px-4 py-2.5">
					<span className="font-mono text-typography-muted text-xs">
						{filename}
					</span>
				</div>
			)}
			<div className="relative overflow-x-auto">
				{highlightedHtml ? (
					<div
						className="p-4 text-sm [&>pre]:overflow-x-auto [&>pre]:bg-transparent! [&>pre]:p-0!"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki-generated safe HTML
						dangerouslySetInnerHTML={{ __html: highlightedHtml }}
					/>
				) : (
					<pre className="overflow-x-auto p-4">
						<code
							className={`font-mono text-sm text-typography-primary language-${language}`}
						>
							{code}
						</code>
					</pre>
				)}
			</div>

			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/80 text-typography-muted opacity-0 backdrop-blur-sm transition-all hover:border-border-hover hover:text-typography-primary group-hover:opacity-100"
				aria-label="Copy code"
			>
				{copied ? (
					<Check className="h-3.5 w-3.5 text-success" />
				) : (
					<Copy className="h-3.5 w-3.5" />
				)}
			</button>
		</div>
	)
}

// Inline code variant
export function InlineCode({ children }: { children: React.ReactNode }) {
	return (
		<code className="rounded border border-border bg-surface-1 px-1.5 py-0.5 font-mono text-sm text-typography-primary">
			{children}
		</code>
	)
}

// Terminal/shell code block
export function TerminalBlock({ code }: { code: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}, [code])

	return (
		<div className="group relative overflow-hidden rounded-lg border border-border bg-secondary">
			<div className="flex items-center gap-1.5 border-white/10 border-b px-4 py-2.5">
				<div className="h-2.5 w-2.5 rounded-full bg-error/60" />
				<div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
				<div className="h-2.5 w-2.5 rounded-full bg-success/60" />
			</div>
			<div className="relative overflow-x-auto p-4">
				<pre className="overflow-x-auto">
					<code className="font-mono text-secondary-on text-sm">
						<span className="select-none text-success/70">$ </span>
						{code}
					</code>
				</pre>
			</div>
			<button
				type="button"
				onClick={handleCopy}
				className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/10 text-secondary-on opacity-0 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/20 group-hover:opacity-100"
				aria-label="Copy command"
			>
				{copied ? (
					<Check className="h-3.5 w-3.5 text-success" />
				) : (
					<Copy className="h-3.5 w-3.5" />
				)}
			</button>
		</div>
	)
}
