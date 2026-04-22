"use client"

import type * as React from "react"

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
	className?: string
	classNames?: {
		root?: string
	}
}

export function Input({ className, classNames, ...props }: InputProps) {
	return <input className={className} {...props} />
}
