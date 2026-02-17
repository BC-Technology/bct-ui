import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.2.0/components/button"
// @ts-expect-error
import { Popover } from "@/registry/versions/0.2.0/components/popover"

const meta = {
	title: "Components/Popover",
	component: Popover,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		trigger: <Button>Open Popover</Button>,
		children: (
			<div className="p-4">
				<h3 className="font-semibold">Popover Title</h3>
				<p className="mt-2 text-sm">This is the popover content.</p>
			</div>
		),
	},
}

export const WithForm: Story = {
	args: {
		trigger: <Button>Quick Add</Button>,
		children: (
			<div className="w-64 p-4">
				<h3 className="mb-3 font-semibold">Add Item</h3>
				<input
					type="text"
					placeholder="Item name"
					className="mb-2 w-full rounded-md border border-border px-3 py-2"
				/>
				<Button className="w-full">Add</Button>
			</div>
		),
	},
}
