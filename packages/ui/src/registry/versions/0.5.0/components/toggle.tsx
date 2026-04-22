"use client"

import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import clsx from "clsx"
import { forwardRef } from "react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ToggleProps
	extends React.ComponentPropsWithoutRef<typeof BaseToggle> {
	variant?: "default" | "outline" | "ghost"
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
	default: clsx(
		"border border-transparent bg-transparent text-typography-primary",
		"hover:bg-surface-1-hover",
		"data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-on",
	),
	outline: clsx(
		"border border-border bg-transparent text-typography-primary",
		"hover:border-border-hover hover:bg-surface-1-hover",
		"data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-on",
	),
	ghost: clsx(
		"border border-transparent bg-transparent text-typography-primary",
		"hover:bg-surface-1-hover",
		"data-pressed:bg-surface-2 data-pressed:text-typography-primary",
	),
}

const SIZE_STYLES: Record<string, string> = {
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-4 text-base",
	lg: "h-12 px-6 text-lg",
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	(
		{ variant = "default", size = "md", className, classNames, children, ...props },
		ref,
	) => {
		return (
			<BaseToggle
				ref={ref}
				className={twMerge(
					BASE_STYLES,
					VARIANT_STYLES[variant],
					SIZE_STYLES[size],
					classNames?.root,
					className,
				)}
				{...props}
			>
				{children}
			</BaseToggle>
		)
	},
)
Toggle.displayName = "Toggle"
