import { Field } from "@base-ui/react/field"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TextAreaProps
	extends React.ComponentPropsWithoutRef<"textarea"> {
	label?: string
	error?: string
	helperText?: string
	className?: string
	classNames?: {
		root?: string
		label?: string
		textarea?: string
		error?: string
		helperText?: string
	}
}

export function TextArea({
	label,
	error,
	helperText,
	className,
	classNames,
	id,
	rows = 4,
	...props
}: TextAreaProps) {
	const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`

	const textareaStyles = clsx(
		"min-h-24 w-full resize-y rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary placeholder:font-light placeholder:text-typography-muted",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
		},
	)

	return (
		<Field.Root
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
			invalid={!!error}
		>
			{label && (
				<Field.Label
					htmlFor={textareaId}
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</Field.Label>
			)}
			<Field.Control
				render={
					<textarea
						id={textareaId}
						rows={rows}
						className={twMerge(textareaStyles, classNames?.textarea)}
						{...props}
					/>
				}
			/>
			{error && (
				<Field.Error
					className={twMerge("text-error text-text-sm", classNames?.error)}
				>
					{error}
				</Field.Error>
			)}
			{helperText && !error && (
				<Field.Description
					className={twMerge(
						"text-text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</Field.Description>
			)}
		</Field.Root>
	)
}
