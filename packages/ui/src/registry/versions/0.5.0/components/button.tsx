import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof BaseButton> {
	variant?:
		| "primary"
		| "secondary"
		| "tertiary"
		| "error"
		| "success"
		| "warning"
		| "info"
		| "text"
		| "icon"
	size?: "sm" | "md" | "lg"
	className?: string
	classNames?: {
		root?: string
	}
}

const BASE_STYLES = clsx(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-in-out",
	"outline-none ring-offset-2 ring-offset-background",
	"focus-visible:ring-2 focus-visible:ring-primary-focus",
	"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
)

const VARIANT_STYLES: Record<string, string> = {
	primary: clsx(
		"bg-primary text-primary-on shadow-sm",
		"hover:bg-primary-hover",
		"active:scale-[0.98] active:bg-primary-focus",
	),
	secondary: clsx(
		"bg-secondary text-secondary-on shadow-sm",
		"hover:bg-secondary-hover",
		"active:scale-[0.98] active:bg-secondary-focus",
	),
	tertiary: clsx(
		"border border-border bg-tertiary text-tertiary-on",
		"hover:border-border-hover hover:bg-tertiary-hover",
		"active:scale-[0.98] active:bg-tertiary-focus",
	),
	error: clsx(
		"bg-error text-error-on shadow-sm",
		"hover:bg-error-hover",
		"active:scale-[0.98] active:bg-error-hover",
	),
	success: clsx(
		"bg-success text-success-on shadow-sm",
		"hover:bg-success-hover",
		"active:scale-[0.98] active:bg-success-hover",
	),
	warning: clsx(
		"bg-warning text-warning-on shadow-sm",
		"hover:bg-warning-hover",
		"active:scale-[0.98] active:bg-warning-hover",
	),
	info: clsx(
		"bg-info text-info-on shadow-sm",
		"hover:bg-info-hover",
		"active:scale-[0.98] active:bg-info-hover",
	),
	text: clsx(
		"text-typography-primary",
		"hover:bg-surface-1-hover",
		"active:scale-[0.98] active:bg-surface-1-hover",
	),
	icon: clsx(
		"text-typography-primary",
		"hover:bg-surface-1-hover",
		"active:scale-[0.98] active:bg-surface-1-hover",
	),
}

export function Button({
	className,
	classNames,
	variant = "primary",
	size = "md",
	children,
	...props
}: ButtonProps) {
	const sizeStyles: Record<string, string> = {
		sm: variant === "icon" ? "h-8 w-8 p-0" : "h-8 px-3 text-sm",
		md: variant === "icon" ? "h-10 w-10 p-0" : "h-10 px-4 text-base",
		lg: variant === "icon" ? "h-12 w-12 p-0" : "h-12 px-6 text-lg",
	}

	return (
		<BaseButton
			className={twMerge(
				BASE_STYLES,
				VARIANT_STYLES[variant],
				sizeStyles[size],
				classNames?.root,
				className,
			)}
			{...props}
		>
			{children}
		</BaseButton>
	)
}
