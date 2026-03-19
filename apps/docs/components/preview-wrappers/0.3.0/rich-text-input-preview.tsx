"use client"

import { useState } from "react"
import { RichTextInput } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/rich-text-input"
import type { VariantExample } from "../types"

function BasicRichTextPreview() {
	const [content, setContent] = useState("")
	return (
		<RichTextInput
			value={content}
			onChange={setContent}
			label="Description"
			placeholder="Enter your text here..."
		/>
	)
}

function WithHelperTextPreview() {
	const [content, setContent] = useState("")
	return (
		<RichTextInput
			value={content}
			onChange={setContent}
			label="Article Content"
			placeholder="Write your article..."
			helperText="Use the toolbar to format your text"
		/>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Basic Rich Text Editor",
		description: "Full-featured rich text editor with toolbar",
		code: `const [content, setContent] = useState("")

<RichTextInput
  value={content}
  onChange={setContent}
  label="Description"
  placeholder="Enter your text here..."
/>`,
		preview: <BasicRichTextPreview />,
	},
	{
		name: "With Helper Text",
		description: "Rich text editor with helper text",
		code: `const [content, setContent] = useState("")

<RichTextInput
  value={content}
  onChange={setContent}
  label="Article Content"
  placeholder="Write your article..."
  helperText="Use the toolbar to format your text"
/>`,
		preview: <WithHelperTextPreview />,
	},
]
