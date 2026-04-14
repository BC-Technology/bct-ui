"use client"

import { Avatar } from "../../../../packages/ui/src/registry/versions/0.2.0/components/avatar"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Sizes",
		description: "All four available sizes",
		code: `<Avatar size="sm" fallback="AB" />
<Avatar size="md" fallback="AB" />
<Avatar size="lg" fallback="AB" />
<Avatar size="xl" fallback="AB" />`,
		render: () => (
			<div className="flex items-end gap-4">
				<Avatar size="sm" fallback="AB" />
				<Avatar size="md" fallback="AB" />
				<Avatar size="lg" fallback="AB" />
				<Avatar size="xl" fallback="AB" />
			</div>
		),
	},
	{
		name: "With Image",
		description: "Avatar with image and fallback text",
		code: `<Avatar fallback="JD" />
<Avatar fallback="AB" />`,
		render: () => (
			<div className="flex items-center gap-4">
				<Avatar fallback="JD" />
				<Avatar fallback="AB" />
				<Avatar fallback="XY" />
			</div>
		),
	},
]
