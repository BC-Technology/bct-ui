import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import clsx from "clsx"
import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface AccordionItemProps {
	value: string
	title: React.ReactNode
	children: React.ReactNode
}

export interface AccordionProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>,
		"children"
	> {
	items: AccordionItemProps[]
	className?: string
	classNames?: {
		root?: string
		item?: string
		header?: string
		trigger?: string
		panel?: string
	}
}

export function Accordion({
	items,
	className,
	classNames,
	...props
}: AccordionProps) {
	return (
		<BaseAccordion.Root
			className={twMerge("flex flex-col gap-2", classNames?.root, className)}
			{...props}
		>
			{items.map((item) => (
				<BaseAccordion.Item
					key={item.value}
					value={item.value}
					className={twMerge(
						"overflow-hidden rounded-radius-md border border-border bg-surface-1",
						classNames?.item,
					)}
				>
					<BaseAccordion.Header className={twMerge(classNames?.header)}>
						<BaseAccordion.Trigger
							className={twMerge(
								clsx(
									"flex w-full items-center justify-between gap-2 px-4 py-3",
									"font-medium text-text-base text-typography-primary transition-colors",
									"hover:bg-surface-1-hover",
									"outline-none ring-offset-2 ring-offset-background",
									"focus-visible:ring-2 focus-visible:ring-primary-focus",
								),
								classNames?.trigger,
							)}
						>
							{item.title}
							<ChevronDown className="size-4 shrink-0 text-typography-muted transition-transform duration-200 data-[state=open]:rotate-180" />
						</BaseAccordion.Trigger>
					</BaseAccordion.Header>
					<BaseAccordion.Panel
						className={twMerge(
							"overflow-hidden border-border border-t px-4 py-3 text-text-base text-typography-secondary",
							classNames?.panel,
						)}
					>
						{item.children}
					</BaseAccordion.Panel>
				</BaseAccordion.Item>
			))}
		</BaseAccordion.Root>
	)
}
