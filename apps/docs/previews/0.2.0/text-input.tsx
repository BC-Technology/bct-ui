"use client"

import { TextInput } from "../../../../packages/ui/src/registry/versions/0.2.0/components/text-input"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Text input with label, helper text, and error state",
		code: `<TextInput label="Email" placeholder="name@example.com" helperText="We'll never share your email." />
<TextInput label="Username" placeholder="username" error="Username is already taken." />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<TextInput
					label="Email"
					placeholder="name@example.com"
					helperText="We'll never share your email."
				/>
				<TextInput
					label="Username"
					placeholder="username"
					error="Username is already taken."
				/>
				<TextInput label="Password" type="password" placeholder="••••••••" />
			</div>
		),
	},
	{
		name: "Disabled",
		description: "Disabled state",
		code: `<TextInput label="Disabled" value="Cannot edit this" disabled />`,
		render: () => (
			<div className="w-full max-w-sm">
				<TextInput
					label="Disabled"
					value="Cannot edit this"
					disabled
					readOnly
				/>
			</div>
		),
	},
]
