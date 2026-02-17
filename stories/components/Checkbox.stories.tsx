import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Checkbox } from "@/registry/versions/0.2.0/components/checkbox"

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Accept terms and conditions",
	},
}

export const Checked: Story = {
	args: {
		label: "I agree",
		defaultChecked: true,
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled checkbox",
		disabled: true,
	},
}

export const DisabledChecked: Story = {
	args: {
		label: "Disabled and checked",
		disabled: true,
		defaultChecked: true,
	},
}

export const WithoutLabel: Story = {
	args: {},
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
