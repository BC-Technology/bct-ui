import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { Tabs } from "@/registry/versions/0.2.0/components/tabs"

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		items: [
			{ value: "tab1", label: "Tab 1", content: <div>Content for Tab 1</div> },
			{ value: "tab2", label: "Tab 2", content: <div>Content for Tab 2</div> },
			{ value: "tab3", label: "Tab 3", content: <div>Content for Tab 3</div> },
		],
		defaultValue: "tab1",
	},
}

export const ManyTabs: Story = {
	args: {
		items: [
			{
				value: "overview",
				label: "Overview",
				content: <div>Overview content</div>,
			},
			{
				value: "details",
				label: "Details",
				content: <div>Details content</div>,
			},
			{
				value: "settings",
				label: "Settings",
				content: <div>Settings content</div>,
			},
			{
				value: "analytics",
				label: "Analytics",
				content: <div>Analytics content</div>,
			},
			{
				value: "reports",
				label: "Reports",
				content: <div>Reports content</div>,
			},
		],
		defaultValue: "overview",
	},
}
