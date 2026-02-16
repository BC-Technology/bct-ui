import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TooltipProps
	extends React.ComponentPropsWithoutRef<typeof BaseTooltip.Root> {
	content: React.ReactNode
	side?: "top" | "right" | "bottom" | "left"
	className?: string
	classNames?: {
		trigger?: string
		popup?: string
		arrow?: string
	}
	children: React.ReactNode
}

export function Tooltip({
	content,
	side = "top",
	className,
	classNames,
	children,
	...props
}: TooltipProps) {
	return (
		<BaseTooltip.Root {...props}>
			<BaseTooltip.Trigger
				className={twMerge("inline-flex", classNames?.trigger)}
			>
				{children}
			</BaseTooltip.Trigger>
			<BaseTooltip.Portal>
				<BaseTooltip.Positioner side={side} sideOffset={4}>
					<BaseTooltip.Popup
						className={twMerge(
							clsx(
								"z-50 max-w-xs rounded-radius-sm bg-dark px-3 py-1.5 shadow-shadow-md",
								"text-dark-on text-text-sm",
								"data-[state=open]:animate-animate-fade-in",
								"data-[state=closed]:animate-animate-fade-out",
							),
							classNames?.popup,
							className,
						)}
					>
						{content}
						<BaseTooltip.Arrow
							className={twMerge("fill-dark", classNames?.arrow)}
						/>
					</BaseTooltip.Popup>
				</BaseTooltip.Positioner>
			</BaseTooltip.Portal>
		</BaseTooltip.Root>
	)
}
