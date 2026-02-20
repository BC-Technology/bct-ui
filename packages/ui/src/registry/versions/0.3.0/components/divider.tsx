import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface DividerProps extends React.ComponentPropsWithoutRef<"div"> {
	orientation?: "horizontal" | "vertical"
	label?: string
	className?: string
}

export function Divider({
	orientation = "horizontal",
	label,
	className,
	...props
}: DividerProps) {
	if (label) {
		return (
			<div className={twMerge("flex items-center gap-3", className)} {...props}>
				<div className="h-px flex-1 bg-divider" />
				<span className="shrink-0 text-text-sm text-typography-muted">
					{label}
				</span>
				<div className="h-px flex-1 bg-divider" />
			</div>
		)
	}

	return (
		<div
			className={twMerge(
				clsx({
					"h-px w-full bg-divider": orientation === "horizontal",
					"h-full w-px bg-divider": orientation === "vertical",
				}),
				className,
			)}
			{...props}
		/>
	)
}
