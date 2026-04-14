"use client"

import { Breadcrumbs } from "../../../../packages/ui/src/registry/versions/0.3.0/components/breadcrumbs"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Navigation breadcrumb trail",
		code: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Button" },
  ]}
/>`,
		render: () => (
			<div className="flex flex-col gap-6">
				<Breadcrumbs
					items={[
						{ label: "Home", href: "/" },
						{ label: "Components", href: "/components" },
						{ label: "Button" },
					]}
				/>
				<Breadcrumbs
					items={[
						{ label: "Dashboard", href: "/" },
						{ label: "Projects", href: "/projects" },
						{ label: "BCT UI", href: "/projects/bct-ui" },
						{ label: "Settings" },
					]}
				/>
			</div>
		),
	},
]
