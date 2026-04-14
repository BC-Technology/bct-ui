"use client"

import { Card } from "../../../../packages/ui/src/registry/versions/0.2.0/components/card"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Variants",
		description: "Default, outlined, and elevated card variants",
		code: `<Card
  variant="default"
  header={<h3 className="font-semibold">Card Title</h3>}
  footer={<p className="text-sm text-typography-muted">Footer</p>}
>
  <p>Card content goes here.</p>
</Card>`,
		render: () => (
			<div className="flex flex-wrap gap-4">
				{(["default", "outlined", "elevated"] as const).map((variant) => (
					<Card
						key={variant}
						variant={variant}
						className="w-52"
						header={<h3 className="font-semibold capitalize">{variant}</h3>}
						footer={
							<p className="text-typography-muted text-xs">Card footer</p>
						}
					>
						<p className="text-sm text-typography-secondary">
							Card content with some descriptive text.
						</p>
					</Card>
				))}
			</div>
		),
	},
]
