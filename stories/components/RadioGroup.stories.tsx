import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { RadioGroup } from "@/registry/versions/0.2.0/components/radio-group"

const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
	args: {
		label: "Choose an option",
		children: [
			<p key="1">Option 1</p>,
			<p key="2">Option 2</p>,
			<p key="3">Option 3</p>,
		],
		orientation: "vertical",
	},
}

export const Horizontal: Story = {
	args: {
		label: "Choose an option",
		children: [
			<p key="1">Small</p>,
			<p key="2">Medium</p>,
			<p key="3">Large</p>,
		],
		orientation: "horizontal",
	},
}

export const WithDefaultValue: Story = {
	args: {
		label: "Size",
		children: [
			<p key="1">Extra Small</p>,
			<p key="2">Small</p>,
			<p key="3">Medium</p>,
			<p key="4">Large</p>,
		],
		defaultValue: "3",
	},
}

export const WithDisabledOption: Story = {
	args: {
		label: "Select payment method",
		children: [
			<p key="1">Credit Card</p>,
			<p key="2">PayPal</p>,
			<p key="3">Bank Transfer</p>,
		],
	},
}
