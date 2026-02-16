import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface DividerProps extends React.ComponentPropsWithoutRef<"hr"> {
	orientation?: "horizontal" | "vertical"
	className?: string
}

export function Divider({
	orientation = "horizontal",
	className,
	...props
}: DividerProps) {
	return (
		<hr
			className={twMerge(
				clsx("border-divider", {
					"h-px w-full border-t": orientation === "horizontal",
					"h-full w-px border-l": orientation === "vertical",
				}),
				className,
			)}
			aria-orientation={orientation}
			{...props}
		/>
	)
}
