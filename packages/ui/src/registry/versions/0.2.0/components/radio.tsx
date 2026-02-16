import { Radio as BaseRadio } from "@base-ui/react/radio"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface RadioProps
	extends React.ComponentPropsWithoutRef<typeof BaseRadio.Root> {
	label?: string
	className?: string
	classNames?: {
		root?: string
		radio?: string
		label?: string
	}
}

export function Radio({ label, className, classNames, ...props }: RadioProps) {
	const radioStyles = clsx(
		"grid size-5 place-content-center rounded-full border bg-surface-1",
		"cursor-pointer outline-none transition-all duration-200",
		"ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	return (
		<div
			className={twMerge(
				"inline-flex items-center gap-2",
				classNames?.root,
				className,
			)}
		>
			<BaseRadio.Root
				className={twMerge(radioStyles, classNames?.radio)}
				{...props}
			>
				<BaseRadio.Indicator className="size-2.5 rounded-full bg-primary" />
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
