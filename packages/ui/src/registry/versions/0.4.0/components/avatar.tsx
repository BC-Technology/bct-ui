"use client"
import clsx from "clsx"
import { User } from "lucide-react"
import * as React from "react"
import { twMerge } from "tailwind-merge"

export interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
	src?: string
	alt?: string
	fallback?: string
	size?: "sm" | "md" | "lg" | "xl"
	shape?: "circle" | "square"
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
	shape = "circle",
	className,
	classNames,
	...props
}: AvatarProps) {
	const [errorSrc, setErrorSrc] = React.useState<string | null>(null)
	const imgError = src != null && src === errorSrc

	const sizeStyles: Record<string, string> = {
		sm: "size-8 text-xs",
		md: "size-10 text-sm",
		lg: "size-12 text-base",
		xl: "size-16 text-lg",
	}

	const shapeStyles: Record<string, string> = {
		circle: "rounded-full",
		square: "rounded-md",
	}

	const iconSizeStyles: Record<string, string> = {
		sm: "size-4",
		md: "size-5",
		lg: "size-6",
		xl: "size-8",
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
		return null
	}

	const fallbackText = getFallbackText()

	return (
		<div
			className={twMerge(
				clsx(
					"relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-2",
					sizeStyles[size],
					shapeStyles[shape],
				),
				classNames?.root,
				className,
			)}
			{...props}
		>
			{src && !imgError ? (
				<img
					src={src}
					alt={alt || "Avatar"}
					onError={() => setErrorSrc(src ?? null)}
					className={twMerge("size-full object-cover", classNames?.image)}
				/>
			) : fallbackText ? (
				<span
					className={twMerge(
						"font-medium text-typography-primary",
						classNames?.fallback,
					)}
				>
					{fallbackText}
				</span>
			) : (
				<User
					className={twMerge(
						"text-typography-muted",
						iconSizeStyles[size],
						classNames?.fallback,
					)}
				/>
			)}
		</div>
	)
}
