import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof BaseButton> {
	variant?:
		| "primary"
		| "primary-muted"
		| "secondary"
		| "secondary-muted"
		| "tertiary"
		| "tertiary-muted"
		| "error"
		| "error-muted"
		| "success"
		| "success-muted"
		| "warning"
		| "warning-muted"
		| "info"
		| "info-muted"
		| "text"
		| "icon"
	size?: "sm" | "md" | "lg"
	className?: string
}

export function Button({
	className,
	variant = "primary",
	size = "md",
	children,
	...props
}: ButtonProps) {
	const baseStyles = clsx(
		"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200",
		"outline-none ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	)

	const variantStyles: Record<string, string> = {
		primary: clsx(
			"bg-primary text-primary-on",
			"hover:bg-primary-hover",
			"active:bg-primary-focus",
		),
		"primary-muted": clsx(
			"bg-primary-muted text-typography-primary",
			"hover:bg-primary-muted-hover",
			"active:bg-primary-muted-hover",
		),
		secondary: clsx(
			"bg-secondary text-secondary-on",
			"hover:bg-secondary-hover",
			"active:bg-secondary-focus",
		),
		"secondary-muted": clsx(
			"bg-secondary-muted text-typography-primary",
			"hover:bg-secondary-muted-hover",
			"active:bg-secondary-muted-hover",
		),
		tertiary: clsx(
			"border border-border bg-tertiary text-tertiary-on",
			"hover:border-border-hover hover:bg-tertiary-hover",
			"active:bg-tertiary-focus",
		),
		"tertiary-muted": clsx(
			"border border-border bg-tertiary-muted text-typography-primary",
			"hover:border-border-hover hover:bg-tertiary-muted-hover",
			"active:bg-tertiary-focus",
		),
		error: clsx(
			"bg-error text-error-on",
			"hover:bg-error-hover",
			"active:bg-error-hover",
		),
		"error-muted": clsx(
			"bg-error-muted text-typography-primary",
			"hover:bg-error-muted-hover",
			"active:bg-error-muted-hover",
		),
		success: clsx(
			"bg-success text-success-on",
			"hover:bg-success-hover",
			"active:bg-success-hover",
		),
		"success-muted": clsx(
			"bg-success-muted text-typography-primary",
			"hover:bg-success-muted-hover",
			"active:bg-success-muted-hover",
		),
		warning: clsx(
			"bg-warning text-warning-on",
			"hover:bg-warning-hover",
			"active:bg-warning-hover",
		),
		"warning-muted": clsx(
			"bg-warning-muted text-typography-primary",
			"hover:bg-warning-muted-hover",
			"active:bg-warning-muted-hover",
		),
		info: clsx(
			"bg-info text-info-on",
			"hover:bg-info-hover",
			"active:bg-info-hover",
		),
		"info-muted": clsx(
			"bg-info-muted text-typography-primary",
			"hover:bg-info-muted-hover",
			"active:bg-info-muted-hover",
		),
		text: clsx(
			"bg-transparent text-primary",
			"hover:bg-primary-muted",
			"active:bg-primary-muted-hover",
		),
		icon: clsx(
			"bg-transparent text-typography-primary",
			"hover:bg-surface-1-hover",
			"active:bg-surface-1-focus",
		),
	}

	const sizeStyles: Record<string, string> = {
		sm:
			variant === "icon"
				? "h-8 w-8 rounded-radius-sm p-0"
				: "h-8 px-3 text-text-sm rounded-radius-sm",
		md:
			variant === "icon"
				? "h-10 w-10 rounded-radius-md p-0"
				: "h-10 px-4 text-text-base rounded-radius-md",
		lg:
			variant === "icon"
				? "h-12 w-12 rounded-radius-lg p-0"
				: "h-12 px-6 text-text-lg rounded-radius-lg",
	}

	return (
		<BaseButton
			className={twMerge(
				baseStyles,
				variantStyles[variant],
				sizeStyles[size],
				className,
			)}
			{...props}
		>
			{children}
		</BaseButton>
	)
}
