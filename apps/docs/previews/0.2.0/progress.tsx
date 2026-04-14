"use client"

import { Progress } from "../../../../packages/ui/src/registry/versions/0.2.0/components/progress"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Progress bar at various completion states",
		code: `<Progress value={25} label="Uploading..." />
<Progress value={60} label="Processing" />
<Progress value={100} label="Complete!" />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<Progress value={25} label="Uploading..." />
				<Progress value={60} label="Processing" />
				<Progress value={100} label="Complete!" />
				<Progress value={45} />
			</div>
		),
	},
]
