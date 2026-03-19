"use client"

import { useState } from "react"
import { RichTextInput } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/rich-text-input"
import type { VariantExample } from "../types"

function BasicRichTextPreview() {
	const [value, setValue] = useState("")
	return <RichTextInput value={value} onChange={setValue} label="Description" />
}

function WithHelperTextPreview() {
	const [value, setValue] = useState("")
	return (
		<RichTextInput
			value={value}
			onChange={setValue}
			label="Content"
			helperText="Format your text using the toolbar"
		/>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Basic Rich Text Editor",
		description: "Full-featured rich text editor with toolbar",
		code: `const [value, setValue] = useState("")

<RichTextInput
  value={value}
  onChange={setValue}
  label="Description"
/>`,
		preview: <BasicRichTextPreview />,
	},
	{
		name: "With Helper Text",
		description: "Rich text editor with helper text",
		code: `const [value, setValue] = useState("")

<RichTextInput
  value={value}
  onChange={setValue}
  label="Content"
  helperText="Format your text using the toolbar"
/>`,
		preview: <WithHelperTextPreview />,
	},
]
