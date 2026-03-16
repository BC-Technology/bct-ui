"use client"

import { Field } from "@base-ui/react/field"
import clsx from "clsx"
import * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TextAreaProps
	extends React.ComponentPropsWithoutRef<"textarea"> {
	label?: string
	error?: string
	helperText?: string
	showCharCount?: boolean
	maxLength?: number
	className?: string
	classNames?: {
		root?: string
		label?: string
		textarea?: string
		error?: string
		helperText?: string
		charCount?: string
	}
}

export function TextArea({
	label,
	error,
	helperText,
	showCharCount = false,
	maxLength,
	className,
	classNames,
	id,
	rows = 4,
	value,
	defaultValue,
	...props
}: TextAreaProps) {
	const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
	const [charCount, setCharCount] = React.useState(
		value?.toString().length || defaultValue?.toString().length || 0,
	)

	const textareaStyles = clsx(
		"min-h-24 w-full resize-y rounded-md border bg-surface-1 px-3 py-2",
		"text-base text-typography-primary placeholder:text-typography-muted",
		"outline-none transition-all duration-200 ease-in-out",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted disabled:opacity-50",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
		},
	)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCharCount(e.target.value.length)
		props.onChange?.(e)
	}

	return (
		<Field.Root
			className={twMerge("flex flex-col gap-1.5", classNames?.root, className)}
			invalid={!!error}
		>
			{label && (
				<Field.Label
					htmlFor={textareaId}
					className={twMerge(
						"font-medium text-sm text-typography-primary",
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
						maxLength={maxLength}
						value={value}
						defaultValue={defaultValue}
						className={twMerge(textareaStyles, classNames?.textarea)}
						aria-describedby={
							error
								? `${textareaId}-error`
								: helperText
									? `${textareaId}-helper`
									: undefined
						}
						onChange={handleChange}
						{...props}
					/>
				}
			/>
			{showCharCount && (
				<div className="flex justify-end">
					<span
						className={twMerge(
							"text-typography-muted text-xs",
							classNames?.charCount,
						)}
					>
						{charCount}
						{maxLength ? ` / ${maxLength}` : ""}
					</span>
				</div>
			)}
			{error && (
				<Field.Error
					id={`${textareaId}-error`}
					className={twMerge("text-error text-sm", classNames?.error)}
				>
					{error}
				</Field.Error>
			)}
			{helperText && !error && (
				<Field.Description
					id={`${textareaId}-helper`}
					className={twMerge(
						"text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</Field.Description>
			)}
		</Field.Root>
	)
}
