import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.2.0/components/button"
// @ts-expect-error
import { Dialog } from "@/registry/versions/0.2.0/components/dialog"

const meta = {
	title: "Components/0.2.0/Dialog",
	component: Dialog,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Dialog</Button>
				<Dialog
					open={open}
					onOpenChange={setOpen}
					title="Dialog Title"
					description="This is a dialog description explaining what this dialog is about."
				>
					<div className="py-4">
						<p>Dialog content goes here.</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="tertiary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</div>
				</Dialog>
			</>
		)
	},
}

export const WithForm: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
				<Dialog
					open={open}
					onOpenChange={setOpen}
					title="Create Account"
					description="Enter your details to create a new account."
				>
					<div className="flex flex-col gap-4 py-4">
						<input
							type="text"
							placeholder="Name"
							className="rounded-md border border-border px-3 py-2"
						/>
						<input
							type="email"
							placeholder="Email"
							className="rounded-md border border-border px-3 py-2"
						/>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="tertiary" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button onClick={() => setOpen(false)}>Create</Button>
					</div>
				</Dialog>
			</>
		)
	},
}
