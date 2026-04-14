"use client"

import { Avatar } from "../../../../packages/ui/src/registry/versions/0.3.0/components/avatar"
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
		name: "Shapes",
		description: "Circle (default) and square shapes",
		code: `<Avatar fallback="JD" shape="circle" />
<Avatar fallback="JD" shape="square" />`,
		render: () => (
			<div className="flex items-center gap-4">
				<Avatar fallback="JD" shape="circle" />
				<Avatar fallback="JD" shape="square" />
				<Avatar fallback="AB" />
			</div>
		),
	},
]
