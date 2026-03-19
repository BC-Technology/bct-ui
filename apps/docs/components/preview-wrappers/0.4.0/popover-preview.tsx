"use client"


import { Info } from "lucide-react"
import { useState } from "react"
import { Button  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { Popover  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/popover"
import type { VariantExample } from "../types"

function BasicPopoverPreview() {
	const [open, setOpen] = useState(false)
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			trigger={<Button>Show Info</Button>}
		>
			<div className="max-w-xs p-4">
				<h3 className="mb-2 font-semibold text-typography-primary">
					Additional Information
				</h3>
				<p className="text-sm text-typography-secondary">
					This is some helpful information displayed in a popover. Click
					outside to close.
				</p>
			</div>
		</Popover>
	)
}

function IconTriggerPopoverPreview() {
	const [open, setOpen] = useState(false)
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			trigger={
				<Button variant="secondary" size="sm">
					<Info className="h-4 w-4" />
				</Button>
			}
		>
			<div className="max-w-xs p-3">
				<p className="text-sm text-typography-primary">
					Quick help tooltip content with useful information
				</p>
			</div>
		</Popover>
	)
}

function RichContentPopoverPreview() {
	const [open, setOpen] = useState(false)
	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			trigger={<Button variant="primary-muted">User Settings</Button>}
		>
			<div className="w-64 p-4">
				<h3 className="mb-3 font-semibold text-typography-primary">
					Quick Settings
				</h3>
				<div className="space-y-2">
					<label className="flex items-center gap-2">
						<input type="checkbox" />
						<span className="text-sm text-typography-primary">
							Enable notifications
						</span>
					</label>
					<label className="flex items-center gap-2">
						<input type="checkbox" defaultChecked />
						<span className="text-sm text-typography-primary">
							Auto-save changes
						</span>
					</label>
				</div>
				<div className="mt-4 flex gap-2">
					<Button size="sm" onClick={() => setOpen(false)}>
						Apply
					</Button>
					<Button
						size="sm"
						variant="secondary"
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
				</div>
			</div>
		</Popover>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Basic Popover",
		description: "Simple popover with text content",
		code: `const [open, setOpen] = useState(false)

<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Show Info</Button>}
>
  <div className="p-4">
    <h3 className="font-semibold mb-2">Additional Information</h3>
    <p className="text-sm text-typography-secondary">
      This is some helpful information displayed in a popover.
    </p>
  </div>
</Popover>`,
		preview: <BasicPopoverPreview />,
	},
	{
		name: "With Icon Trigger",
		description: "Popover triggered by an icon button",
		code: `const [open, setOpen] = useState(false)

<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={
    <Button variant="secondary" size="sm">
      <Info className="h-4 w-4" />
    </Button>
  }
>
  <div className="p-3">
    <p className="text-sm">Quick help tooltip content</p>
  </div>
</Popover>`,
		preview: <IconTriggerPopoverPreview />,
	},
	{
		name: "Rich Content",
		description: "Popover with formatted content and actions",
		code: `const [open, setOpen] = useState(false)

<Popover
  open={open}
  onOpenChange={setOpen}
  trigger={<Button variant="primary-muted">User Settings</Button>}
>
  <div className="p-4 w-64">
    <h3 className="font-semibold mb-3">Quick Settings</h3>
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" />
        <span className="text-sm">Enable notifications</span>
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        <span className="text-sm">Auto-save changes</span>
      </label>
    </div>
    <div className="mt-4 flex gap-2">
      <Button size="sm" onClick={() => setOpen(false)}>Apply</Button>
      <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    </div>
  </div>
</Popover>`,
		preview: <RichContentPopoverPreview />,
	},
]
