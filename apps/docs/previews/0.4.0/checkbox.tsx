"use client"

import { useState } from "react"
import { Checkbox } from "../../../../packages/ui/src/registry/versions/0.4.0/components/checkbox"
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
		description: "Inline checkbox with label",
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
		name: "Card Variant",
		description: "Full-width card-style checkbox",
		code: `<Checkbox variant="card" label="Free Plan" />
<Checkbox variant="card" label="Pro Plan" defaultChecked />
<Checkbox variant="card" label="Enterprise" disabled />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-3">
				<Checkbox variant="card" label="Free Plan" />
				<Checkbox variant="card" label="Pro Plan" defaultChecked />
				<Checkbox variant="card" label="Enterprise" disabled />
			</div>
		),
	},
]
