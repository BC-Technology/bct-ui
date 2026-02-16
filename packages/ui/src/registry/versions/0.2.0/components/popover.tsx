import { Popover as BasePopover } from "@base-ui/react/popover"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface PopoverProps
	extends React.ComponentPropsWithoutRef<typeof BasePopover.Root> {
	trigger: React.ReactNode
	side?: "top" | "right" | "bottom" | "left"
	className?: string
	classNames?: {
		trigger?: string
		popup?: string
	}
	children: React.ReactNode
}

export function Popover({
	trigger,
	side = "bottom",
	className,
	classNames,
	children,
	...props
}: PopoverProps) {
	return (
		<BasePopover.Root {...props}>
			<BasePopover.Trigger className={twMerge(classNames?.trigger)}>
				{trigger}
			</BasePopover.Trigger>
			<BasePopover.Portal>
				<BasePopover.Positioner side={side} sideOffset={4}>
					<BasePopover.Popup
						className={twMerge(
							clsx(
								"z-50 rounded-radius-md border border-border bg-surface-1 p-4 shadow-shadow-lg",
								"data-[state=open]:animate-animate-fade-in",
								"data-[state=closed]:animate-animate-fade-out",
							),
							classNames?.popup,
							className,
						)}
					>
						{children}
					</BasePopover.Popup>
				</BasePopover.Positioner>
			</BasePopover.Portal>
		</BasePopover.Root>
	)
}
