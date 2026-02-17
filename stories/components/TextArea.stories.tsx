import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { TextArea } from "../../packages/ui/src/registry/versions/0.2.0/components/text-area"

const meta = {
	title: "Components/TextArea",
	component: TextArea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		placeholder: "Enter your message...",
	},
}

export const WithLabel: Story = {
	args: {
		label: "Description",
		placeholder: "Describe your project...",
	},
}

export const WithHelperText: Story = {
	args: {
		label: "Bio",
		placeholder: "Tell us about yourself...",
		helperText: "Maximum 500 characters",
	},
}

export const WithError: Story = {
	args: {
		label: "Message",
		placeholder: "Enter your message...",
		error: "Message is required",
	},
}

export const CustomRows: Story = {
	args: {
		label: "Comments",
		placeholder: "Add your comments...",
		rows: 6,
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		placeholder: "Cannot edit",
		disabled: true,
	},
}
