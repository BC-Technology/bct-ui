import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { Select } from "../../packages/ui/src/registry/versions/0.2.0/components/select"

const meta = {
	title: "Components/Select",
	component: Select,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		options: [
			{ value: "apple", label: "Apple" },
			{ value: "banana", label: "Banana" },
			{ value: "orange", label: "Orange" },
		],
		placeholder: "Select a fruit",
	},
}

export const WithLabel: Story = {
	args: {
		label: "Country",
		options: [
			{ value: "us", label: "United States" },
			{ value: "uk", label: "United Kingdom" },
			{ value: "ca", label: "Canada" },
			{ value: "au", label: "Australia" },
		],
		placeholder: "Select your country",
	},
}

export const WithError: Story = {
	args: {
		label: "Category",
		options: [
			{ value: "tech", label: "Technology" },
			{ value: "design", label: "Design" },
			{ value: "business", label: "Business" },
		],
		error: "Please select a category",
	},
}

export const WithDisabledOptions: Story = {
	args: {
		label: "Size",
		options: [
			{ value: "xs", label: "Extra Small" },
			{ value: "s", label: "Small" },
			{ value: "m", label: "Medium" },
			{ value: "l", label: "Large", disabled: true },
			{ value: "xl", label: "Extra Large", disabled: true },
		],
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled Select",
		options: [
			{ value: "1", label: "Option 1" },
			{ value: "2", label: "Option 2" },
		],
		disabled: true,
	},
}
