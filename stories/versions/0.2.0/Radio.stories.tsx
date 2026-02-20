import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Radio } from "@/registry/versions/0.2.0/components/radio"

const meta = {
	title: "Components/0.2.0/Radio",
	component: Radio,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Option 1",
		value: "option1",
	},
}

export const Checked: Story = {
	args: {
		label: "Selected option",
		value: "selected",
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled option",
		value: "disabled",
		disabled: true,
	},
}
