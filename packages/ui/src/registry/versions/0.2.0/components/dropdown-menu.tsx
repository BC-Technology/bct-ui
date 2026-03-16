import { Menu } from "@base-ui/react/menu"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface DropdownMenuItem {
	label: React.ReactNode
	value: string
	disabled?: boolean
	onClick?: () => void
}

export interface DropdownMenuProps
	extends React.ComponentPropsWithoutRef<typeof Menu.Root> {
	items: DropdownMenuItem[]
	trigger: React.ReactNode
	className?: string
	classNames?: {
		trigger?: string
		popup?: string
		item?: string
	}
}

export function DropdownMenu({
	items,
	trigger,
	className,
	classNames,
	...props
}: DropdownMenuProps) {
	return (
		<Menu.Root {...props}>
			<Menu.Trigger className={twMerge(classNames?.trigger)}>
				{trigger}
			</Menu.Trigger>
			<Menu.Portal>
				<Menu.Positioner sideOffset={4}>
					<Menu.Popup
						className={twMerge(
							clsx(
								"z-50 min-w-48 rounded-radius-md border border-border bg-surface-1 p-1 shadow-shadow-lg",
								"data-[state=open]:animate-animate-fade-in",
								"data-[state=closed]:animate-animate-fade-out",
							),
							classNames?.popup,
							className,
						)}
					>
						{items.map((item) => (
							<Menu.Item
								key={item.value}
								disabled={item.disabled}
								onClick={item.onClick}
								className={twMerge(
									clsx(
										"cursor-pointer rounded-radius-sm px-3 py-2 text-text-sm text-typography-primary outline-none transition-colors",
										"hover:bg-surface-2",
										"focus-visible:bg-surface-2",
										"disabled:cursor-not-allowed disabled:opacity-50",
									),
									classNames?.item,
								)}
							>
								{item.label}
							</Menu.Item>
						))}
					</Menu.Popup>
				</Menu.Positioner>
			</Menu.Portal>
		</Menu.Root>
	)
}
