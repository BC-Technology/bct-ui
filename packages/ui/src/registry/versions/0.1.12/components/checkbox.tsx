import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import clsx from "clsx"
import type * as React from "react"

export type CheckboxProps = React.ComponentPropsWithoutRef<
	typeof BaseCheckbox.Root
> & {
	label?: React.ReactNode
}

export function Checkbox({ className, label, ...props }: CheckboxProps) {
	return (
		<div className="inline-flex cursor-pointer items-center gap-2">
			<BaseCheckbox.Root
				className={clsx(
					"grid size-4 place-content-center rounded-sm border border-border bg-surface-1 outline-none" +
						"ring-offset-2 ring-offset-background transition" +
						"focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			>
				<BaseCheckbox.Indicator
					className="size-3 rounded-sm bg-primary"
					keepMounted
				/>
			</BaseCheckbox.Root>
			{label ? <span className="text-sm">{label}</span> : null}
		</div>
	)
}
