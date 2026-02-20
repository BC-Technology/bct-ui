import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { FileUpload } from "@/registry/versions/0.2.0/components/file-upload"

const meta = {
	title: "Components/0.2.0/FileUpload",
	component: FileUpload,
	tags: ["version:0.2.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Upload files",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Files changed"),
	},
}

export const SingleFile: Story = {
	args: {
		label: "Upload profile picture",
		multiple: false,
		accept: "image/*",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Files changed"),
	},
}

export const MultipleFiles: Story = {
	args: {
		label: "Upload documents",
		multiple: true,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Files changed"),
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled",
		disabled: true,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onChange: () => console.log("Files changed"),
	},
}
