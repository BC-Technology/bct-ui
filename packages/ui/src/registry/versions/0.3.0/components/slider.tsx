import { Slider as BaseSlider } from "@base-ui/react/slider"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SliderProps
	extends React.ComponentPropsWithoutRef<typeof BaseSlider.Root> {
	label?: string
	error?: string
	showValue?: boolean
	formatValue?: (value: number | number[]) => string
	className?: string
	classNames?: {
		root?: string
		label?: string
		sliderRoot?: string
		track?: string
		indicator?: string
		thumb?: string
		valueDisplay?: string
		error?: string
	}
}

export function Slider({
	label,
	error,
	showValue = false,
	formatValue,
	className,
	classNames,
	value,
	...props
}: SliderProps) {
	const displayValue = formatValue
		? formatValue(value as number | number[])
		: Array.isArray(value)
			? value.join(" – ")
			: value

	return (
		<div
			className={twMerge("flex flex-col gap-2", classNames?.root, className)}
		>
			<div className="flex items-center justify-between">
				{label && (
					<label
						className={twMerge(
							"font-medium text-text-sm text-typography-primary",
							classNames?.label,
						)}
						htmlFor={props.id}
					>
						{label}
					</label>
				)}
				{showValue && value !== undefined && (
					<span
						className={twMerge(
							"font-medium text-primary text-text-sm",
							classNames?.valueDisplay,
						)}
					>
						{displayValue}
					</span>
				)}
			</div>
			<BaseSlider.Root
				className={twMerge(
					"relative flex items-center py-2",
					classNames?.sliderRoot,
				)}
				value={value}
				{...props}
			>
				<BaseSlider.Track
					className={twMerge(
						"relative h-2 w-full rounded-full bg-surface-2",
						classNames?.track,
					)}
				>
					<BaseSlider.Indicator
						className={twMerge(
							"absolute h-full rounded-full bg-primary",
							classNames?.indicator,
						)}
					/>
				</BaseSlider.Track>
				<BaseSlider.Thumb
					className={twMerge(
						clsx(
							"size-5 rounded-full border-2 border-primary bg-surface-1 shadow-shadow-sm",
							"cursor-grab outline-none transition-all duration-200 active:cursor-grabbing",
							"ring-offset-2 ring-offset-background",
							"focus-visible:ring-2 focus-visible:ring-primary-focus",
							"disabled:cursor-not-allowed disabled:opacity-50",
						),
						classNames?.thumb,
					)}
				/>
			</BaseSlider.Root>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
		</div>
	)
}
