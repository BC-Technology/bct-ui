"use client"

import { Input as BaseInput } from "@base-ui/react/input"
import { Field } from "@base-ui/react/field"
import clsx from "clsx"
import { forwardRef, useId } from "react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface InputProps
	extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "size"> {
	label?: string
	helperText?: string
	errorText?: string
	required?: boolean
	size?: "sm" | "md" | "lg"
	icon?: React.ReactNode
	iconPosition?: "left" | "right"
	onIconClick?: () => void
	iconLabel?: string
	className?: string
	classNames?: {
		root?: string
		label?: string
		content?: string
		icon?: string
		helperText?: string
		errorText?: string
	}
}

const SIZE_STYLES: Record<string, string> = {
	sm: "h-8 px-3 text-sm",
	md: "h-10 px-3 text-base",
	lg: "h-12 px-4 text-lg",
}

const INPUT_BASE = clsx(
	"w-full rounded-md border border-border bg-surface-1 text-typography-primary",
	"placeholder:text-typography-muted",
	"transition-colors duration-150",
	"outline-none focus:border-primary focus:ring-2 focus:ring-primary-focus",
	"disabled:bg-surface-1-disabled disabled:text-typography-muted disabled:opacity-50 disabled:cursor-not-allowed",
	"aria-invalid:border-error aria-invalid:focus:ring-error",
)

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			helperText,
			errorText,
			required,
			size = "md",
			icon,
			iconPosition = "right",
			onIconClick,
			iconLabel,
			id: idProp,
			className,
			classNames,
			...props
		},
		ref,
	) => {
		const generatedId = useId()
		const inputId = idProp ?? generatedId
		const errorId = `${inputId}-error`
		const helperId = `${inputId}-helper`

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
				<div className="relative">
					<BaseInput
						ref={ref}
						id={inputId}
						className={twMerge(
							INPUT_BASE,
							SIZE_STYLES[size],
							icon && iconPosition === "left" && "pl-10",
							icon && iconPosition === "right" && "pr-10",
							classNames?.content,
						)}
						{...props}
					/>
					{icon && (
						<span
							aria-label={onIconClick ? (iconLabel ?? "Icon action") : undefined}
							className={twMerge(
								clsx(
									"absolute inset-y-0 flex items-center",
									"text-typography-muted",
									"rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
									iconPosition === "left" ? "left-3" : "right-3",
									onIconClick
										? "cursor-pointer"
										: "pointer-events-none",
								),
								classNames?.icon,
							)}
							onClick={onIconClick}
							role={onIconClick ? "button" : undefined}
							tabIndex={onIconClick ? 0 : undefined}
							onKeyDown={
								onIconClick
									? (e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault()
												onIconClick()
											}
										}
									: undefined
							}
						>
							{icon}
						</span>
					)}
				</div>
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
Input.displayName = "Input"
