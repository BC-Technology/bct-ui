import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Radio } from "@/registry/versions/0.3.0/components/radio"

const meta = {
	title: "Components/0.3.0/Radio",
	component: Radio,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { label: "Option 1", value: "option1" },
}

export const CardVariant: Story = {
	args: { label: "Card Option", value: "card", variant: "card" },
}

export const Disabled: Story = {
	args: { label: "Disabled option", value: "disabled", disabled: true },
}

export const BothVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<p className="font-medium text-text-sm text-typography-muted">Inline</p>
				<Radio label="Option A" value="a" />
				<Radio label="Option B" value="b" />
			</div>
			<div className="flex flex-col gap-2">
				<p className="font-medium text-text-sm text-typography-muted">Card</p>
				<Radio label="Option A" value="a" variant="card" />
				<Radio label="Option B" value="b" variant="card" />
			</div>
		</div>
	),
}
