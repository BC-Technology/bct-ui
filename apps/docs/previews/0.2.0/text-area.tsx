"use client"

import { TextArea } from "../../../../packages/ui/src/registry/versions/0.2.0/components/text-area"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Multi-line text input with optional label, error, and character counter",
		code: `<TextArea
  label="Message"
  placeholder="Type your message here..."
  helperText="Keep it under 500 characters."
/>`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<TextArea
					label="Message"
					placeholder="Type your message here..."
					helperText="Keep it under 500 characters."
					rows={3}
				/>
				<TextArea
					label="Error State"
					placeholder="Type here..."
					error="This field is required."
					rows={3}
				/>
			</div>
		),
	},
]
