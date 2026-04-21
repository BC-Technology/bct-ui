"use client"

import { TextArea } from "../../../../packages/ui/src/registry/versions/0.4.0/components/text-area"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description:
			"Multi-line text input with optional label, error, and helper text",
		code: `<TextArea
  label="Message"
  placeholder="Type your message here..."
  helperText="Keep it under 500 characters."
/>
<TextArea
  label="Error State"
  placeholder="Type here..."
  error="This field is required."
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
	{
		name: "Character Count",
		description: "TextArea with character counter and max length",
		code: `<TextArea
  label="Bio"
  placeholder="Tell us about yourself..."
  showCharCount
  maxLength={200}
  rows={4}
/>`,
		render: () => (
			<div className="w-full max-w-sm">
				<TextArea
					label="Bio"
					placeholder="Tell us about yourself..."
					showCharCount
					maxLength={200}
					rows={4}
					helperText="Used on your public profile."
				/>
			</div>
		),
	},
]
