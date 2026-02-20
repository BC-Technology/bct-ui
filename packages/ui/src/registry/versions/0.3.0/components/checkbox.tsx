import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import clsx from "clsx"
import { Square, SquareCheck } from "lucide-react"
import * as React from "react"
import { twMerge } from "tailwind-merge"

export interface CheckboxProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>,
		"checked" | "defaultChecked" | "onCheckedChange"
	> {
	label?: React.ReactNode
	error?: string
	variant?: "inline" | "card"
	checked?: boolean
	defaultChecked?: boolean
	onCheckedChange?: (checked: boolean) => void
	className?: string
	classNames?: {
		root?: string
		checkbox?: string
		indicator?: string
		label?: string
		error?: string
	}
}

export function Checkbox({
	label,
	error,
	variant = "inline",
	checked,
	defaultChecked,
	onCheckedChange,
	className,
	classNames,
	disabled,
	...props
}: CheckboxProps) {
	const isControlled = checked !== undefined
	const [internalChecked, setInternalChecked] = React.useState(
		defaultChecked ?? false,
	)
	const resolvedChecked = isControlled ? checked : internalChecked

	const handleCheckedChange = (value: boolean) => {
		if (!isControlled) setInternalChecked(value)
		onCheckedChange?.(value)
	}

	if (variant === "card") {
		return (
			<div
				className={twMerge("flex flex-col gap-1", classNames?.root, className)}
			>
				<BaseCheckbox.Root
					checked={resolvedChecked}
					onCheckedChange={handleCheckedChange}
					disabled={disabled}
					className={twMerge(
						clsx(
							"relative flex w-full cursor-pointer items-center gap-3 rounded-radius-md border px-3 py-2.5 transition-all duration-200",
							"outline-none ring-offset-2 ring-offset-background",
							"focus-visible:ring-2 focus-visible:ring-primary-focus",
							"disabled:cursor-not-allowed disabled:opacity-50",
							{
								"border-primary bg-primary-muted": resolvedChecked,
								"border-border bg-surface-1 hover:border-border-hover hover:bg-surface-1-hover":
									!resolvedChecked,
							},
						),
						classNames?.checkbox,
					)}
					{...props}
				>
					<div className={twMerge("shrink-0", classNames?.indicator)}>
						{resolvedChecked ? (
							<SquareCheck className="size-4 text-primary transition-all" />
						) : (
							<Square className="size-4 text-typography-muted" />
						)}
					</div>
					{label && (
						<span
							className={twMerge(
								"select-none text-text-base text-typography-primary",
								classNames?.label,
							)}
						>
							{label}
						</span>
					)}
				</BaseCheckbox.Root>
				{error && (
					<span
						className={twMerge("text-error text-text-sm", classNames?.error)}
					>
						{error}
					</span>
				)}
			</div>
		)
	}

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			<div className="inline-flex items-center gap-2">
				<BaseCheckbox.Root
					checked={resolvedChecked}
					onCheckedChange={handleCheckedChange}
					disabled={disabled}
					className={twMerge(
						clsx(
							"flex size-5 cursor-pointer items-center justify-center rounded-radius-sm border bg-surface-1 transition-all duration-200",
							"outline-none ring-offset-2 ring-offset-background",
							"focus-visible:ring-2 focus-visible:ring-primary-focus",
							"disabled:cursor-not-allowed disabled:opacity-50",
							{
								"border-border hover:border-border-hover": !error,
								"border-error": !!error,
							},
						),
						classNames?.checkbox,
					)}
					{...props}
				>
					<div
						className={twMerge(
							"flex shrink-0 items-center",
							classNames?.indicator,
						)}
					>
						{resolvedChecked ? (
							<SquareCheck className="size-4 text-primary transition-all" />
						) : (
							<Square className="size-4 text-typography-muted" />
						)}
					</div>
				</BaseCheckbox.Root>
				{label && (
					<span
						className={twMerge(
							"cursor-pointer select-none text-text-base text-typography-primary",
							classNames?.label,
						)}
					>
						{label}
					</span>
				)}
			</div>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
		</div>
	)
}
