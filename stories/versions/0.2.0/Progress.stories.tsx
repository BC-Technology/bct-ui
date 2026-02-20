import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Progress } from "@/registry/versions/0.2.0/components/progress"

const meta = {
	title: "Components/0.2.0/Progress",
	component: Progress,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: 50,
		max: 100,
	},
}

export const WithLabel: Story = {
	args: {
		label: "Upload Progress",
		value: 75,
		max: 100,
	},
}

export const ShowValue: Story = {
	args: {
		label: "Loading",
		value: 60,
		max: 100,
		showValue: true,
	},
}

export const DifferentValues: Story = {
	args: {
		value: 0,
		max: 100,
	},
	render: (_args: any) => (
		<div className="flex w-80 flex-col gap-4">
			<Progress label="25%" value={25} max={100} />
			<Progress label="50%" value={50} max={100} />
			<Progress label="75%" value={75} max={100} />
			<Progress label="100%" value={100} max={100} />
		</div>
	),
}
