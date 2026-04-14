"use client"

import { Spinner } from "../../../../packages/ui/src/registry/versions/0.3.0/components/spinner"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Sizes",
		description: "Small, medium (default), and large sizes",
		code: `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`,
		render: () => (
			<div className="flex items-center gap-6">
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</div>
		),
	},
]
