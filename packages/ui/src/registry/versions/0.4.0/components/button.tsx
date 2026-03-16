"use client"

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
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-in-out",
		"outline-none ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	)

	const variantStyles: Record<string, string> = {
		primary: clsx(
			"bg-primary text-primary-on shadow-sm",
			"hover:bg-primary-hover hover:shadow",
			"active:scale-[0.98] active:bg-primary-focus",
		),
		"primary-muted": clsx(
			"bg-primary-muted text-typography-primary",
			"hover:bg-primary-muted-hover",
			"active:scale-[0.98] active:bg-primary-muted-hover",
		),
		secondary: clsx(
			"bg-secondary text-secondary-on shadow-sm",
			"hover:bg-secondary-hover hover:shadow",
			"active:scale-[0.98] active:bg-secondary-focus",
		),
		"secondary-muted": clsx(
			"bg-secondary-muted text-typography-primary",
			"hover:bg-secondary-muted-hover",
			"active:scale-[0.98] active:bg-secondary-muted-hover",
		),
		tertiary: clsx(
			"border border-border bg-tertiary text-tertiary-on",
			"hover:border-border-hover hover:bg-tertiary-hover",
			"active:scale-[0.98] active:bg-tertiary-focus",
		),
		"tertiary-muted": clsx(
			"border border-border bg-tertiary-muted text-typography-primary",
			"hover:border-border-hover hover:bg-tertiary-muted-hover",
			"active:scale-[0.98] active:bg-tertiary-muted-hover",
		),
		error: clsx(
			"bg-error text-error-on shadow-sm",
			"hover:bg-error-hover hover:shadow",
			"active:scale-[0.98] active:bg-error-hover",
		),
		"error-muted": clsx(
			"bg-error-muted text-typography-primary",
			"hover:bg-error-muted-hover",
			"active:scale-[0.98] active:bg-error-muted-hover",
		),
		success: clsx(
			"bg-success text-success-on shadow-sm",
			"hover:bg-success-hover hover:shadow",
			"active:scale-[0.98] active:bg-success-hover",
		),
		"success-muted": clsx(
			"bg-success-muted text-typography-primary",
			"hover:bg-success-muted-hover",
			"active:scale-[0.98] active:bg-success-muted-hover",
		),
		warning: clsx(
			"bg-warning text-warning-on shadow-sm",
			"hover:bg-warning-hover hover:shadow",
			"active:scale-[0.98] active:bg-warning-hover",
		),
		"warning-muted": clsx(
			"bg-warning-muted text-typography-primary",
			"hover:bg-warning-muted-hover",
			"active:scale-[0.98] active:bg-warning-muted-hover",
		),
		info: clsx(
			"bg-info text-info-on shadow-sm",
			"hover:bg-info-hover hover:shadow",
			"active:scale-[0.98] active:bg-info-hover",
		),
		"info-muted": clsx(
			"bg-info-muted text-typography-primary",
			"hover:bg-info-muted-hover",
			"active:scale-[0.98] active:bg-info-muted-hover",
		),
		text: clsx(
			"text-typography-primary",
			"hover:bg-accent",
			"active:scale-[0.98] active:bg-accent",
		),
		icon: clsx(
			"text-typography-primary",
			"hover:bg-accent",
			"active:scale-[0.98] active:bg-accent",
		),
	}

	const sizeStyles: Record<string, string> = {
		sm: variant === "icon" ? "h-8 w-8 p-0" : "h-8 px-3 text-sm",
		md: variant === "icon" ? "h-10 w-10 p-0" : "h-10 px-4 text-base",
		lg: variant === "icon" ? "h-12 w-12 p-0" : "h-12 px-6 text-lg",
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
