"use client"

import { useState } from "react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { Dialog } from "../../../../packages/ui/src/registry/versions/0.4.0/components/dialog"
import type { VariantPreview } from "../types"

function PanelDialogDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Side Panel</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Edit Profile"
				description="Make changes to your profile information."
				mode="panel"
				size="xl"
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label
							className="font-medium text-sm text-typography-primary"
							htmlFor="name"
						>
							Name
						</label>
						<input
							id="name"
							className="rounded-md border border-border bg-surface-1 px-3 py-2 text-sm"
							defaultValue="Jonas Blendstrup"
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label
							className="font-medium text-sm text-typography-primary"
							htmlFor="email"
						>
							Email
						</label>
						<input
							id="email"
							className="rounded-md border border-border bg-surface-1 px-3 py-2 text-sm"
							defaultValue="jonas@bctechnology.dk"
						/>
					</div>
					<div className="mt-4 flex justify-end gap-3">
						<Button variant="tertiary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Save changes</Button>
					</div>
				</div>
			</Dialog>
		</>
	)
}

function ModalDialogDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Open Modal</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Create Project"
				description="Set up a new project for your team."
				mode="modal"
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label
							className="font-medium text-sm text-typography-primary"
							htmlFor="project-name"
						>
							Project name
						</label>
						<input
							id="project-name"
							className="rounded-md border border-border bg-surface-1 px-3 py-2 text-sm"
							placeholder="My awesome project"
						/>
					</div>
					<div className="mt-2 flex justify-end gap-3">
						<Button variant="tertiary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Create</Button>
					</div>
				</div>
			</Dialog>
		</>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Side Panel",
		description: "Slides in from the right (default mode)",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open Panel</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Edit Profile"
  description="Make changes to your profile."
  mode="panel"
>
  {/* dialog content */}
</Dialog>`,
		render: () => <PanelDialogDemo />,
	},
	{
		name: "Modal",
		description: "Centered modal dialog",
		code: `<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Create Project"
  mode="modal"
>
  {/* dialog content */}
</Dialog>`,
		render: () => <ModalDialogDemo />,
	},
]
