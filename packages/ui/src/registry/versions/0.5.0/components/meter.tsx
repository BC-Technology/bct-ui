"use client"
import { Meter as BaseMeter } from "@base-ui/react/meter"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface MeterProps
	extends React.ComponentPropsWithoutRef<typeof BaseMeter.Root> {
	value: number
	min?: number
	max?: number
	label?: string
	className?: string
	classNames?: {
		root?: string
		indicator?: string
		label?: string
	}
}

export function Meter({
	value,
	min = 0,
	max = 100,
	label,
	className,
	classNames,
	...props
}: MeterProps) {
	return (
		<div className="flex flex-col gap-1">
			{label != null && (
				<BaseMeter.Label
					className={twMerge(
						clsx("text-sm text-typography-secondary"),
						classNames?.label,
					)}
				>
					{label}
				</BaseMeter.Label>
			)}
			<BaseMeter.Root
				value={value}
				min={min}
				max={max}
				aria-label={label == null ? "Meter" : undefined}
				className={twMerge(
					clsx("relative h-3 w-full overflow-hidden rounded-full bg-surface-2"),
					classNames?.root,
					className,
				)}
				{...props}
			>
				<BaseMeter.Track className="size-full">
					<BaseMeter.Indicator
						className={twMerge(
							clsx("h-full rounded-full bg-primary"),
							classNames?.indicator,
						)}
					/>
				</BaseMeter.Track>
			</BaseMeter.Root>
		</div>
	)
}
