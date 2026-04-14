"use client"

import { ChevronDown, Copy, Edit, MoreHorizontal, Share, Trash2 } from "lucide-react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { DropdownMenu } from "../../../../packages/ui/src/registry/versions/0.4.0/components/dropdown-menu"
import type { VariantPreview } from "../types"

const actions = [
	{ value: "edit", label: "Edit", icon: <Edit className="h-4 w-4" />, onClick: () => {} },
	{ value: "copy", label: "Copy link", icon: <Copy className="h-4 w-4" />, onClick: () => {} },
	{ value: "share", label: "Share", icon: <Share className="h-4 w-4" />, onClick: () => {} },
	{
		value: "delete",
		label: "Delete",
		icon: <Trash2 className="h-4 w-4 text-error" />,
		onClick: () => {},
	},
]

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Dropdown menu with icon-enhanced items",
		code: `<DropdownMenu
  trigger={
    <Button variant="tertiary">
      Actions <ChevronDown className="h-4 w-4" />
    </Button>
  }
  items={[
    { value: "edit", label: "Edit", icon: <Edit className="h-4 w-4" /> },
    { value: "copy", label: "Copy link", icon: <Copy className="h-4 w-4" /> },
    { value: "delete", label: "Delete", icon: <Trash2 className="h-4 w-4" /> },
  ]}
/>`,
		render: () => (
			<div className="flex items-center justify-center gap-4">
				<DropdownMenu
					trigger={
						<Button variant="tertiary">
							Actions <ChevronDown className="h-4 w-4" />
						</Button>
					}
					items={actions}
				/>
				<DropdownMenu
					trigger={
						<Button variant="icon">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					}
					items={actions}
				/>
			</div>
		),
	},
]
