"use client"

import { Divider } from "../../../../packages/ui/src/registry/versions/0.2.0/components/divider"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Horizontal",
		description: "Default horizontal divider",
		code: `<Divider />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Divider />
				<Divider />
			</div>
		),
	},
	{
		name: "Vertical",
		description: "Vertical divider for inline separators",
		code: `<div className="flex h-8 items-center gap-4">
  <span>Item A</span>
  <Divider orientation="vertical" />
  <span>Item B</span>
</div>`,
		render: () => (
			<div className="flex h-8 items-center gap-4">
				<span className="text-sm text-typography-primary">Item A</span>
				<Divider orientation="vertical" />
				<span className="text-sm text-typography-primary">Item B</span>
				<Divider orientation="vertical" />
				<span className="text-sm text-typography-primary">Item C</span>
			</div>
		),
	},
]
