"use client"

import { Fieldset as BaseFieldset } from "@base-ui/react/fieldset"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface FieldsetProps
	extends React.ComponentPropsWithoutRef<typeof BaseFieldset.Root> {
	legend?: string
	className?: string
	classNames?: {
		root?: string
		// label: styles the <legend> element
		label?: string
	}
}

export function Fieldset({
	legend,
	children,
	className,
	classNames,
	...props
}: FieldsetProps) {
	return (
		<BaseFieldset.Root
			className={twMerge(
				clsx("rounded-lg border border-border px-4 py-3"),
				classNames?.root,
				className,
			)}
			{...props}
		>
			{legend && (
				<BaseFieldset.Legend
					render={<legend />}
					className={twMerge(
						"px-1 text-sm font-medium text-typography-primary",
						classNames?.label,
					)}
				>
					{legend}
				</BaseFieldset.Legend>
			)}
			{children}
		</BaseFieldset.Root>
	)
}
