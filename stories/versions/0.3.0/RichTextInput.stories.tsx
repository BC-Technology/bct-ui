import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { RichTextInput } from "@/registry/versions/0.3.0/components/rich-text-input"

const meta = {
	title: "Components/0.3.0/RichTextInput",
	component: RichTextInput,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof RichTextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Content",
		value: "",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (value: string) => console.log(value),
	},
}

export const WithDefaultContent: Story = {
	args: {
		label: "Article",
		value: "<p>This is <strong>bold</strong> and <em>italic</em> text.</p>",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (value: string) => console.log(value),
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		disabled: true,
		value: "<p>Cannot edit this content</p>",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: (value: string) => console.log(value),
	},
}
