import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	variant?:
		| "default"
		| "primary"
		| "primary-muted"
		| "secondary"
		| "secondary-muted"
		| "tertiary"
		| "tertiary-muted"
		| "success"
		| "success-muted"
		| "warning"
		| "warning-muted"
		| "error"
		| "error-muted"
		| "info"
		| "info-muted"
		| "neutral"
	size?: "sm" | "md" | "lg"
	className?: string
}

export function Badge({
	variant = "default",
	size = "md",
	className,
	children,
	...props
}: BadgeProps) {
	const variantStyles: Record<string, string> = {
		default: "bg-surface-2 border border-border text-typography-primary",
		primary: "bg-primary text-primary-on",
		"primary-muted":
			"bg-primary-muted border border-primary text-typography-primary",
		secondary: "bg-secondary text-secondary-on",
		"secondary-muted":
			"bg-secondary-muted border border-secondary text-typography-primary",
		tertiary: "bg-tertiary border border-border text-tertiary-on",
		"tertiary-muted":
			"bg-tertiary-muted border border-border text-typography-primary",
		success: "bg-success text-success-on",
		"success-muted":
			"bg-success-muted border border-success text-typography-primary",
		warning: "bg-warning text-warning-on",
		"warning-muted":
			"bg-warning-muted border border-warning text-typography-primary",
		error: "bg-error text-error-on",
		"error-muted": "bg-error-muted border border-error text-typography-primary",
		info: "bg-info text-info-on",
		"info-muted": "bg-info-muted border border-info text-typography-primary",
		neutral: "bg-neutral-muted border border-neutral text-typography-primary",
	}

	const sizeStyles: Record<string, string> = {
		sm: "px-2 py-0.5 text-text-xs",
		md: "px-2.5 py-1 text-text-sm",
		lg: "px-3 py-1.5 text-text-base",
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
