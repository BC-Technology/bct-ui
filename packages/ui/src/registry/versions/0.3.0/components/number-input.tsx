import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import clsx from "clsx"
import { Minus, Plus } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface NumberInputProps
	extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {
	label?: string
	error?: string
	helperText?: string
	showButtons?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		inputWrapper?: string
		input?: string
		buttons?: string
		incrementButton?: string
		decrementButton?: string
		error?: string
		helperText?: string
	}
}

export function NumberInput({
	label,
	error,
	helperText,
	showButtons = true,
	className,
	classNames,
	...props
}: NumberInputProps) {
	const inputStyles = clsx(
		"h-10 w-full rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary placeholder:text-typography-muted",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
			"pr-20": showButtons,
		},
	)

	const buttonStyles = clsx(
		"flex h-full items-center justify-center px-3 text-typography-primary transition-colors",
		"hover:bg-surface-2 active:bg-surface-2-hover",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
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
			<BaseNumberField.Root {...props}>
				<div
					className={twMerge(
						"relative flex items-center",
						classNames?.inputWrapper,
					)}
				>
					<BaseNumberField.Input
						className={twMerge(inputStyles, classNames?.input)}
					/>
					{showButtons && (
						<div
							className={twMerge(
								"absolute right-0 flex h-full divide-x divide-border overflow-hidden rounded-r-radius-md border-border border-l",
								classNames?.buttons,
							)}
						>
							<BaseNumberField.Decrement
								className={twMerge(buttonStyles, classNames?.decrementButton)}
							>
								<Minus className="size-4" />
							</BaseNumberField.Decrement>
							<BaseNumberField.Increment
								className={twMerge(buttonStyles, classNames?.incrementButton)}
							>
								<Plus className="size-4" />
							</BaseNumberField.Increment>
						</div>
					)}
				</div>
			</BaseNumberField.Root>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
			{helperText && !error && (
				<span
					className={twMerge(
						"text-text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</span>
			)}
		</div>
	)
}
