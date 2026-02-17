import type { Meta, StoryObj } from "@storybook/react"
// @ts-expect-error
import { Accordion } from "@/registry/versions/0.2.0/components/accordion"

const meta = {
	title: "Components/Accordion",
	component: Accordion,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		items: [
			{
				title: "What is BCT UI?",
				value: "what-is-bct-ui",
				children: [
					"BCT UI is a comprehensive UI component library for React applications.",
				],
			},
			{
				title: "How do I install it?",
				value: "how-do-i-install-it",
				children: [
					"You can install BCT UI using npm or pnpm by running the init command.",
				],
			},
			{
				title: "Is it customizable?",
				value: "is-it-customizable",
				children: [
					"Yes, all components are fully customizable using Tailwind CSS classes.",
				],
			},
		],
	},
}

export const SingleItem: Story = {
	args: {
		items: [
			{
				title: "Single accordion item",
				value: "single-item",
				children: ["This accordion only has one item."],
			},
		],
	},
}

export const ManyItems: Story = {
	args: {
		items: [
			{ title: "Item 1", value: "item-1", children: ["Content for item 1"] },
			{ title: "Item 2", value: "item-2", children: ["Content for item 2"] },
			{ title: "Item 3", value: "item-3", children: ["Content for item 3"] },
			{ title: "Item 4", value: "item-4", children: ["Content for item 4"] },
			{ title: "Item 5", value: "item-5", children: ["Content for item 5"] },
		],
	},
}
