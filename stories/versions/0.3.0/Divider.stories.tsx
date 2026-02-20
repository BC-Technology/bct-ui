import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Divider } from "@/registry/versions/0.3.0/components/divider"

const meta = {
	title: "Components/0.3.0/Divider",
	component: Divider,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	render: () => (
		<div className="w-80">
			<p>Content above</p>
			<Divider />
			<p>Content below</p>
		</div>
	),
}

export const Vertical: Story = {
	render: () => (
		<div className="flex h-20 items-center gap-4">
			<span>Left</span>
			<Divider orientation="vertical" />
			<span>Right</span>
		</div>
	),
}
