"use client"
import { Progress as BaseProgress } from "@base-ui/react/progress"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ProgressProps
	extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
	/**
	 * Current progress value (0–max). Pass `null` for indeterminate (animated) state.
	 * Omitting this prop also produces the indeterminate state.
	 * @default null
	 */
	value?: number | null
	min?: number
	max?: number
	label?: string
	className?: string
	classNames?: {
		root?: string
		indicator?: string
	}
}

export function Progress({
	value = null,
	min = 0,
	max = 100,
	label,
	className,
	classNames,
	...props
}: ProgressProps) {
	return (
		<BaseProgress.Root
			value={value}
			min={min}
			max={max}
			aria-label={label}
			className={twMerge(
				clsx("relative h-2 w-full overflow-hidden rounded-full bg-border"),
				classNames?.root,
				className,
			)}
			{...props}
		>
			<BaseProgress.Track className="size-full">
				<BaseProgress.Indicator
					className={twMerge(
						clsx(
							"h-full rounded-full bg-primary transition-all duration-300 ease-in-out",
							{
								"bct-progress-indeterminate": value === null,
							},
						),
						classNames?.indicator,
					)}
				/>
			</BaseProgress.Track>
		</BaseProgress.Root>
	)
}
