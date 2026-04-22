"use client"

import { Field as BaseField } from "@base-ui/react/field"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface FieldProps
	extends React.ComponentPropsWithoutRef<typeof BaseField.Root> {
	label?: string
	helperText?: string
	errorText?: string
	required?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		helperText?: string
		errorText?: string
	}
}

export function Field({
	label,
	helperText,
	errorText,
	required,
	children,
	className,
	classNames,
	...props
}: FieldProps) {
	return (
		<BaseField.Root
			invalid={!!errorText}
			className={twMerge(clsx("flex flex-col gap-1.5"), classNames?.root, className)}
			{...props}
		>
			{label && (
				<BaseField.Label
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
				</BaseField.Label>
			)}
			{children}
			{errorText && (
				<BaseField.Error
					className={twMerge("text-sm text-error", classNames?.errorText)}
				>
					{errorText}
				</BaseField.Error>
			)}
			{helperText && !errorText && (
				<BaseField.Description
					className={twMerge(
						"text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</BaseField.Description>
			)}
		</BaseField.Root>
	)
}
