import type * as React from "react"

export interface VariantPreview {
	name: string
	description?: string
	/** The JSX string shown in the Code tab */
	code: string
	/** The live rendered preview */
	render: () => React.ReactNode
}
