"use client"

import { Plus, Trash2 } from "lucide-react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Color Variants",
		description: "All available color variants",
		code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="error">Error</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="tertiary">Tertiary</Button>
				<Button variant="error">Error</Button>
				<Button variant="success">Success</Button>
				<Button variant="warning">Warning</Button>
				<Button variant="info">Info</Button>
			</div>
		),
	},
	{
		name: "Muted Variants",
		description: "Softer muted versions of each color variant",
		code: `<Button variant="primary-muted">Primary</Button>
<Button variant="secondary-muted">Secondary</Button>
<Button variant="tertiary-muted">Tertiary</Button>
<Button variant="error-muted">Error</Button>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Button variant="primary-muted">Primary</Button>
				<Button variant="secondary-muted">Secondary</Button>
				<Button variant="tertiary-muted">Tertiary</Button>
				<Button variant="error-muted">Error</Button>
				<Button variant="success-muted">Success</Button>
				<Button variant="warning-muted">Warning</Button>
				<Button variant="info-muted">Info</Button>
			</div>
		),
	},
	{
		name: "Sizes",
		description: "Small, medium (default), and large sizes",
		code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</div>
		),
	},
	{
		name: "Icon Button",
		description: "Square icon-only button with all sizes",
		code: `<Button variant="icon" size="sm"><Plus className="h-4 w-4" /></Button>
<Button variant="icon" size="md"><Plus className="h-4 w-4" /></Button>
<Button variant="icon" size="lg"><Plus className="h-5 w-5" /></Button>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Button variant="icon" size="sm">
					<Plus className="h-4 w-4" />
				</Button>
				<Button variant="icon" size="md">
					<Plus className="h-4 w-4" />
				</Button>
				<Button variant="icon" size="lg">
					<Plus className="h-5 w-5" />
				</Button>
				<Button variant="icon">
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		),
	},
	{
		name: "Disabled",
		description: "Disabled state across variants",
		code: `<Button disabled>Primary</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="tertiary" disabled>Tertiary</Button>`,
		render: () => (
			<div className="flex flex-wrap items-center gap-3">
				<Button disabled>Primary</Button>
				<Button variant="secondary" disabled>
					Secondary
				</Button>
				<Button variant="tertiary" disabled>
					Tertiary
				</Button>
				<Button variant="error" disabled>
					Error
				</Button>
			</div>
		),
	},
]
