import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Avatar } from "@/registry/versions/0.2.0/components/avatar"

const meta = {
	title: "Components/0.2.0/Avatar",
	component: Avatar,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
	args: {
		src: "https://i.pravatar.cc/150?img=1",
		alt: "User avatar",
	},
}

export const WithFallback: Story = {
	args: {
		fallback: "JD",
	},
}

export const Small: Story = {
	args: {
		src: "https://i.pravatar.cc/150?img=2",
		alt: "User avatar",
		size: "sm",
	},
}

export const Medium: Story = {
	args: {
		src: "https://i.pravatar.cc/150?img=3",
		alt: "User avatar",
		size: "md",
	},
}

export const Large: Story = {
	args: {
		src: "https://i.pravatar.cc/150?img=4",
		alt: "User avatar",
		size: "lg",
	},
}

export const AllSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar src="https://i.pravatar.cc/150?img=5" alt="User" size="sm" />
			<Avatar src="https://i.pravatar.cc/150?img=6" alt="User" size="md" />
			<Avatar src="https://i.pravatar.cc/150?img=7" alt="User" size="lg" />
		</div>
	),
}

export const FallbackSizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar fallback="AB" size="sm" />
			<Avatar fallback="CD" size="md" />
			<Avatar fallback="EF" size="lg" />
		</div>
	),
}
