import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import clsx from "clsx"
import { X } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface DialogProps
	extends React.ComponentPropsWithoutRef<typeof BaseDialog.Root> {
	title?: string
	description?: string
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
	className,
	classNames,
	children,
	...props
}: DialogProps) {
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
							"fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
							"rounded-radius-lg border border-border bg-surface-1 p-6 shadow-shadow-lg",
							"data-[state=open]:animate-animate-slide-up",
							"data-[state=closed]:animate-animate-fade-out",
						),
						classNames?.popup,
						className,
					)}
				>
					{title && (
						<BaseDialog.Title
							className={twMerge(
								"mb-2 font-semibold text-text-xl text-typography-primary",
								classNames?.title,
							)}
						>
							{title}
						</BaseDialog.Title>
					)}
					{description && (
						<BaseDialog.Description
							className={twMerge(
								"mb-4 text-text-base text-typography-secondary",
								classNames?.description,
							)}
						>
							{description}
						</BaseDialog.Description>
					)}
					<div className={twMerge(classNames?.content)}>{children}</div>
					<BaseDialog.Close
						className={twMerge(
							clsx(
								"absolute top-4 right-4 rounded-radius-sm p-2",
								"text-typography-muted transition-colors",
								"hover:bg-surface-2 hover:text-typography-primary",
							),
							classNames?.close,
						)}
					>
						<X className="size-4" />
					</BaseDialog.Close>
				</BaseDialog.Popup>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	)
}
