"use client"

import { Button } from "../../../../packages/ui/src/registry/versions/0.3.0/components/button"
import { Tooltip } from "../../../../packages/ui/src/registry/versions/0.3.0/components/tooltip"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Positions",
		description: "Tooltip can be placed on any side of the trigger",
		code: `<Tooltip content="Tooltip on top" side="top">
  <Button variant="tertiary">Top</Button>
</Tooltip>
<Tooltip content="Tooltip on right" side="right">
  <Button variant="tertiary">Right</Button>
</Tooltip>`,
		render: () => (
			<div className="flex flex-wrap items-center justify-center gap-6">
				<Tooltip content="Tooltip on top" side="top">
					<Button variant="tertiary">Top</Button>
				</Tooltip>
				<Tooltip content="Tooltip on right" side="right">
					<Button variant="tertiary">Right</Button>
				</Tooltip>
				<Tooltip content="Tooltip on bottom" side="bottom">
					<Button variant="tertiary">Bottom</Button>
				</Tooltip>
				<Tooltip content="Tooltip on left" side="left">
					<Button variant="tertiary">Left</Button>
				</Tooltip>
			</div>
		),
	},
	{
		name: "Rich Content",
		description: "Tooltip with rich JSX content",
		code: `<Tooltip
  content={
    <div>
      <p className="font-medium">BCT UI v0.4.0</p>
      <p className="text-xs opacity-75">39 components available</p>
    </div>
  }
>
  <Button>Hover me</Button>
</Tooltip>`,
		render: () => (
			<div className="flex items-center justify-center">
				<Tooltip
					content={
						<div>
							<p className="font-medium">BCT UI v0.4.0</p>
							<p className="text-xs opacity-75">39 components available</p>
						</div>
					}
				>
					<Button>Hover me</Button>
				</Tooltip>
			</div>
		),
	},
]
