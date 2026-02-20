import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: "default" | "outlined" | "elevated"
	className?: string
	classNames?: {
		root?: string
		header?: string
		content?: string
		footer?: string
	}
	header?: React.ReactNode
	footer?: React.ReactNode
	children?: React.ReactNode
}

export function Card({
	variant = "default",
	className,
	classNames,
	header,
	footer,
	children,
	...props
}: CardProps) {
	const variantStyles: Record<string, string> = {
		default: "bg-surface-1 border border-border",
		outlined: "bg-transparent border-2 border-border",
		elevated: "bg-surface-1 shadow-shadow-md",
	}

	return (
		<div
			className={twMerge(
				clsx("overflow-hidden rounded-radius-lg", variantStyles[variant]),
				classNames?.root,
				className,
			)}
			{...props}
		>
			{header && (
				<div
					className={twMerge(
						"border-border border-b px-6 py-4",
						classNames?.header,
					)}
				>
					{header}
				</div>
			)}
			<div className={twMerge("px-6 py-4", classNames?.content)}>
				{children}
			</div>
			{footer && (
				<div
					className={twMerge(
						"border-border border-t bg-surface-1-hover px-6 py-4",
						classNames?.footer,
					)}
				>
					{footer}
				</div>
			)}
		</div>
	)
}
