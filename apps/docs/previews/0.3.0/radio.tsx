"use client"

import { Radio } from "../../../../packages/ui/src/registry/versions/0.3.0/components/radio"
import { RadioGroup } from "../../../../packages/ui/src/registry/versions/0.3.0/components/radio-group"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Individual radio buttons with label, wrapped in a RadioGroup",
		code: `<RadioGroup label="Option" defaultValue="a">
  <Radio label="Option A" value="a" />
  <Radio label="Option B" value="b" />
  <Radio label="Disabled" value="c" disabled />
</RadioGroup>`,
		render: () => (
			<RadioGroup label="Option" defaultValue="a">
				<Radio label="Option A" value="a" />
				<Radio label="Option B" value="b" />
				<Radio label="Disabled" value="c" disabled />
			</RadioGroup>
		),
	},
	{
		name: "Card Variant",
		description: "Full-width card-style radio buttons",
		code: `<RadioGroup label="Plan" defaultValue="starter">
  <Radio variant="card" label="Starter" value="starter" />
  <Radio variant="card" label="Pro" value="pro" />
  <Radio variant="card" label="Enterprise" value="enterprise" disabled />
</RadioGroup>`,
		render: () => (
			<div className="w-full max-w-sm">
				<RadioGroup label="Plan" defaultValue="starter">
					<Radio variant="card" label="Starter" value="starter" />
					<Radio variant="card" label="Pro" value="pro" />
					<Radio
						variant="card"
						label="Enterprise"
						value="enterprise"
						disabled
					/>
				</RadioGroup>
			</div>
		),
	},
]
