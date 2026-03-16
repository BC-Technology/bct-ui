import { Input as BaseInput } from "@base-ui/react/input"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TextInputProps
	extends React.ComponentPropsWithoutRef<typeof BaseInput> {
	label?: string
	error?: string
	helperText?: string
	icon?: React.ReactNode
	iconClickable?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		inputWrapper?: string
		input?: string
		icon?: string
		error?: string
		helperText?: string
	}
}

export function TextInput({
	label,
	error,
	helperText,
	icon,
	iconClickable = false,
	className,
	classNames,
	id,
	...props
}: TextInputProps) {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

	const inputStyles = clsx(
		"h-10 w-full rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary placeholder:font-light placeholder:text-typography-muted",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
			"pr-10": !!icon,
		},
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</label>
			)}
			<div className={twMerge("relative", classNames?.inputWrapper)}>
				<BaseInput
					id={inputId}
					className={twMerge(inputStyles, classNames?.input)}
					aria-invalid={!!error}
					{...props}
				/>
				{icon && (
					<div
						className={twMerge(
							"absolute inset-y-0 right-0 flex items-center pr-3 text-typography-muted",
							!iconClickable ? "pointer-events-none" : "",
							classNames?.icon,
						)}
					>
						<div className="size-4">{icon}</div>
					</div>
				)}
			</div>
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
