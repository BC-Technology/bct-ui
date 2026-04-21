import { Separator as BaseSeparator } from "@base-ui/react/separator"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SeparatorProps
	extends React.ComponentPropsWithoutRef<typeof BaseSeparator> {
	className?: string
	classNames?: {
		root?: string
	}
}

export function Separator({
	orientation = "horizontal",
	className,
	classNames,
	...props
}: SeparatorProps) {
	return (
		<BaseSeparator
			orientation={orientation}
			className={twMerge(
				clsx("bg-divider", {
					"h-px w-full": orientation === "horizontal",
					"h-full w-px": orientation === "vertical",
				}),
				classNames?.root,
				className,
			)}
			{...props}
		/>
	)
}
