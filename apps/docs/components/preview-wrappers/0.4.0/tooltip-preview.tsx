"use client"


import { HelpCircle, Info } from "lucide-react"
import { Button  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { Tooltip  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/tooltip"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Basic Tooltip",
		description: "Simple tooltip on hover",
		code: `<Tooltip content="This is a helpful tooltip">
  <Button>Hover me</Button>
</Tooltip>`,
		preview: (
			<Tooltip content="This is a helpful tooltip">
				<Button>Hover me</Button>
			</Tooltip>
		),
	},
	{
		name: "Icon with Tooltip",
		description: "Tooltip on icon button",
		code: `<Tooltip content="Get help and support">
  <Button variant="secondary" size="sm">
    <HelpCircle className="h-4 w-4" />
  </Button>
</Tooltip>`,
		preview: (
			<Tooltip content="Get help and support">
				<Button variant="secondary" size="sm">
					<HelpCircle className="h-4 w-4" />
				</Button>
			</Tooltip>
		),
	},
	{
		name: "Info Tooltip",
		description: "Informational tooltip",
		code: `<Tooltip content="Additional information about this feature">
  <span className="inline-flex items-center gap-1 text-sm">
    Feature Name
    <Info className="h-4 w-4 text-typography-muted" />
  </span>
</Tooltip>`,
		preview: (
			<Tooltip content="Additional information about this feature">
				<span className="inline-flex items-center gap-1 text-sm text-typography-primary">
					Feature Name
					<Info className="h-4 w-4 text-typography-muted" />
				</span>
			</Tooltip>
		),
	},
]
