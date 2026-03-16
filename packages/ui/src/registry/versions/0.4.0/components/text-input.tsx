"use client"

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
	iconPosition?: "left" | "right"
	onIconClick?: () => void
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
	iconPosition = "right",
	onIconClick,
	className,
	classNames,
	id,
	...props
}: TextInputProps) {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

	const inputStyles = clsx(
		"h-10 w-full rounded-md border bg-surface-1 px-3 py-2",
		"text-base text-typography-primary placeholder:text-typography-muted",
		"outline-none transition-all duration-200 ease-in-out",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted disabled:opacity-50",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
			"pl-10": icon && iconPosition === "left",
			"pr-10": icon && iconPosition === "right",
		},
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1.5", classNames?.root, className)}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={twMerge(
						"font-medium text-sm text-typography-primary",
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
					aria-describedby={
						error
							? `${inputId}-error`
							: helperText
								? `${inputId}-helper`
								: undefined
					}
					{...props}
				/>
				{icon && (
					<button
						type="button"
						className={twMerge(
							"absolute inset-y-0 flex items-center text-typography-muted",
							iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3",
							onIconClick
								? "cursor-pointer hover:text-typography-primary"
								: "pointer-events-none",
							classNames?.icon,
						)}
						onClick={onIconClick}
						tabIndex={onIconClick ? 0 : -1}
						aria-label={onIconClick ? "Icon action" : undefined}
					>
						<div className="h-4 w-4">{icon}</div>
					</button>
				)}
			</div>
			{error && (
				<span
					id={`${inputId}-error`}
					className={twMerge("text-error text-sm", classNames?.error)}
				>
					{error}
				</span>
			)}
			{helperText && !error && (
				<span
					id={`${inputId}-helper`}
					className={twMerge(
						"text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</span>
			)}
		</div>
	)
}
