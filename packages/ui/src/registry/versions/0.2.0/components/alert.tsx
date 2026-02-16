import clsx from "clsx"
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface AlertProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: "info" | "success" | "warning" | "error"
	title?: string
	onClose?: () => void
	className?: string
	classNames?: {
		root?: string
		icon?: string
		content?: string
		title?: string
		description?: string
		closeButton?: string
	}
	children?: React.ReactNode
}

export function Alert({
	variant = "info",
	title,
	onClose,
	className,
	classNames,
	children,
	...props
}: AlertProps) {
	const variantStyles = {
		info: "bg-info-muted border-info text-info-on",
		success: "bg-success-muted border-success text-success-on",
		warning: "bg-warning-muted border-warning text-warning-on",
		error: "bg-error-muted border-error text-error-on",
	}

	const icons = {
		info: Info,
		success: CheckCircle2,
		warning: AlertTriangle,
		error: XCircle,
	}

	const IconComponent = icons[variant]

	return (
		<div
			className={twMerge(
				clsx(
					"relative flex gap-3 rounded-radius-md border p-4",
					variantStyles[variant],
				),
				classNames?.root,
				className,
			)}
			role="alert"
			{...props}
		>
			<div className="flex gap-3">
				<IconComponent
					className={twMerge("size-5 shrink-0", classNames?.icon)}
				/>
			</div>
			<div className={twMerge("flex-1", classNames?.content)}>
				{title && (
					<h5
						className={twMerge(
							"mb-1 font-semibold text-text-base",
							classNames?.title,
						)}
					>
						{title}
					</h5>
				)}
				<div className={twMerge("text-text-sm", classNames?.description)}>
					{children}
				</div>
			</div>
			{onClose && (
				<button
					type="button"
					onClick={onClose}
					className={twMerge(
						"shrink-0 rounded-radius-sm p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10",
						classNames?.closeButton,
					)}
					aria-label="Close"
				>
					<X className="size-4" />
				</button>
			)}
		</div>
	)
}
