import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { NumberInput } from "@/registry/versions/0.2.0/components/number-input"

const meta = {
	title: "Components/NumberInput",
	component: NumberInput,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Quantity",
	},
}

export const WithMinMax: Story = {
	args: {
		label: "Age",
		min: 0,
		max: 120,
		defaultValue: 25,
	},
}

export const WithStep: Story = {
	args: {
		label: "Price",
		step: 0.01,
		defaultValue: 9.99,
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		disabled: true,
		defaultValue: 10,
	},
}
