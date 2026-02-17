import type { Meta, StoryObj } from "@storybook/react"
import { Download, Heart, Trash2 } from "lucide-react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.2.0/components/button"

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "tertiary", "text", "icon"],
			description: "The visual style variant of the button",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
			description: "The size of the button",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
		},
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: "Primary Button",
		variant: "primary",
	},
}

export const Secondary: Story = {
	args: {
		children: "Secondary Button",
		variant: "secondary",
	},
}

export const Tertiary: Story = {
	args: {
		children: "Tertiary Button",
		variant: "tertiary",
	},
}

export const Text: Story = {
	args: {
		children: "Text Button",
		variant: "text",
	},
}

export const Icon: Story = {
	args: {
		children: <Heart className="size-5" />,
		variant: "icon",
	},
}

export const Small: Story = {
	args: {
		children: "Small Button",
		size: "sm",
	},
}

export const Medium: Story = {
	args: {
		children: "Medium Button",
		size: "md",
	},
}

export const Large: Story = {
	args: {
		children: "Large Button",
		size: "lg",
	},
}

export const Disabled: Story = {
	args: {
		children: "Disabled Button",
		disabled: true,
	},
}

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<Download className="size-4" />
				Download
			</>
		),
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Button variant="primary">Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="tertiary">Tertiary</Button>
				<Button variant="text">Text</Button>
				<Button variant="icon">
					<Heart className="size-5" />
				</Button>
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

export const IconSizes: Story = {
	render: () => (
		<div className="flex items-center gap-2">
			<Button variant="icon" size="sm">
				<Heart className="size-4" />
			</Button>
			<Button variant="icon" size="md">
				<Heart className="size-5" />
			</Button>
			<Button variant="icon" size="lg">
				<Heart className="size-6" />
			</Button>
		</div>
	),
}

export const States: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex gap-2">
				<Button>Normal</Button>
				<Button disabled>Disabled</Button>
			</div>
			<div className="flex gap-2">
				<Button variant="secondary">Normal</Button>
				<Button variant="secondary" disabled>
					Disabled
				</Button>
			</div>
			<div className="flex gap-2">
				<Button variant="tertiary">Normal</Button>
				<Button variant="tertiary" disabled>
					Disabled
				</Button>
			</div>
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
			<Button variant="tertiary">
				<Trash2 className="size-4" />
				Delete
			</Button>
		</div>
	),
}
