"use client"
import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import clsx from "clsx"
import { User } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

const SIZE_STYLES: Record<string, string> = {
	sm: "size-8 text-xs",
	md: "size-10 text-sm",
	lg: "size-12 text-base",
	xl: "size-16 text-lg",
}

const SHAPE_STYLES: Record<string, string> = {
	circle: "rounded-full",
	square: "rounded-md",
}

const ICON_SIZE_STYLES: Record<string, string> = {
	sm: "size-4",
	md: "size-5",
	lg: "size-6",
	xl: "size-8",
}

export interface AvatarProps
	extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
	src?: string
	alt?: string
	fallback?: React.ReactNode
	fallbackIcon?: React.ReactNode
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
	fallbackIcon = <User />,
	size = "md",
	shape = "circle",
	className,
	classNames,
	...props
}: AvatarProps) {
	const derivedInitials =
		alt != null
			? alt
					.split(" ")
					.map((word) => word[0])
					.join("")
					.toUpperCase()
					.slice(0, 2)
			: null

	const fallbackContent = fallback ?? derivedInitials

	return (
		<BaseAvatar.Root
			className={twMerge(
				clsx(
					"relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-2",
					SIZE_STYLES[size],
					SHAPE_STYLES[shape],
				),
				classNames?.root,
				className,
			)}
			{...props}
		>
			<BaseAvatar.Image
				src={src ?? ""}
				alt={alt ?? "Avatar"}
				className={twMerge("size-full object-cover", classNames?.image)}
			/>
			<BaseAvatar.Fallback
				className={twMerge(
					"flex items-center justify-center font-medium text-typography-primary",
					classNames?.fallback,
				)}
			>
				{fallbackContent != null ? (
					fallbackContent
				) : fallbackIcon != null ? (
					<span className={ICON_SIZE_STYLES[size]}>{fallbackIcon}</span>
				) : null}
			</BaseAvatar.Fallback>
		</BaseAvatar.Root>
	)
}
