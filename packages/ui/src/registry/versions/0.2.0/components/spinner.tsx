import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SpinnerProps extends React.ComponentPropsWithoutRef<"output"> {
	size?: "sm" | "md" | "lg"
	className?: string
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
	const sizeStyles = {
		sm: "size-4 border-2",
		md: "size-6 border-2",
		lg: "size-8 border-3",
	}

	return (
		<output
			className={twMerge(
				clsx(
					"inline-block animate-animate-spin rounded-full border-primary border-t-transparent",
					sizeStyles[size],
				),
				className,
			)}
			aria-label="Loading"
			{...props}
		>
			<span className="sr-only">Loading...</span>
		</output>
	)
}
