import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { Switch } from "../../packages/ui/src/registry/versions/0.2.0/components/switch"

const meta = {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Enable notifications",
	},
}

export const Checked: Story = {
	args: {
		label: "Auto-save",
		defaultChecked: true,
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled switch",
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
		<div className="flex flex-col gap-3">
			<Switch label="Email notifications" defaultChecked />
			<Switch label="Push notifications" />
			<Switch label="SMS notifications" disabled />
		</div>
	),
}
