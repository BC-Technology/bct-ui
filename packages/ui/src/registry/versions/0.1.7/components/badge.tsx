import clsx from "clsx"
import type * as React from "react"

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> & {
	variant?: "neutral" | "primary" | "danger"
}

export function Badge({
	className,
	variant = "neutral",
	...props
}: BadgeProps) {
	const base =
		"inline-flex items-center rounded-(--bct-radius-sm) px-2 py-0.5 font-medium text-xs"

	const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
		neutral: "bg-(--bct-muted) text-(--bct-muted-fg)",
		primary: "bg-(--bct-primary) text-(--bct-primary-fg)",
		danger: "bg-(--bct-danger) text-(--bct-danger-fg)",
	}

	return (
		<span className={clsx(base, variants[variant], className)} {...props} />
	)
}
