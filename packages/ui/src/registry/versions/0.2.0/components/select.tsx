import { Select as BaseSelect } from "@base-ui/react/select"
import clsx from "clsx"
import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SelectOption {
	value: string
	label: string
	disabled?: boolean
}

export interface SelectProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseSelect.Root>,
		"children"
	> {
	options: SelectOption[]
	placeholder?: string
	label?: string
	error?: string
	className?: string
	classNames?: {
		root?: string
		label?: string
		trigger?: string
		popup?: string
		option?: string
		error?: string
	}
}

export function Select({
	options,
	placeholder = "Select an option",
	label,
	error,
	className,
	classNames,
	...props
}: SelectProps) {
	const triggerStyles = clsx(
		"flex w-full items-center justify-between gap-2 rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": error,
		},
	)

	const popupStyles = clsx(
		"z-50 max-h-60 overflow-auto rounded-radius-md border border-border bg-surface-1 p-1 shadow-shadow-lg",
	)

	const optionStyles = clsx(
		"cursor-pointer rounded-radius-sm px-3 py-2 text-text-base text-typography-primary outline-none transition-colors",
		"hover:bg-surface-2",
		"focus-visible:bg-surface-2",
		"data-[selected]:bg-primary data-[selected]:text-primary-on",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			{label && (
				<span
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</span>
			)}
			<BaseSelect.Root {...props}>
				<BaseSelect.Trigger
					className={twMerge(triggerStyles, classNames?.trigger)}
				>
					<BaseSelect.Value placeholder={placeholder} />
					<BaseSelect.Icon className="ml-auto">
						<ChevronDown className="size-4" />
					</BaseSelect.Icon>
				</BaseSelect.Trigger>
				<BaseSelect.Portal>
					<BaseSelect.Positioner sideOffset={4}>
						<BaseSelect.Popup
							className={twMerge(popupStyles, classNames?.popup)}
						>
							{options.map((option) => (
								<BaseSelect.Item
									key={option.value}
									value={option.value}
									disabled={option.disabled}
									className={twMerge(optionStyles, classNames?.option)}
								>
									{option.label}
								</BaseSelect.Item>
							))}
						</BaseSelect.Popup>
					</BaseSelect.Positioner>
				</BaseSelect.Portal>
			</BaseSelect.Root>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
		</div>
	)
}
