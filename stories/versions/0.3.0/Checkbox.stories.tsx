import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Checkbox } from "@/registry/versions/0.3.0/components/checkbox"

const meta = {
	title: "Components/0.3.0/Checkbox",
	component: Checkbox,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { label: "Accept terms and conditions" },
}

export const Checked: Story = {
	args: { label: "I agree", defaultChecked: true },
}

export const Disabled: Story = {
	args: { label: "Disabled checkbox", disabled: true },
}

export const DisabledChecked: Story = {
	args: { label: "Disabled and checked", disabled: true, defaultChecked: true },
}

export const CardVariant: Story = {
	args: { label: "Enable feature", variant: "card" },
}

export const CardVariantChecked: Story = {
	args: { label: "Feature enabled", variant: "card", defaultChecked: true },
}

export const CardGroup: Story = {
	render: () => (
		<div className="flex w-64 flex-col gap-2">
			<Checkbox label="Option A" variant="card" />
			<Checkbox label="Option B" variant="card" defaultChecked />
			<Checkbox label="Option C" variant="card" />
			<Checkbox label="Option D (disabled)" variant="card" disabled />
		</div>
	),
}

export const Group: Story = {
	render: () => (
		<div className="flex flex-col gap-2">
			<Checkbox label="Option 1" />
			<Checkbox label="Option 2" defaultChecked />
			<Checkbox label="Option 3" />
			<Checkbox label="Option 4 (disabled)" disabled />
		</div>
	),
}
