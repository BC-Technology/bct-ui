import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Badge } from "@/registry/versions/0.3.0/components/badge"

const meta = {
	title: "Components/0.3.0/Badge",
	component: Badge,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: { children: "Default" },
}

export const Primary: Story = {
	args: { variant: "primary", children: "Primary" },
}

export const PrimaryMuted: Story = {
	args: { variant: "primary-muted", children: "Primary Muted" },
}

export const Secondary: Story = {
	args: { variant: "secondary", children: "Secondary" },
}

export const Tertiary: Story = {
	args: { variant: "tertiary", children: "Tertiary" },
}

export const Success: Story = {
	args: { variant: "success", children: "Success" },
}

export const SuccessMuted: Story = {
	args: { variant: "success-muted", children: "Success Muted" },
}

export const Warning: Story = {
	args: { variant: "warning", children: "Warning" },
}

export const WarningMuted: Story = {
	args: { variant: "warning-muted", children: "Warning Muted" },
}

export const ErrorBadge: Story = {
	args: { variant: "error", children: "Error" },
}

export const ErrorMuted: Story = {
	args: { variant: "error-muted", children: "Error Muted" },
}

export const Info: Story = {
	args: { variant: "info", children: "Info" },
}

export const InfoMuted: Story = {
	args: { variant: "info-muted", children: "Info Muted" },
}

export const Neutral: Story = {
	args: { variant: "neutral", children: "Neutral" },
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Badge>Default</Badge>
			<Badge variant="primary">Primary</Badge>
			<Badge variant="primary-muted">Primary Muted</Badge>
			<Badge variant="secondary">Secondary</Badge>
			<Badge variant="tertiary">Tertiary</Badge>
			<Badge variant="success">Success</Badge>
			<Badge variant="success-muted">Success Muted</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="warning-muted">Warning Muted</Badge>
			<Badge variant="error">Error</Badge>
			<Badge variant="error-muted">Error Muted</Badge>
			<Badge variant="info">Info</Badge>
			<Badge variant="info-muted">Info Muted</Badge>
			<Badge variant="neutral">Neutral</Badge>
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
