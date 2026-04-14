"use client"

import { useState } from "react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.2.0/components/button"
import { Dialog } from "../../../../packages/ui/src/registry/versions/0.2.0/components/dialog"
import type { VariantPreview } from "../types"

function EditProfileDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Edit Profile</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Edit Profile"
				description="Make changes to your profile information."
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="edit-name"
							className="font-medium text-sm text-typography-primary"
						>
							Name
						</label>
						<input
							id="edit-name"
							className="rounded-md border border-border bg-surface-1 px-3 py-2 text-sm"
							defaultValue="Jonas Blendstrup"
						/>
					</div>
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="edit-email"
							className="font-medium text-sm text-typography-primary"
						>
							Email
						</label>
						<input
							id="edit-email"
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

function CreateProjectDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Create Project</Button>
			<Dialog
				open={open}
				onOpenChange={setOpen}
				title="Create Project"
				description="Set up a new project for your team."
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="create-project-name"
							className="font-medium text-sm text-typography-primary"
						>
							Project name
						</label>
						<input
							id="create-project-name"
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
		name: "Default",
		description: "Dialog with title, description, and custom content",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Edit Profile</Button>
<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Edit Profile"
  description="Make changes to your profile."
>
  {/* dialog content */}
</Dialog>`,
		render: () => <EditProfileDemo />,
	},
	{
		name: "Create Form",
		description: "Dialog used as a creation form",
		code: `<Dialog
  open={open}
  onOpenChange={setOpen}
  title="Create Project"
  description="Set up a new project."
>
  {/* form content */}
</Dialog>`,
		render: () => <CreateProjectDemo />,
	},
]
