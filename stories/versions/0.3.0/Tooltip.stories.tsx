import type { Meta, StoryObj } from "@storybook/react"
import type React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"
// @ts-expect-error
import { Tooltip } from "@/registry/versions/0.3.0/components/tooltip"

const meta = {
	title: "Components/0.3.0/Tooltip",
	component: Tooltip,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		content: "This is a tooltip",
		children: <Button>Hover me</Button>,
	},
	render: ({
		content,
		children,
	}: {
		content: React.ReactNode
		children: React.ReactNode
	}) => <Tooltip content={content}>{children}</Tooltip>,
}

export const LongContent: Story = {
	args: {
		content:
			"This is a longer tooltip with more detailed information about the element",
		children: <Button>Hover for more info</Button>,
	},
	render: ({
		content,
		children,
	}: {
		content: React.ReactNode
		children: React.ReactNode
	}) => <Tooltip content={content}>{children}</Tooltip>,
}

export const OnIcon: Story = {
	args: {
		content: "Delete",
		children: (
			<Button variant="icon">
				<svg
					className="size-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<title>Delete</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					/>
				</svg>
			</Button>
		),
	},
}
