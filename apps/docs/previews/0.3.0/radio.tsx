"use client"

import { Radio } from "../../../../packages/ui/src/registry/versions/0.3.0/components/radio"
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
	{
		name: "Card Variant",
		description: "Full-width card-style radio",
		code: `<Radio variant="card" label="Starter" value="starter" />
<Radio variant="card" label="Pro" value="pro" />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-3">
				<Radio variant="card" label="Starter" value="starter" />
				<Radio variant="card" label="Pro" value="pro" />
				<Radio variant="card" label="Enterprise" value="enterprise" disabled />
			</div>
		),
	},
]
