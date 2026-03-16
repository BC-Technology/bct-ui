import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface CheckboxProps
	extends React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root> {
	label?: React.ReactNode
	error?: string
	className?: string
	classNames?: {
		root?: string
		checkbox?: string
		indicator?: string
		label?: string
		error?: string
	}
}

export function Checkbox({
	label,
	error,
	className,
	classNames,
	...props
}: CheckboxProps) {
	const checkboxStyles = clsx(
		"grid size-5 place-content-center rounded-radius-sm border bg-surface-1",
		"cursor-pointer outline-none transition-all duration-200",
		"ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:opacity-50",
		{
			"border-border hover:border-border-hover": !error,
			"border-error": error,
		},
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			<div className="inline-flex items-center gap-2">
				<BaseCheckbox.Root
					className={twMerge(checkboxStyles, classNames?.checkbox)}
					{...props}
				>
					<BaseCheckbox.Indicator
						className={twMerge(
							"size-3 rounded-radius-sm bg-primary",
							classNames?.indicator,
						)}
						keepMounted
					/>
				</BaseCheckbox.Root>
				{label && (
					<span
						className={twMerge(
							"cursor-pointer select-none text-text-base text-typography-primary",
							classNames?.label,
						)}
					>
						{label}
					</span>
				)}
			</div>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
		</div>
	)
}
