import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import type * as React from "react"

export type BctButtonProps = React.ComponentPropsWithoutRef<
	typeof BaseButton
> & {
	variant?: "primary" | "secondary" | "danger"
	size?: "sm" | "md" | "lg"
}

export function Button({
	className,
	variant = "primary",
	size = "md",
	...props
}: BctButtonProps) {
	const base =
		"inline-flex items-center justify-center gap-2 rounded-(--bct-radius-md) px-3 py-2 text-sm font-medium " +
		"outline-none ring-offset-2 ring-offset-(--bct-bg) transition " +
		"focus-visible:ring-2 focus-visible:ring-(--bct-ring) " +
		"disabled:opacity-50 disabled:pointer-events-none"

	const variants: Record<NonNullable<BctButtonProps["variant"]>, string> = {
		primary: "bg-(--bct-primary) text-(--bct-primary-fg) hover:opacity-95",
		secondary:
			"bg-(--bct-muted) text-(--bct-fg) hover:bg-[color-mix(in_oklch,--bct-muted,black_6%)]",
		danger: "bg-(--bct-danger) text-(--bct-danger-fg) hover:opacity-95",
	}

	const sizes: Record<NonNullable<BctButtonProps["size"]>, string> = {
		sm: "h-8 text-xs px-2",
		md: "h-9 text-sm px-3",
		lg: "h-10 text-sm px-4",
	}

	return (
		<BaseButton
			className={clsx(base, variants[variant], sizes[size], className)}
			{...props}
		/>
	)
}
