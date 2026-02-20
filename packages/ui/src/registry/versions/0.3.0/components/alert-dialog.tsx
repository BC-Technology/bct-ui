import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface AlertDialogProps
	extends React.ComponentPropsWithoutRef<typeof BaseAlertDialog.Root> {
	title: string
	description?: string
	confirmLabel?: string
	cancelLabel?: string
	onConfirm: () => void
	onCancel?: () => void
	confirmVariant?: "primary" | "error" | "warning" | "success"
	className?: string
	classNames?: {
		backdrop?: string
		popup?: string
		title?: string
		description?: string
		actions?: string
		cancelButton?: string
		confirmButton?: string
	}
}

export function AlertDialog({
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
	confirmVariant = "primary",
	className,
	classNames,
	...props
}: AlertDialogProps) {
	const confirmButtonStyles: Record<string, string> = {
		primary: "bg-primary text-primary-on hover:bg-primary-hover",
		error: "bg-error text-error-on hover:bg-error-hover",
		warning: "bg-warning text-warning-on hover:bg-warning-hover",
		success: "bg-success text-success-on hover:bg-success-hover",
	}

	return (
		<BaseAlertDialog.Root {...props}>
			<BaseAlertDialog.Portal>
				<BaseAlertDialog.Backdrop
					className={twMerge(
						"fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
						"data-[state=open]:animate-animate-fade-in",
						"data-[state=closed]:animate-animate-fade-out",
						classNames?.backdrop,
					)}
				/>
				<BaseAlertDialog.Popup
					className={twMerge(
						clsx(
							"fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
							"rounded-radius-lg border border-border bg-surface-1 p-6 shadow-shadow-lg",
							"data-[state=open]:animate-animate-slide-up",
							"data-[state=closed]:animate-animate-fade-out",
						),
						classNames?.popup,
						className,
					)}
				>
					<BaseAlertDialog.Title
						className={twMerge(
							"mb-2 font-semibold text-text-xl text-typography-primary",
							classNames?.title,
						)}
					>
						{title}
					</BaseAlertDialog.Title>
					{description && (
						<BaseAlertDialog.Description
							className={twMerge(
								"mb-6 text-text-base text-typography-secondary",
								classNames?.description,
							)}
						>
							{description}
						</BaseAlertDialog.Description>
					)}
					<div
						className={twMerge("flex justify-end gap-3", classNames?.actions)}
					>
						<BaseAlertDialog.Close
							onClick={onCancel}
							className={twMerge(
								clsx(
									"inline-flex h-10 items-center justify-center rounded-radius-md border border-border px-4 font-medium text-text-base text-typography-primary transition-colors",
									"hover:bg-surface-1-hover",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
								),
								classNames?.cancelButton,
							)}
						>
							{cancelLabel}
						</BaseAlertDialog.Close>
						<BaseAlertDialog.Close
							onClick={onConfirm}
							className={twMerge(
								clsx(
									"inline-flex h-10 items-center justify-center rounded-radius-md px-4 font-medium text-text-base transition-colors",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
									confirmButtonStyles[confirmVariant],
								),
								classNames?.confirmButton,
							)}
						>
							{confirmLabel}
						</BaseAlertDialog.Close>
					</div>
				</BaseAlertDialog.Popup>
			</BaseAlertDialog.Portal>
		</BaseAlertDialog.Root>
	)
}
