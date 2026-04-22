"use client"

import { Switch as BaseSwitch } from "@base-ui/react/switch"
import clsx from "clsx"
import { forwardRef } from "react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
	label?: string
	description?: string
	errorText?: string
	className?: string
	classNames?: {
		root?: string
		indicator?: string
		label?: string
		description?: string
		errorText?: string
	}
}

const trackStyles = clsx(
	"relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
	"border border-border bg-surface-2",
	"transition-colors duration-200 ease-in-out",
	"outline-none focus-visible:ring-2 focus-visible:ring-primary-focus ring-offset-2 ring-offset-background",
	"disabled:cursor-not-allowed disabled:opacity-50",
	"hover:bg-surface-3",
	"data-checked:border-primary data-checked:bg-primary data-checked:hover:bg-primary-hover",
)

const thumbStyles = clsx(
	"pointer-events-none inline-block size-5 rounded-full bg-surface-1 shadow-sm",
	"translate-x-0.5 transition-transform duration-200 ease-in-out",
	"data-checked:translate-x-5",
)

export const Switch = forwardRef<HTMLElement, SwitchProps>(
	(
		{
			label,
			description,
			errorText,
			className,
			classNames,
			...props
		},
		ref,
	) => {
		return (
			<div className={twMerge("flex flex-col gap-1", className)}>
				<div className="flex items-center gap-2">
					<BaseSwitch.Root
						ref={ref}
						className={twMerge(trackStyles, classNames?.root)}
						{...props}
					>
						<BaseSwitch.Thumb
							className={twMerge(thumbStyles, classNames?.indicator)}
						/>
					</BaseSwitch.Root>
					{label && (
						<span
							className={twMerge(
								"text-sm font-medium text-typography-primary",
								classNames?.label,
							)}
						>
							{label}
						</span>
					)}
				</div>
				{errorText && (
					<span
						className={twMerge("text-sm text-error", classNames?.errorText)}
					>
						{errorText}
					</span>
				)}
				{description && !errorText && (
					<span
						className={twMerge(
							"text-sm text-typography-muted",
							classNames?.description,
						)}
					>
						{description}
					</span>
				)}
			</div>
		)
	},
)
Switch.displayName = "Switch"
