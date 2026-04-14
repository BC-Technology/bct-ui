"use client"

import { Divider } from "../../../../packages/ui/src/registry/versions/0.4.0/components/divider"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Horizontal",
		description: "Default horizontal divider, optionally with label",
		code: `<Divider />
<Divider label="Or" />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Divider />
				<Divider label="Or continue with" />
			</div>
		),
	},
]
