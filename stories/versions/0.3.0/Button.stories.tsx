import type { Meta, StoryObj } from "@storybook/react"
import { Download, Heart, Trash2 } from "lucide-react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"

const meta = {
	title: "Components/0.3.0/Button",
	component: Button,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"primary",
				"primary-muted",
				"secondary",
				"secondary-muted",
				"tertiary",
				"tertiary-muted",
				"error",
				"error-muted",
				"success",
				"success-muted",
				"warning",
				"warning-muted",
				"info",
				"info-muted",
				"text",
				"icon",
			],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: { children: "Primary Button", variant: "primary" },
}

export const PrimaryMuted: Story = {
	args: { children: "Primary Muted", variant: "primary-muted" },
}

export const Secondary: Story = {
	args: { children: "Secondary Button", variant: "secondary" },
}

export const SecondaryMuted: Story = {
	args: { children: "Secondary Muted", variant: "secondary-muted" },
}

export const Tertiary: Story = {
	args: { children: "Tertiary Button", variant: "tertiary" },
}

export const TertiaryMuted: Story = {
	args: { children: "Tertiary Muted", variant: "tertiary-muted" },
}

export const ErrorButton: Story = {
	args: { children: "Error", variant: "error" },
}

export const ErrorMuted: Story = {
	args: { children: "Error Muted", variant: "error-muted" },
}

export const SuccessButton: Story = {
	args: { children: "Success", variant: "success" },
}

export const WarningButton: Story = {
	args: { children: "Warning", variant: "warning" },
}

export const InfoButton: Story = {
	args: { children: "Info", variant: "info" },
}

export const Text: Story = {
	args: { children: "Text Button", variant: "text" },
}

export const Icon: Story = {
	args: { children: <Heart className="size-5" />, variant: "icon" },
}

export const Disabled: Story = {
	args: { children: "Disabled Button", disabled: true },
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap gap-2">
				<Button variant="primary">Primary</Button>
				<Button variant="primary-muted">Primary Muted</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="secondary-muted">Secondary Muted</Button>
				<Button variant="tertiary">Tertiary</Button>
				<Button variant="tertiary-muted">Tertiary Muted</Button>
				<Button variant="text">Text</Button>
				<Button variant="icon">
					<Heart className="size-5" />
				</Button>
			</div>
			<div className="flex flex-wrap gap-2">
				<Button variant="error">Error</Button>
				<Button variant="error-muted">Error Muted</Button>
				<Button variant="success">Success</Button>
				<Button variant="success-muted">Success Muted</Button>
				<Button variant="warning">Warning</Button>
				<Button variant="warning-muted">Warning Muted</Button>
				<Button variant="info">Info</Button>
				<Button variant="info-muted">Info Muted</Button>
			</div>
		</div>
	),
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
}

export const WithIcons: Story = {
	render: () => (
		<div className="flex flex-wrap gap-2">
			<Button>
				<Download className="size-4" />
				Download
			</Button>
			<Button variant="secondary">
				<Heart className="size-4" />
				Favorite
			</Button>
			<Button variant="error">
				<Trash2 className="size-4" />
				Delete
			</Button>
		</div>
	),
}
