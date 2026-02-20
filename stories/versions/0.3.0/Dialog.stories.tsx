import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"
// @ts-expect-error
import { Dialog } from "@/registry/versions/0.3.0/components/dialog"

const meta = {
	title: "Components/0.3.0/Dialog",
	component: Dialog,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Panel: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Panel</Button>
				<Dialog open={open} onOpenChange={setOpen} mode="panel" title="Panel Dialog">
					<div className="py-4">
						<p>This is a slide-in panel dialog (default mode).</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</div>
				</Dialog>
			</>
		)
	},
}

export const Modal: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Modal</Button>
				<Dialog open={open} onOpenChange={setOpen} mode="modal" title="Modal Dialog">
					<div className="py-4">
						<p>This is a centered modal dialog.</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
						<Button onClick={() => setOpen(false)}>Confirm</Button>
					</div>
				</Dialog>
			</>
		)
	},
}

export const PanelSizes: Story = {
	render: () => {
		const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | null>(null)
		return (
			<>
				<div className="flex gap-2">
					{(["sm", "md", "lg", "xl"] as const).map((s) => (
						<Button key={s} variant="secondary" onClick={() => setSize(s)}>
							{s.toUpperCase()}
						</Button>
					))}
				</div>
				{size && (
					<Dialog
						open
						onOpenChange={() => setSize(null)}
						mode="panel"
						size={size}
						title={`Panel size: ${size}`}
					>
						<p className="py-4">Panel with size "{size}".</p>
						<div className="flex justify-end">
							<Button onClick={() => setSize(null)}>Close</Button>
						</div>
					</Dialog>
				)}
			</>
		)
	},
}

export const WithForm: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>Open Form Panel</Button>
				<Dialog
					open={open}
					onOpenChange={setOpen}
					mode="panel"
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
						<Button variant="tertiary" onClick={() => setOpen(false)}>Cancel</Button>
						<Button onClick={() => setOpen(false)}>Create</Button>
					</div>
				</Dialog>
			</>
		)
	},
}
