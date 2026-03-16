"use client"

import type { ComponentType } from "react"
import { ErrorBoundary } from "react-error-boundary"

interface ComponentRendererProps {
	Component: ComponentType<any>
	props: Record<string, any>
	className?: string
}

function ErrorFallback({ error }: { error: unknown }) {
	const errorMessage =
		error instanceof Error ? error.message : "An unknown error occurred"
	return (
		<div className="rounded-md border border-error bg-error-muted p-4 text-sm">
			<p className="font-semibold text-error">Failed to render component</p>
			<p className="mt-1 text-typography-secondary">{errorMessage}</p>
		</div>
	)
}

export function ComponentRenderer({
	Component,
	props,
	className,
}: ComponentRendererProps) {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div
				className={`flex min-h-32 items-center justify-center rounded-lg border border-border bg-linear-to-br from-surface-1 to-surface-2 p-8 ${className || ""}`}
			>
				<Component {...props} />
			</div>
		</ErrorBoundary>
	)
}
