import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Spinner } from "@/registry/versions/0.3.0/components/spinner"

const meta = {
	title: "Components/0.3.0/Spinner",
	component: Spinner,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
	args: { size: "sm" },
}

export const Medium: Story = {
	args: { size: "md" },
}

export const Large: Story = {
	args: { size: "lg" },
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Spinner size="sm" />
			<Spinner size="md" />
			<Spinner size="lg" />
		</div>
	),
}
