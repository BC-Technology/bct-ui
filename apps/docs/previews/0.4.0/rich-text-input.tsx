"use client"

import { useState } from "react"
import { RichTextInput } from "../../../../packages/ui/src/registry/versions/0.4.0/components/rich-text-input"
import type { VariantPreview } from "../types"

function RichTextDemo() {
	const [value, setValue] = useState("<p>Start typing here...</p>")
	return (
		<div className="w-full max-w-lg">
			<RichTextInput
				label="Description"
				value={value}
				onChange={setValue}
				helperText="Use the toolbar to format your text"
			/>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Rich text editor powered by Tiptap with formatting toolbar",
		code: `const [value, setValue] = useState("")

<RichTextInput
  label="Description"
  value={value}
  onChange={setValue}
  helperText="Use the toolbar to format your text"
/>`,
		render: () => <RichTextDemo />,
	},
]
