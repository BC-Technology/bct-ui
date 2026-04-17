import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface TabItem {
	value: string
	label: React.ReactNode
}

export interface TabsProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseTabs.Root>,
		"children" | "onValueChange"
	> {
	tabs: TabItem[]
	onChange?: (value: string) => void
	className?: string
	classNames?: {
		root?: string
		list?: string
		tab?: string
	}
}

export function Tabs({
	tabs,
	onChange,
	className,
	classNames,
	...props
}: TabsProps) {
	return (
		<BaseTabs.Root
			onValueChange={onChange}
			className={twMerge(
				"flex w-full items-center gap-1 rounded-md border border-border bg-surface-1 p-1",
				classNames?.root,
				className,
			)}
			{...props}
		>
			<BaseTabs.List
				className={twMerge("flex w-full gap-1", classNames?.list)}
			>
				{tabs.map((tab) => (
					<BaseTabs.Tab
						key={tab.value}
						value={tab.value}
						className={twMerge(
							clsx(
								"relative flex flex-1 cursor-pointer items-center justify-center rounded-md px-4 py-2 transition-colors",
								"text-typography-muted hover:bg-surface-1-hover hover:text-typography-primary",
								"outline-none ring-offset-2 ring-offset-background",
								"focus-visible:ring-2 focus-visible:ring-primary-focus",
								"data-selected:border data-selected:border-accent-2 data-selected:bg-accent-2-muted data-selected:text-typography-primary",
							),
							classNames?.tab,
						)}
					>
						<span className="font-bold text-sm tracking-tight">
							{tab.label}
						</span>
					</BaseTabs.Tab>
				))}
			</BaseTabs.List>
		</BaseTabs.Root>
	)
}
