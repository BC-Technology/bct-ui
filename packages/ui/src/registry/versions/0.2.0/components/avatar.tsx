import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
	src?: string
	alt?: string
	fallback?: string
	size?: "sm" | "md" | "lg" | "xl"
	className?: string
	classNames?: {
		root?: string
		image?: string
		fallback?: string
	}
}

export function Avatar({
	src,
	alt,
	fallback,
	size = "md",
	className,
	classNames,
	...props
}: AvatarProps) {
	const sizeStyles = {
		sm: "size-8 text-text-xs",
		md: "size-10 text-text-sm",
		lg: "size-12 text-text-base",
		xl: "size-16 text-text-lg",
	}

	const getFallbackText = () => {
		if (fallback) return fallback
		if (alt) {
			return alt
				.split(" ")
				.map((word) => word[0])
				.join("")
				.toUpperCase()
				.slice(0, 2)
		}
		return "?"
	}

	return (
		<div
			className={twMerge(
				clsx(
					"relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface-2",
					sizeStyles[size],
				),
				classNames?.root,
				className,
			)}
			{...props}
		>
			{src ? (
				<img
					src={src}
					alt={alt || "Avatar"}
					className={twMerge("size-full object-cover", classNames?.image)}
				/>
			) : (
				<span
					className={twMerge(
						"font-medium text-typography-primary",
						classNames?.fallback,
					)}
				>
					{getFallbackText()}
				</span>
			)}
		</div>
	)
}
