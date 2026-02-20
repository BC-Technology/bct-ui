import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"
// @ts-expect-error
import { DropdownMenu } from "@/registry/versions/0.3.0/components/dropdown-menu"

const meta = {
	title: "Components/0.3.0/DropdownMenu",
	component: DropdownMenu,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<DropdownMenu
			trigger={<Button>Open Menu</Button>}
			items={[
				{ label: "Profile", value: "profile" },
				{ label: "Settings", value: "settings" },
				{ label: "Logout", value: "logout" },
			]}
			onSelect={(value: string) => console.info("Selected:", value)}
		/>
	),
}

export const WithDisabledItems: Story = {
	render: () => (
		<DropdownMenu
			trigger={<Button>Actions</Button>}
			items={[
				{ label: "Edit", value: "edit" },
				{ label: "Delete", value: "delete", disabled: true },
				{ label: "Archive", value: "archive" },
			]}
			onSelect={(value: string) => console.info("Selected:", value)}
		/>
	),
}
