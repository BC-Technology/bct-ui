"use client"

import type * as React from "react"

export interface ToggleProps extends React.ComponentPropsWithoutRef<"button"> {
	className?: string
	classNames?: {
		root?: string
	}
}

export function Toggle({ className, classNames, ...props }: ToggleProps) {
	return <button type="button" className={className} {...props} />
}
