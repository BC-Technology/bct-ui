import { Input as BaseInput } from "@base-ui/react/input"
import clsx from "clsx"
import type * as React from "react"

export type InputProps = React.ComponentPropsWithoutRef<typeof BaseInput> & {
	uiSize?: "sm" | "md" | "lg"
}

export function Input({ className, uiSize = "md", ...props }: InputProps) {
	const base =
		"w-full rounded-(--bct-radius-md) border border-(--bct-border) bg-(--bct-card) px-3 py-2 text-(--bct-fg) " +
		"outline-none ring-offset-2 ring-offset-(--bct-bg) transition " +
		"placeholder:text-(--bct-muted-fg) focus-visible:ring-2 focus-visible:ring-(--bct-ring) " +
		"disabled:cursor-not-allowed disabled:opacity-50"

	const sizes: Record<NonNullable<InputProps["uiSize"]>, string> = {
		sm: "h-8 text-sm",
		md: "h-9 text-sm",
		lg: "h-10 text-base",
	}

	return (
		<BaseInput className={clsx(base, sizes[uiSize], className)} {...props} />
	)
}
