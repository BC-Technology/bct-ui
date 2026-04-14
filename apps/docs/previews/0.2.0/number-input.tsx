"use client"

import { NumberInput } from "../../../../packages/ui/src/registry/versions/0.2.0/components/number-input"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Number input with increment/decrement controls",
		code: `<NumberInput label="Quantity" defaultValue={1} min={0} max={100} />
<NumberInput label="Price (€)" defaultValue={9.99} step={0.01} />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<NumberInput label="Quantity" defaultValue={1} min={0} max={100} />
				<NumberInput
					label="Price (€)"
					defaultValue={9.99}
					step={0.01}
					helperText="Enter the unit price"
				/>
				<NumberInput label="Disabled" defaultValue={42} disabled />
			</div>
		),
	},
]
