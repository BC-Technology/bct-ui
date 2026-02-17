import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Slider } from "@/registry/versions/0.2.0/components/slider"

const meta = {
	title: "Components/Slider",
	component: Slider,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Volume",
		min: 0,
		max: 100,
		defaultValue: 50,
	},
}

export const WithStep: Story = {
	args: {
		label: "Brightness",
		min: 0,
		max: 100,
		step: 10,
		defaultValue: 50,
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled Slider",
		disabled: true,
		defaultValue: 30,
	},
}
