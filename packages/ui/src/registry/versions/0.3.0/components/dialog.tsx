import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import clsx from "clsx"
import { X } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface DialogProps
	extends React.ComponentPropsWithoutRef<typeof BaseDialog.Root> {
	title?: string
	description?: string
	mode?: "panel" | "modal"
	size?: "sm" | "md" | "lg" | "xl"
	className?: string
	classNames?: {
		backdrop?: string
		popup?: string
		title?: string
		description?: string
		content?: string
		close?: string
	}
	children?: React.ReactNode
}

export function Dialog({
	title,
	description,
	mode = "panel",
	size = "md",
	className,
	classNames,
	children,
	...props
}: DialogProps) {
	const panelSizeStyles: Record<string, string> = {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
	}

	const modalSizeStyles: Record<string, string> = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
	}

	if (mode === "modal") {
		return (
			<BaseDialog.Root {...props}>
				<BaseDialog.Portal>
					<BaseDialog.Backdrop
						className={twMerge(
							"fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
							"data-[state=open]:animate-animate-fade-in",
							"data-[state=closed]:animate-animate-fade-out",
							classNames?.backdrop,
						)}
					/>
					<BaseDialog.Popup
						className={twMerge(
							clsx(
								"fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
								"rounded-radius-lg border border-border bg-surface-1 shadow-shadow-lg",
								"data-[state=open]:animate-animate-slide-up",
								"data-[state=closed]:animate-animate-fade-out",
								modalSizeStyles[size],
							),
							classNames?.popup,
							className,
						)}
					>
						<div className="flex items-start justify-between border-border border-b p-4">
							<div className="flex flex-col gap-1">
								{title && (
									<BaseDialog.Title
										className={twMerge(
											"font-semibold text-text-xl text-typography-primary",
											classNames?.title,
										)}
									>
										{title}
									</BaseDialog.Title>
								)}
								{description && (
									<BaseDialog.Description
										className={twMerge(
											"text-text-sm text-typography-secondary",
											classNames?.description,
										)}
									>
										{description}
									</BaseDialog.Description>
								)}
							</div>
							<BaseDialog.Close
								className={twMerge(
									clsx(
										"ml-4 shrink-0 rounded-radius-sm p-1.5 text-typography-muted transition-colors",
										"hover:bg-surface-2 hover:text-typography-primary",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
									),
									classNames?.close,
								)}
							>
								<X className="size-5" />
							</BaseDialog.Close>
						</div>
						<div className={twMerge("p-4", classNames?.content)}>
							{children}
						</div>
					</BaseDialog.Popup>
				</BaseDialog.Portal>
			</BaseDialog.Root>
		)
	}

	return (
		<BaseDialog.Root {...props}>
			<BaseDialog.Portal>
				<BaseDialog.Backdrop
					className={twMerge(
						"fixed inset-0 z-50 bg-overlay backdrop-blur-sm",
						"data-[state=open]:animate-animate-fade-in",
						"data-[state=closed]:animate-animate-fade-out",
						classNames?.backdrop,
					)}
				/>
				<div className="fixed inset-0 z-50 overflow-hidden">
					<div className="flex h-full items-end justify-center pt-12 sm:items-center sm:justify-end sm:p-2">
						<BaseDialog.Popup
							className={twMerge(
								clsx(
									"relative flex h-full w-full flex-col bg-surface-1 shadow-shadow-lg transition-all duration-300",
									"rounded-t-radius-lg sm:rounded-radius-lg",
									"data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
									"sm:data-[state=closed]:translate-x-full sm:data-[state=open]:translate-x-0 sm:data-[state=closed]:translate-y-0",
									"sm:h-full sm:max-h-full sm:w-full",
									panelSizeStyles[size],
								),
								classNames?.popup,
								className,
							)}
						>
							<div className="flex shrink-0 items-start justify-between border-border border-b p-4">
								<div className="flex flex-col gap-1">
									{title && (
										<BaseDialog.Title
											className={twMerge(
												"font-semibold text-text-xl text-typography-primary",
												classNames?.title,
											)}
										>
											{title}
										</BaseDialog.Title>
									)}
									{description && (
										<BaseDialog.Description
											className={twMerge(
												"text-text-sm text-typography-secondary",
												classNames?.description,
											)}
										>
											{description}
										</BaseDialog.Description>
									)}
								</div>
								<BaseDialog.Close
									className={twMerge(
										clsx(
											"ml-4 shrink-0 rounded-radius-sm p-1.5 text-typography-muted transition-colors",
											"hover:bg-surface-2 hover:text-typography-primary",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
										),
										classNames?.close,
									)}
								>
									<X className="size-5" />
								</BaseDialog.Close>
							</div>
							<div
								className={twMerge(
									"flex-1 overflow-y-auto p-4",
									classNames?.content,
								)}
							>
								{children}
							</div>
						</BaseDialog.Popup>
					</div>
				</div>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	)
}
