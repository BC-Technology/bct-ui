import { Popover as BasePopover } from "@base-ui/react/popover"
import clsx from "clsx"
import { X } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface PopoverProps
	extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {
	trigger: React.ReactNode
	title?: string
	side?: "top" | "right" | "bottom" | "left"
	className?: string
	classNames?: {
		trigger?: string
		popup?: string
		title?: string
		close?: string
		content?: string
	}
	children?: React.ReactNode
}

export function Popover({
	trigger,
	title,
	side = "bottom",
	className,
	classNames,
	children,
	...props
}: PopoverProps) {
	return (
		<BasePopover.Root {...props}>
			<BasePopover.Trigger
				className={twMerge("inline-flex", classNames?.trigger)}
			>
				{trigger}
			</BasePopover.Trigger>
			<BasePopover.Portal>
				<BasePopover.Positioner side={side} sideOffset={8}>
					<BasePopover.Popup
						className={twMerge(
							clsx(
								"z-50 w-72 rounded-radius-md border border-border bg-surface-1 shadow-shadow-lg",
								"data-[state=open]:animate-animate-fade-in",
								"data-[state=closed]:animate-animate-fade-out",
							),
							classNames?.popup,
							className,
						)}
					>
						{title && (
							<div className="flex items-center justify-between border-border border-b px-4 py-3">
								<BasePopover.Title
									className={twMerge(
										"font-semibold text-text-base text-typography-primary",
										classNames?.title,
									)}
								>
									{title}
								</BasePopover.Title>
								<BasePopover.Close
									className={twMerge(
										clsx(
											"rounded-radius-sm p-1 text-typography-muted transition-colors",
											"hover:bg-surface-2 hover:text-typography-primary",
											"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
										),
										classNames?.close,
									)}
								>
									<X className="size-4" />
								</BasePopover.Close>
							</div>
						)}
						<div className={twMerge("p-4", classNames?.content)}>
							{children}
						</div>
					</BasePopover.Popup>
				</BasePopover.Positioner>
			</BasePopover.Portal>
		</BasePopover.Root>
	)
}
