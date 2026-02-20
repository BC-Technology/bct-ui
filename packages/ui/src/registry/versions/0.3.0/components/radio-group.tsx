import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface RadioGroupProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseRadioGroup>,
		"children"
	> {
	label?: string
	error?: string
	orientation?: "horizontal" | "vertical"
	variant?: "inline" | "card"
	className?: string
	classNames?: {
		root?: string
		label?: string
		group?: string
		error?: string
	}
	children?: React.ReactNode
}

export function RadioGroup({
	label,
	error,
	orientation = "vertical",
	variant = "inline",
	className,
	classNames,
	children,
	...props
}: RadioGroupProps) {
	const groupStyles = clsx("flex gap-2", {
		"flex-col": orientation === "vertical",
		"flex-row flex-wrap": orientation === "horizontal",
	})

	return (
		<div
			className={twMerge("flex flex-col gap-2", classNames?.root, className)}
		>
			{label && (
				<span
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</span>
			)}
			<BaseRadioGroup
				className={twMerge(groupStyles, classNames?.group)}
				{...props}
			>
				{children}
			</BaseRadioGroup>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
		</div>
	)
}
