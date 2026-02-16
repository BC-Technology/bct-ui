import { Switch as BaseSwitch } from "@base-ui/react/switch"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SwitchProps
	extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root> {
	label?: React.ReactNode
	error?: string
	className?: string
	classNames?: {
		root?: string
		switch?: string
		thumb?: string
		label?: string
		error?: string
	}
}

export function Switch({
	label,
	error,
	className,
	classNames,
	...props
}: SwitchProps) {
	const switchStyles = clsx(
		"relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200",
		"outline-none ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"bg-surface-2",
		"data-[state=checked]:bg-primary",
	)

	const thumbStyles = clsx(
		"pointer-events-none inline-block size-5 rounded-full bg-surface-1 shadow-shadow-sm transition-transform duration-200",
		"translate-x-0.5",
		"data-[state=checked]:translate-x-5",
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			<div className="inline-flex items-center gap-2">
				<BaseSwitch.Root
					className={twMerge(switchStyles, classNames?.switch)}
					{...props}
				>
					<BaseSwitch.Thumb
						className={twMerge(thumbStyles, classNames?.thumb)}
					/>
				</BaseSwitch.Root>
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
