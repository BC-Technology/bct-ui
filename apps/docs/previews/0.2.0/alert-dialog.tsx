"use client"

import { useState } from "react"
import { AlertDialog } from "../../../../packages/ui/src/registry/versions/0.2.0/components/alert-dialog"
import { Button } from "../../../../packages/ui/src/registry/versions/0.2.0/components/button"
import type { VariantPreview } from "../types"

function DeleteAlertDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Delete Account</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Are you absolutely sure?"
				description="This action cannot be undone. This will permanently delete your account and remove all your data from our servers."
				confirmText="Delete Account"
				cancelText="Cancel"
				variant="danger"
				onConfirm={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			/>
		</>
	)
}

function ConfirmAlertDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Publish Changes</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Publish to production?"
				description="This will make your changes live immediately. Make sure you've tested everything."
				confirmText="Publish"
				cancelText="Review again"
				onConfirm={() => setOpen(false)}
				onCancel={() => setOpen(false)}
			/>
		</>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Destructive",
		description: "Alert dialog for irreversible destructive actions",
		code: `<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Are you absolutely sure?"
  description="This action cannot be undone."
  confirmText="Delete Account"
  variant="danger"
  onConfirm={() => handleDelete()}
  onCancel={() => setOpen(false)}
/>`,
		render: () => <DeleteAlertDemo />,
	},
	{
		name: "Confirm",
		description: "Confirmation dialog for important actions",
		code: `<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Publish to production?"
  description="This will make your changes live immediately."
  confirmText="Publish"
  onConfirm={() => handlePublish()}
/>`,
		render: () => <ConfirmAlertDemo />,
	},
]
