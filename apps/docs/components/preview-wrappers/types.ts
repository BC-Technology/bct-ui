import type { ReactNode } from "react"

export interface VariantExample {
	name: string
	description: string
	code: string
	preview: ReactNode
}

export interface PreviewWrapperExport {
	variants: VariantExample[]
}
