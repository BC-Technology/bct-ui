import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import clsx from "clsx"
import type * as React from "react"

export type TabsProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>

export function Tabs(props: TabsProps) {
	return <BaseTabs.Root {...props} />
}

export type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List>
export function TabsList({ className, ...props }: TabsListProps) {
	return (
		<BaseTabs.List
			className={clsx(
				"inline-flex items-center gap-1 rounded-(--bct-radius-md) border border-(--bct-border) bg-(--bct-muted) p-1",
				className,
			)}
			{...props}
		/>
	)
}

export type TabsTabProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
export function TabsTab({ className, ...props }: TabsTabProps) {
	return (
		<BaseTabs.Tab
			className={clsx(
				"rounded-(--bct-radius-sm) px-3 py-1.5 font-medium text-(--bct-muted-fg) text-sm" +
					"data-selected:bg-(--bct-card) data-selected:text-(--bct-fg)",
				className,
			)}
			{...props}
		/>
	)
}

export type TabsPanelProps = React.ComponentPropsWithoutRef<
	typeof BaseTabs.Panel
>
export function TabsPanel({ className, ...props }: TabsPanelProps) {
	return <BaseTabs.Panel className={clsx("mt-3", className)} {...props} />
}
