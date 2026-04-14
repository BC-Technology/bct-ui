"use client"

import { Badge } from "../../../../packages/ui/src/registry/versions/0.2.0/components/badge"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Color Variants",
		description: "All available badge variants",
		code: `<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Badge variant="primary">Primary</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="error">Error</Badge>
				<Badge variant="info">Info</Badge>
			</div>
		),
	},
	{
		name: "Sizes",
		description: "Small, medium, and large sizes",
		code: `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Badge size="sm" variant="primary">
					Small
				</Badge>
				<Badge size="md" variant="primary">
					Medium
				</Badge>
				<Badge size="lg" variant="primary">
					Large
				</Badge>
			</div>
		),
	},
]
