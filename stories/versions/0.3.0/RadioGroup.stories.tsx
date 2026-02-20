import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Radio } from "@/registry/versions/0.3.0/components/radio"
// @ts-expect-error
import { RadioGroup } from "@/registry/versions/0.3.0/components/radio-group"

const meta = {
	title: "Components/0.3.0/RadioGroup",
	component: RadioGroup,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
	render: () => (
		<RadioGroup label="Choose an option" orientation="vertical">
			<Radio label="Option 1" value="1" />
			<Radio label="Option 2" value="2" />
			<Radio label="Option 3" value="3" />
		</RadioGroup>
	),
}

export const Horizontal: Story = {
	render: () => (
		<RadioGroup label="Size" orientation="horizontal">
			<Radio label="Small" value="sm" />
			<Radio label="Medium" value="md" />
			<Radio label="Large" value="lg" />
		</RadioGroup>
	),
}

export const CardVariant: Story = {
	render: () => (
		<RadioGroup label="Plan" orientation="vertical">
			<Radio label="Starter" value="starter" variant="card" />
			<Radio label="Pro" value="pro" variant="card" />
			<Radio label="Enterprise" value="enterprise" variant="card" />
		</RadioGroup>
	),
}

export const WithDefaultValue: Story = {
	render: () => (
		<RadioGroup label="Preferred contact" defaultValue="email">
			<Radio label="Email" value="email" />
			<Radio label="Phone" value="phone" />
			<Radio label="SMS" value="sms" />
		</RadioGroup>
	),
}
