"use client"

import { Form as BaseForm } from "@base-ui/react/form"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface FormProps
	extends React.ComponentPropsWithoutRef<typeof BaseForm> {
	className?: string
	classNames?: {
		root?: string
	}
}

/**
 * Thin wrapper around Base UI Form.
 *
 * Both `onSubmit` (native form event) and `onFormSubmit` (Base UI typed handler)
 * are accepted via `...props` spread — pass whichever suits your usage.
 *
 * Compose Field + Input + Switch etc. as children.
 */
export function Form({ children, className, classNames, ...props }: FormProps) {
	return (
		<BaseForm
			className={twMerge(clsx("flex flex-col gap-4"), classNames?.root, className)}
			{...props}
		>
			{children}
		</BaseForm>
	)
}
