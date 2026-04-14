"use client"

import { useState } from "react"
import { Checkbox } from "../../../../packages/ui/src/registry/versions/0.2.0/components/checkbox"
import type { VariantPreview } from "../types"

function CheckboxDemo() {
	const [checked, setChecked] = useState(false)
	return (
		<Checkbox
			label="Accept terms and conditions"
			checked={checked}
			onCheckedChange={(v) => setChecked(v as boolean)}
		/>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Checkbox with label",
		code: `<Checkbox label="Accept terms and conditions" />
<Checkbox label="Receive newsletter" defaultChecked />
<Checkbox label="Disabled option" disabled />`,
		render: () => (
			<div className="flex flex-col gap-3">
				<CheckboxDemo />
				<Checkbox label="Receive newsletter" defaultChecked />
				<Checkbox label="Disabled option" disabled />
				<Checkbox label="Disabled and checked" disabled defaultChecked />
			</div>
		),
	},
	{
		name: "With Error",
		description: "Checkbox with validation error",
		code: `<Checkbox
  label="Accept terms and conditions"
  error="You must accept the terms to continue."
/>`,
		render: () => (
			<div className="w-full max-w-sm">
				<Checkbox
					label="Accept terms and conditions"
					error="You must accept the terms to continue."
				/>
			</div>
		),
	},
]
