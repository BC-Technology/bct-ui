import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof BaseButton> {
	variant?: "primary" | "secondary" | "tertiary" | "text" | "icon"
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
		"inline-flex items-center justify-center gap-2 font-medium transition-all duration-200",
		"outline-none ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
	)

	const variantStyles = {
		primary: clsx(
			"bg-primary text-primary-on",
			"hover:bg-primary-hover",
			"active:bg-primary-focus",
		),
		secondary: clsx(
			"bg-secondary text-secondary-on",
			"hover:bg-secondary-hover",
			"active:bg-secondary-focus",
		),
		tertiary: clsx(
			"border border-border bg-tertiary text-tertiary-on",
			"hover:border-border-hover hover:bg-tertiary-hover",
			"active:bg-tertiary-focus",
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

	const sizeStyles = {
		sm:
			variant === "icon"
				? "h-8 w-8 p-0"
				: "h-8 px-3 text-text-sm rounded-radius-sm",
		md:
			variant === "icon"
				? "h-10 w-10 p-0"
				: "h-10 px-4 text-text-base rounded-radius-md",
		lg:
			variant === "icon"
				? "h-12 w-12 p-0"
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
