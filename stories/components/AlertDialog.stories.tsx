import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
import { AlertDialog } from "../../packages/ui/src/registry/versions/0.2.0/components/alert-dialog"
import { Button } from "../../packages/ui/src/registry/versions/0.2.0/components/button"

const meta = {
	title: "Components/AlertDialog",
	component: AlertDialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)} variant="secondary">
					Delete Item
				</Button>
				<AlertDialog
					open={open}
					onOpenChange={setOpen}
					title="Are you sure?"
					description="This action cannot be undone. This will permanently delete the item."
					cancelText="Cancel"
					confirmText="Delete"
					onConfirm={() => {
						// biome-ignore lint/suspicious/noConsole: allowed in stories
						console.log("Confirmed")
						setOpen(false)
					}}
				/>
			</>
		)
	},
}

export const Destructive: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)} variant="secondary">
					Delete Account
				</Button>
				<AlertDialog
					open={open}
					onOpenChange={setOpen}
					title="Delete Account"
					description="Are you absolutely sure? This will permanently delete your account and remove all your data from our servers."
					cancelText="Cancel"
					confirmText="Delete Account"
					onConfirm={() => {
						// biome-ignore lint/suspicious/noConsole: allowed in stories
						console.log("Account deleted")
						setOpen(false)
					}}
				/>
			</>
		)
	},
}
