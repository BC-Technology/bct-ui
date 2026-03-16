import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TabItem {
	value: string
	label: React.ReactNode
	content: React.ReactNode
	disabled?: boolean
}

export interface TabsProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
		"children"
	> {
	items: TabItem[]
	className?: string
	classNames?: {
		root?: string
		list?: string
		tab?: string
		panel?: string
	}
}

export function Tabs({ items, className, classNames, ...props }: TabsProps) {
	return (
		<BaseTabs.Root
			className={twMerge("flex flex-col", classNames?.root, className)}
			{...props}
		>
			<BaseTabs.List
				className={twMerge(
					"flex gap-1 border-border border-b",
					classNames?.list,
				)}
			>
				{items.map((item) => (
					<BaseTabs.Tab
						key={item.value}
						value={item.value}
						disabled={item.disabled}
						className={twMerge(
							clsx(
								"relative px-4 py-2.5 font-medium text-text-base transition-colors",
								"text-typography-muted hover:text-typography-secondary",
								"outline-none ring-offset-2 ring-offset-background",
								"focus-visible:ring-2 focus-visible:ring-primary-focus",
								"disabled:cursor-not-allowed disabled:opacity-50",
								"data-selected:font-semibold data-selected:text-primary",
								"data-selected:after:absolute data-selected:after:right-0 data-selected:after:bottom-0 data-selected:after:left-0",
								"data-selected:after:h-0.5 data-selected:after:rounded-full data-selected:after:bg-primary",
							),
							classNames?.tab,
						)}
					>
						{item.label}
					</BaseTabs.Tab>
				))}
			</BaseTabs.List>
			{items.map((item) => (
				<BaseTabs.Panel
					key={item.value}
					value={item.value}
					className={twMerge("py-4", classNames?.panel)}
				>
					{item.content}
				</BaseTabs.Panel>
			))}
		</BaseTabs.Root>
	)
}
