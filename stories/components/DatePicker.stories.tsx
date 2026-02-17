import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { DatePicker } from "../../packages/ui/src/registry/versions/0.2.0/components/date-picker"

const meta = {
	title: "Components/DatePicker",
	component: DatePicker,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Select a date",
		value: "",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (date) => console.log("Date changed", date),
	},
}

export const WithDefaultDate: Story = {
	args: {
		label: "Birthday",
		value: "2000-01-01",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (date) => console.log("Date changed", date),
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		value: "",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (date) => console.log("Date changed", date),
		disabled: true,
	},
}
