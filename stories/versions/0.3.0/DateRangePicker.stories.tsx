import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { DateRangePicker } from "@/registry/versions/0.3.0/components/date-range-picker"

const meta = {
	title: "Components/0.3.0/DateRangePicker",
	component: DateRangePicker,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
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
