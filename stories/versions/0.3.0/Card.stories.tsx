import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"
// @ts-expect-error
import { Card } from "@/registry/versions/0.3.0/components/card"

const meta = {
	title: "Components/0.3.0/Card",
	component: Card,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Card className="w-80">
			<Card.Header>
				<Card.Title>Card Title</Card.Title>
				<Card.Description>Card description goes here</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>This is the main content of the card.</p>
			</Card.Content>
			<Card.Footer>
				<Button variant="tertiary">Cancel</Button>
				<Button>Confirm</Button>
			</Card.Footer>
		</Card>
	),
}

export const WithoutFooter: Story = {
	render: () => (
		<Card className="w-80">
			<Card.Header>
				<Card.Title>Notification</Card.Title>
				<Card.Description>You have 3 unread messages</Card.Description>
			</Card.Header>
			<Card.Content>
				<p>Check your inbox for new messages.</p>
			</Card.Content>
		</Card>
	),
}

export const ContentOnly: Story = {
	render: () => (
		<Card className="w-80">
			<Card.Content>
				<p>This card only has content, no header or footer.</p>
			</Card.Content>
		</Card>
	),
}
