"use client"

import { useState } from "react"
import { Button } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/button"
import { Dialog } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/dialog"
import type { VariantExample } from "../types"

function PanelSmallPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Panel (Small)</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Settings"
				description="Manage your account settings and preferences."
			>
				<div className="space-y-4">
					<p className="text-sm text-typography-secondary">
						This is a small side panel dialog. It slides in from the right side
						of the screen.
					</p>
					<div className="space-y-2">
						<label className="block font-medium text-sm" htmlFor="display-name">
							Display Name
						</label>
						<input
							id="display-name"
							type="text"
							className="w-full rounded border border-border px-3 py-2"
							placeholder="Enter your name"
						/>
					</div>
				</div>
			</Dialog>
		</>
	)
}

function PanelMediumPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Panel (Medium)</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Edit Profile"
				description="Make changes to your profile here. Click save when you're done."
			>
				<div className="space-y-4">
					<p className="text-sm text-typography-secondary">
						This is a medium-sized side panel with more space for content.
					</p>
					<div className="space-y-4">
						<div>
							<label className="mb-1 block font-medium text-sm" htmlFor="name">
								Name
							</label>
							<input
								id="name"
								type="text"
								className="w-full rounded border border-border px-3 py-2"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label className="mb-1 block font-medium text-sm" htmlFor="email">
								Email
							</label>
							<input
								id="email"
								type="email"
								className="w-full rounded border border-border px-3 py-2"
								placeholder="your@email.com"
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	)
}

function ModalSmallPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Modal (Small)</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Confirm Action"
				description="Are you sure you want to proceed with this action?"
			>
				<div className="space-y-4">
					<p className="text-sm text-typography-secondary">
						This is a small centered modal dialog that appears in the middle of
						the screen.
					</p>
					<div className="flex justify-end gap-2">
						<Button variant="secondary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</div>
				</div>
			</Dialog>
		</>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Panel Mode - Small",
		description: "Side panel dialog with small size",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open Settings</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Settings"
  description="Manage your account settings and preferences."
>
  <div className="grid gap-4 py-4">
    <p>Panel content goes here...</p>
  </div>
</Dialog>`,
		preview: <PanelSmallPreview />,
	},
	{
		name: "Panel Mode - Medium",
		description: "Side panel dialog with medium size",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open Dialog</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Edit Profile"
  description="Make changes to your profile here. Click save when you're done."
>
  <div className="grid gap-4 py-4">
    <p>Panel content goes here...</p>
  </div>
</Dialog>`,
		preview: <PanelMediumPreview />,
	},
	{
		name: "Modal Mode - Small",
		description: "Centered modal dialog",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open Modal</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed with this action?"
>
  <div className="flex justify-end gap-3 mt-6">
    <p>Modal content goes here...</p>
    <div className="flex justify-end gap-2">
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={() => setOpen(false)}>Confirm</Button>
    </div>
  </div>
</Dialog>`,
		preview: <ModalSmallPreview />,
	},
]
