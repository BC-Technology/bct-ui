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
	const variantStyles: Record<string, string> = {
		info: "bg-info-muted border-info",
		success: "bg-success-muted border-success",
		warning: "bg-warning-muted border-warning",
		error: "bg-error-muted border-error",
	}

	const iconColorStyles: Record<string, string> = {
		info: "text-info",
		success: "text-success",
		warning: "text-warning",
		error: "text-error",
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
			<IconComponent
				className={twMerge(
					clsx("mt-0.5 size-5 shrink-0", iconColorStyles[variant]),
					classNames?.icon,
				)}
			/>
			<div className={twMerge("flex-1", classNames?.content)}>
				{title && (
					<h5
						className={twMerge(
							"mb-1 font-semibold text-text-base text-typography-primary",
							classNames?.title,
						)}
					>
						{title}
					</h5>
				)}
				<div
					className={twMerge(
						"text-text-sm text-typography-secondary",
						classNames?.description,
					)}
				>
					{children}
				</div>
			</div>
			{onClose && (
				<button
					type="button"
					onClick={onClose}
					className={twMerge(
						clsx(
							"shrink-0 rounded-radius-sm p-1 text-typography-muted transition-colors",
							"hover:bg-black/10 hover:text-typography-primary dark:hover:bg-white/10",
						),
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
