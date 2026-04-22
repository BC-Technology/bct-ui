"use client"

import type * as React from "react"

export interface SwitchProps extends React.ComponentPropsWithoutRef<"button"> {
	className?: string
	classNames?: {
		root?: string
	}
}

export function Switch({ className, classNames, ...props }: SwitchProps) {
	return <button type="button" className={className} {...props} />
}
