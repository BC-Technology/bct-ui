import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { TextInput } from "@/registry/versions/0.3.0/components/text-input"

const meta = {
	title: "Components/0.3.0/TextInput",
	component: TextInput,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		label: { control: "text", description: "Label text for the input" },
		error: { control: "text", description: "Error message to display" },
		helperText: { control: "text", description: "Helper text to display below the input" },
		disabled: { control: "boolean", description: "Whether the input is disabled" },
	},
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { placeholder: "Enter text..." },
}

export const WithLabel: Story = {
	args: { label: "Email Address", placeholder: "you@example.com" },
}

export const WithHelperText: Story = {
	args: { label: "Username", placeholder: "johndoe", helperText: "Choose a unique username" },
}

export const WithError: Story = {
	args: {
		label: "Email",
		placeholder: "you@example.com",
		error: "Please enter a valid email address",
	},
}

export const Disabled: Story = {
	args: { label: "Disabled Input", placeholder: "Cannot edit", disabled: true },
}

export const WithValue: Story = {
	args: { label: "Name", defaultValue: "John Doe" },
}

export const AllStates: Story = {
	render: () => (
		<div className="flex w-80 flex-col gap-4">
			<TextInput label="Normal" placeholder="Enter text..." />
			<TextInput label="With Helper Text" placeholder="Enter text..." helperText="This is helper text" />
			<TextInput label="With Error" placeholder="Enter text..." error="This field is required" />
			<TextInput label="Disabled" placeholder="Cannot edit" disabled />
		</div>
	),
}
