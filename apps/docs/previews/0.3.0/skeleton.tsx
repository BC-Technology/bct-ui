"use client"

import { Skeleton } from "../../../../packages/ui/src/registry/versions/0.3.0/components/skeleton"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Variants",
		description: "Text, circular, and rectangular skeleton placeholders",
		code: `<Skeleton variant="text" width={240} />
<Skeleton variant="circular" />
<Skeleton variant="rectangular" width={240} height={80} />`,
		render: () => (
			<div className="flex w-full max-w-sm flex-col gap-4">
				<div className="space-y-2">
					<Skeleton variant="text" width={240} />
					<Skeleton variant="text" width={200} />
					<Skeleton variant="text" width={160} />
				</div>
				<div className="flex items-center gap-3">
					<Skeleton variant="circular" />
					<div className="space-y-2">
						<Skeleton variant="text" width={140} />
						<Skeleton variant="text" width={100} />
					</div>
				</div>
				<Skeleton variant="rectangular" width={300} height={80} />
			</div>
		),
	},
]
