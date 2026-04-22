"use client"

import { Field } from "@base-ui/react/field"
import clsx from "clsx"
import { forwardRef, useId, useState } from "react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TextAreaProps
	extends Omit<
		React.ComponentPropsWithoutRef<"textarea">,
		"size"
	> {
	label?: string
	helperText?: string
	errorText?: string
	required?: boolean
	size?: "sm" | "md" | "lg"
	rows?: number
	maxLength?: number
	showCharCount?: boolean
	className?: string
	/**
	 * Per-slot class overrides.
	 * @example resize override: classNames={{ content: 'resize-none' }}
	 */
	classNames?: {
		root?: string
		label?: string
		/** Styles the native <textarea> element. Use to override resize: e.g. 'resize-none' or 'resize-y'. */
		content?: string
		helperText?: string
		errorText?: string
	}
}

const TEXTAREA_BASE = clsx(
	"w-full rounded-md border border-border bg-surface-1 text-typography-primary text-base",
	"placeholder:text-typography-muted",
	"transition-colors duration-150",
	"outline-none focus:border-primary focus:ring-2 focus:ring-primary-focus",
	"disabled:bg-surface-1-disabled disabled:text-typography-muted disabled:opacity-50 disabled:cursor-not-allowed",
	"aria-invalid:border-error aria-invalid:focus:ring-error",
	"resize-y min-h-24 px-3 py-2",
)

const SIZE_PADDING: Record<string, string> = {
	sm: "px-2 py-1.5 text-sm",
	md: "px-3 py-2 text-base",
	lg: "px-4 py-3 text-lg",
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(
		{
			label,
			helperText,
			errorText,
			required,
			size = "md",
			rows = 4,
			maxLength,
			showCharCount = false,
			id: idProp,
			className,
			classNames,
			onChange,
			...props
		},
		ref,
	) => {
		const generatedId = useId()
		const textareaId = idProp ?? generatedId
		const errorId = `${textareaId}-error`
		const helperId = `${textareaId}-helper`

		const [charCount, setCharCount] = useState(() => {
			const initial = props.defaultValue ?? props.value ?? ""
			return typeof initial === "string" ? initial.length : 0
		})

		const isControlled = props.value !== undefined
		const displayCount =
			isControlled && typeof props.value === "string"
				? props.value.length
				: charCount

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setCharCount(e.target.value.length)
			onChange?.(e)
		}

		return (
			<Field.Root
				invalid={!!errorText}
				className={twMerge(clsx("flex flex-col gap-1.5"), classNames?.root, className)}
			>
				{label && (
					<Field.Label
						className={twMerge(
							"text-sm font-medium text-typography-primary",
							classNames?.label,
						)}
					>
						{label}
						{required && (
							<span aria-hidden="true" className="ml-1 text-error">
								*
							</span>
						)}
					</Field.Label>
				)}
				<Field.Control
					render={
						<textarea
							ref={ref}
							id={textareaId}
							rows={rows}
							maxLength={maxLength}
							aria-invalid={!!errorText || undefined}
							aria-describedby={
								errorText ? errorId : helperText ? helperId : undefined
							}
							className={twMerge(
								TEXTAREA_BASE,
								SIZE_PADDING[size],
								classNames?.content,
							)}
							onChange={handleChange}
							{...props}
						/>
					}
				/>
				{showCharCount && (
					<span aria-live="polite" className="text-xs text-typography-muted">
						{maxLength ? `${displayCount} / ${maxLength}` : `${displayCount}`}
					</span>
				)}
				{errorText && (
					<Field.Error
						id={errorId}
						match={true}
						className={twMerge("text-sm text-error", classNames?.errorText)}
					>
						{errorText}
					</Field.Error>
				)}
				{helperText && !errorText && (
					<Field.Description
						id={helperId}
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
	},
)
TextArea.displayName = "TextArea"
