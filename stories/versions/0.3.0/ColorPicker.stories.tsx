import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { ColorPicker } from "@/registry/versions/0.3.0/components/color-picker"

const meta = {
	title: "Components/0.3.0/ColorPicker",
	component: ColorPicker,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { label: "Choose a color" },
}

export const WithDefaultValue: Story = {
	args: { label: "Brand Color", defaultValue: "#007bff" },
}

export const Disabled: Story = {
	args: { label: "Disabled", disabled: true, defaultValue: "#ff0000" },
}
