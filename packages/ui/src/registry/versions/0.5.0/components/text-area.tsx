"use client"

import type * as React from "react"

export interface TextAreaProps
	extends React.ComponentPropsWithoutRef<"textarea"> {
	className?: string
	classNames?: {
		root?: string
	}
}

export function TextArea({ className, classNames, ...props }: TextAreaProps) {
	return <textarea className={className} {...props} />
}
