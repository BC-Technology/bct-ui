import { Radio as BaseRadio } from "@base-ui/react/radio"
import clsx from "clsx"
import { Circle, CircleCheck } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface RadioProps
	extends React.ComponentPropsWithoutRef<typeof BaseRadio.Root> {
	label?: string
	variant?: "inline" | "card"
	checked?: boolean
	className?: string
	classNames?: {
		root?: string
		radio?: string
		indicator?: string
		label?: string
	}
}

export function Radio({
	label,
	variant = "inline",
	checked,
	className,
	classNames,
	disabled,
	...props
}: RadioProps) {
	if (variant === "card") {
		return (
			<BaseRadio.Root
				disabled={disabled}
				className={twMerge(
					clsx(
						"relative flex w-full cursor-pointer items-center gap-3 rounded-radius-md border px-3 py-2.5 transition-all duration-200",
						"outline-none ring-offset-2 ring-offset-background",
						"focus-visible:ring-2 focus-visible:ring-primary-focus",
						"disabled:cursor-not-allowed disabled:opacity-50",
						"data-checked:border-primary data-checked:bg-primary-muted",
						"border-border bg-surface-1 hover:border-border-hover hover:bg-surface-1-hover",
					),
					classNames?.root,
					className,
				)}
				{...props}
			>
				<div className={twMerge("shrink-0", classNames?.indicator)}>
					{checked ? (
						<CircleCheck className="size-4 text-primary transition-all" />
					) : (
						<Circle className="size-4 text-typography-muted" />
					)}
				</div>
				{label && (
					<span
						className={twMerge(
							"select-none text-text-base text-typography-primary",
							classNames?.label,
						)}
					>
						{label}
					</span>
				)}
			</BaseRadio.Root>
		)
	}

	return (
		<div
			className={twMerge(
				"inline-flex items-center gap-2",
				classNames?.root,
				className,
			)}
		>
			<BaseRadio.Root
				disabled={disabled}
				className={twMerge(
					clsx(
						"flex size-5 cursor-pointer items-center justify-center rounded-full border bg-surface-1 transition-all duration-200",
						"outline-none ring-offset-2 ring-offset-background",
						"focus-visible:ring-2 focus-visible:ring-primary-focus",
						"disabled:cursor-not-allowed disabled:opacity-50",
						"border-border hover:border-border-hover",
					),
					classNames?.radio,
				)}
				{...props}
			>
				<div
					className={twMerge(
						"flex shrink-0 items-center",
						classNames?.indicator,
					)}
				>
					{checked ? (
						<CircleCheck className="size-4 text-primary transition-all" />
					) : (
						<Circle className="size-4 text-typography-muted" />
					)}
				</div>
			</BaseRadio.Root>
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
	)
}
