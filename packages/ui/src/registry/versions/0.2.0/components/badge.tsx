import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info"
	size?: "sm" | "md"
	className?: string
}

export function Badge({
	variant = "primary",
	size = "md",
	className,
	children,
	...props
}: BadgeProps) {
	const variantStyles = {
		primary: "bg-primary text-primary-on",
		secondary: "bg-secondary text-secondary-on",
		success: "bg-success text-success-on",
		warning: "bg-warning text-warning-on",
		error: "bg-error text-error-on",
		info: "bg-info text-info-on",
	}

	const sizeStyles = {
		sm: "px-2 py-0.5 text-text-xs",
		md: "px-2.5 py-1 text-text-sm",
	}

	return (
		<span
			className={twMerge(
				clsx(
					"inline-flex items-center gap-1 rounded-full font-medium",
					variantStyles[variant],
					sizeStyles[size],
				),
				className,
			)}
			{...props}
		>
			{children}
		</span>
	)
}
