import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { DateRangePicker } from "../../packages/ui/src/registry/versions/0.2.0/components/date-range-picker"

const meta = {
	title: "Components/DateRangePicker",
	component: DateRangePicker,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Select date range",
		value: { startDate: null, endDate: null },
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Date range changed"),
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		value: { startDate: null, endDate: null },
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Date range changed"),
		disabled: true,
	},
}
