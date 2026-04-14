"use client"

import { Radio } from "../../../../packages/ui/src/registry/versions/0.2.0/components/radio"
import { RadioGroup } from "../../../../packages/ui/src/registry/versions/0.2.0/components/radio-group"
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
]
