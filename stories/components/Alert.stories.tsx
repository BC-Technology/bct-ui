import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
import { Alert } from "../../packages/ui/src/registry/versions/0.2.0/components/alert"

const meta = {
	title: "Components/Alert",
	component: Alert,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
	args: {
		variant: "info",
		title: "Information",
		children: "This is an informational message.",
	},
}

export const Success: Story = {
	args: {
		variant: "success",
		title: "Success",
		children: "Your changes have been saved successfully.",
	},
}

export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Warning",
		children: "Please review your information before proceeding.",
	},
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: false positive
export const Error: Story = {
	args: {
		variant: "error",
		title: "Error",
		children: "An error occurred while processing your request.",
	},
}

export const WithoutTitle: Story = {
	args: {
		variant: "info",
		children: "This alert has no title.",
	},
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex w-96 flex-col gap-4">
			<Alert variant="info" title="Info">
				This is an informational message.
			</Alert>
			<Alert variant="success" title="Success">
				Operation completed successfully.
			</Alert>
			<Alert variant="warning" title="Warning">
				Please be careful with this action.
			</Alert>
			<Alert variant="error" title="Error">
				Something went wrong.
			</Alert>
		</div>
	),
}
