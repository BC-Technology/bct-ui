"use client"

import { Radio } from "../../../../packages/ui/src/registry/versions/0.2.0/components/radio"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Individual radio button with label",
		code: `<Radio label="Option A" value="a" />
<Radio label="Option B" value="b" defaultChecked />
<Radio label="Disabled" value="c" disabled />`,
		render: () => (
			<div className="flex flex-col gap-3">
				<Radio label="Option A" value="a" />
				<Radio label="Option B" value="b" />
				<Radio label="Disabled" value="c" disabled />
			</div>
		),
	},
]
