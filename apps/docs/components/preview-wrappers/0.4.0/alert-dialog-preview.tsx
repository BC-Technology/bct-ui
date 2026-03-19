"use client"

import { useState } from "react"
import { AlertDialog } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/alert-dialog"
import { Button } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import type { VariantExample } from "../types"

function PrimaryConfirmPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>Save Changes</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Save Changes?"
				description="Are you sure you want to save these changes? This action cannot be undone."
				confirmLabel="Save"
				cancelLabel="Cancel"
				onConfirm={() => {
					setOpen(false)
				}}
				onCancel={() => setOpen(false)}
			/>
		</>
	)
}

function ErrorConfirmPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button variant="error" onClick={() => setOpen(true)}>
				Delete Account
			</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Delete Account?"
				description="This will permanently delete your account and all associated data. This action cannot be undone."
				confirmLabel="Delete"
				cancelLabel="Cancel"
				confirmVariant="error"
				onConfirm={() => {
					setOpen(false)
				}}
				onCancel={() => setOpen(false)}
			/>
		</>
	)
}

function WarningConfirmPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button variant="secondary" onClick={() => setOpen(true)}>
				Reset Settings
			</Button>
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title="Reset Settings?"
				description="This will reset all settings to their default values. You will need to reconfigure your preferences."
				confirmLabel="Reset"
				cancelLabel="Cancel"
				confirmVariant="warning"
				onConfirm={() => {
					setOpen(false)
				}}
				onCancel={() => setOpen(false)}
			/>
		</>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Primary Confirm",
		description: "Standard confirmation dialog",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Save Changes</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Save Changes?"
  description="Are you sure you want to save these changes?"
  confirmLabel="Save"
  cancelLabel="Cancel"
  onConfirm={() => {
    console.log("Confirmed")
    setOpen(false)
  }}
  onCancel={() => setOpen(false)}
/>`,
		preview: <PrimaryConfirmPreview />,
	},
	{
		name: "Error Confirm",
		description: "Destructive action confirmation",
		code: `const [open, setOpen] = useState(false)

<Button variant="error" onClick={() => setOpen(true)}>Delete Account</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete Account?"
  description="This will permanently delete your account and all data."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  confirmVariant="error"
  onConfirm={() => {
    console.log("Deleted")
    setOpen(false)
  }}
  onCancel={() => setOpen(false)}
/>`,
		preview: <ErrorConfirmPreview />,
	},
	{
		name: "Warning Confirm",
		description: "Warning confirmation dialog",
		code: `const [open, setOpen] = useState(false)

<Button variant="secondary" onClick={() => setOpen(true)}>Reset Settings</Button>
<AlertDialog
  open={open}
  onOpenChange={setOpen}
  title="Reset Settings?"
  description="This will reset all settings to their default values."
  confirmLabel="Reset"
  cancelLabel="Cancel"
  confirmVariant="warning"
  onConfirm={() => {
    console.log("Reset")
    setOpen(false)
  }}
  onCancel={() => setOpen(false)}
/>`,
		preview: <WarningConfirmPreview />,
	},
]
