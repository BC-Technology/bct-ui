import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Badge } from "@/registry/versions/0.2.0/components/badge"

const meta = {
	title: "Components/0.2.0/Badge",
	component: Badge,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: "Default",
	},
}

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary",
	},
}

export const Success: Story = {
	args: {
		variant: "success",
		children: "Success",
	},
}

export const Warning: Story = {
	args: {
		variant: "warning",
		children: "Warning",
	},
}

export const ErrorBadge: Story = {
	args: {
		variant: "error",
		children: "Error",
	},
}

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small",
	},
}

export const Medium: Story = {
	args: {
		size: "md",
		children: "Medium",
	},
}

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large",
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge>Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="error">Error</Badge>
		</div>
	),
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Badge size="sm">Small</Badge>
			<Badge size="md">Medium</Badge>
			<Badge size="lg">Large</Badge>
		</div>
	),
}
