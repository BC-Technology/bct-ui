import clsx from "clsx"
import { useId } from "react"
import { twMerge } from "tailwind-merge"

export interface ColorPickerProps {
	value: string
	onChange: (value: string) => void
	label?: string
	placeholder?: string
	error?: string
	helperText?: string
	disabled?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		inputWrapper?: string
		colorInput?: string
		textInput?: string
		error?: string
		helperText?: string
	}
}

export function ColorPicker({
	label,
	value,
	onChange,
	placeholder = "Select a color",
	error,
	helperText,
	disabled = false,
	className,
	classNames,
}: ColorPickerProps) {
	const inputId = useId()

	const textInputStyles = clsx(
		"h-10 flex-1 rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary placeholder:text-typography-muted",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
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

			<div
				className={twMerge("flex items-center gap-2", classNames?.inputWrapper)}
			>
				<input
					type="color"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onInput={(e) => onChange((e.target as HTMLInputElement).value)}
					disabled={disabled}
					className={twMerge(
						clsx(
							"h-10 w-10 cursor-pointer rounded-radius-md border border-border p-1 transition-colors hover:border-border-hover",
							{ "cursor-not-allowed opacity-50": disabled },
						),
						classNames?.colorInput,
					)}
					aria-label={`Current color: ${value}. Click to change color.`}
				/>

				<input
					id={inputId}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					disabled={disabled}
					className={twMerge(textInputStyles, classNames?.textInput)}
				/>
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
