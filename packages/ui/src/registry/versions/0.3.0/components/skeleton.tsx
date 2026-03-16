import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SkeletonProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: "text" | "circular" | "rectangular"
	width?: string | number
	height?: string | number
	className?: string
}

export function Skeleton({
	variant = "text",
	width,
	height,
	className,
	...props
}: SkeletonProps) {
	const variantStyles: Record<string, string> = {
		text: "h-4 rounded-radius-sm",
		circular: "rounded-full",
		rectangular: "rounded-radius-md",
	}

	const style: React.CSSProperties = {}
	if (width) style.width = typeof width === "number" ? `${width}px` : width
	if (height) style.height = typeof height === "number" ? `${height}px` : height

	return (
		<div
			className={twMerge(
				clsx("animate-animate-pulse bg-surface-2", variantStyles[variant], {
					"w-full": !width,
					"size-12": variant === "circular" && !width && !height,
					"h-24": variant === "rectangular" && !height,
				}),
				className,
			)}
			style={style}
			aria-busy="true"
			aria-live="polite"
			{...props}
		/>
	)
}
