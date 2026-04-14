"use client"

import { Badge } from "../../../../packages/ui/src/registry/versions/0.3.0/components/badge"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Color Variants",
		description: "All available badge variants",
		code: `<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Badge variant="default">Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="success">Success</Badge>
				<Badge variant="warning">Warning</Badge>
				<Badge variant="error">Error</Badge>
				<Badge variant="info">Info</Badge>
			</div>
		),
	},
	{
		name: "Muted Variants",
		description: "Softer muted versions",
		code: `<Badge variant="primary-muted">Primary</Badge>
<Badge variant="success-muted">Success</Badge>
<Badge variant="warning-muted">Warning</Badge>
<Badge variant="error-muted">Error</Badge>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Badge variant="primary-muted">Primary</Badge>
				<Badge variant="success-muted">Success</Badge>
				<Badge variant="warning-muted">Warning</Badge>
				<Badge variant="error-muted">Error</Badge>
				<Badge variant="info-muted">Info</Badge>
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
