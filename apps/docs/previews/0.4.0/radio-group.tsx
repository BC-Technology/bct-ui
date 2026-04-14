"use client"

import { useState } from "react"
import { Radio } from "../../../../packages/ui/src/registry/versions/0.4.0/components/radio"
import { RadioGroup } from "../../../../packages/ui/src/registry/versions/0.4.0/components/radio-group"
import type { VariantPreview } from "../types"

function RadioGroupDemo() {
	const [value, setValue] = useState("monthly")
	return (
		<div className="flex flex-col gap-3">
			<RadioGroup
				label="Billing period"
				value={value}
				onValueChange={(v) => setValue(v)}
			>
				<Radio value="monthly" label="Monthly" />
				<Radio value="quarterly" label="Quarterly" />
				<Radio value="annually" label="Annually" />
			</RadioGroup>
			<p className="text-sm text-typography-muted">Selected: {value}</p>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Horizontal",
		description: "Horizontal radio group layout",
		code: `<RadioGroup label="Size" defaultValue="md" orientation="horizontal">
  <Radio value="sm" label="Small" />
  <Radio value="md" label="Medium" />
  <Radio value="lg" label="Large" />
</RadioGroup>`,
		render: () => (
			<RadioGroup label="Size" defaultValue="md" orientation="horizontal">
				<Radio value="sm" label="Small" />
				<Radio value="md" label="Medium" />
				<Radio value="lg" label="Large" />
			</RadioGroup>
		),
	},
	{
		name: "Vertical",
		description: "Vertical radio group with controlled state",
		code: `<RadioGroup label="Billing period" value={value} onValueChange={setValue}>
  <Radio value="monthly" label="Monthly" />
  <Radio value="quarterly" label="Quarterly" />
  <Radio value="annually" label="Annually" />
</RadioGroup>`,
		render: () => <RadioGroupDemo />,
	},
]
