import { Progress as BaseProgress } from "@base-ui/react/progress"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ProgressProps
	extends React.ComponentPropsWithoutRef<typeof BaseProgress.Root> {
	label?: string
	showValue?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		track?: string
		indicator?: string
		value?: string
	}
}

export function Progress({
	label,
	showValue = false,
	value,
	className,
	classNames,
	...props
}: ProgressProps) {
	return (
		<div
			className={twMerge("flex flex-col gap-2", classNames?.root, className)}
		>
			<div className="flex items-center justify-between">
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
				{showValue && value !== undefined && (
					<span
						className={twMerge(
							"font-medium text-primary text-text-sm",
							classNames?.value,
						)}
					>
						{value}%
					</span>
				)}
			</div>
			<BaseProgress.Root value={value} {...props}>
				<BaseProgress.Track
					className={twMerge(
						"relative h-2 w-full overflow-hidden rounded-full bg-surface-2",
						classNames?.track,
					)}
				>
					<BaseProgress.Indicator
						className={twMerge(
							"h-full rounded-full bg-primary transition-all duration-500",
							classNames?.indicator,
						)}
						style={{ width: `${value}%` }}
					/>
				</BaseProgress.Track>
			</BaseProgress.Root>
		</div>
	)
}
