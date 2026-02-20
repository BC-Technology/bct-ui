import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { FileUpload } from "@/registry/versions/0.3.0/components/file-upload"

const meta = {
	title: "Components/0.3.0/FileUpload",
	component: FileUpload,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFileSelect: (files: FileList) => console.log("Files selected:", files),
	},
}

export const ImagesOnly: Story = {
	args: {
		accept: "image/*",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFileSelect: (files: FileList) => console.log("Images selected:", files),
	},
}

export const WithMaxSize: Story = {
	args: {
		maxSize: 5 * 1024 * 1024,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFileSelect: (files: FileList) => console.log("Files selected:", files),
	},
}

export const Disabled: Story = {
	args: {
		disabled: true,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFileSelect: (files: FileList) => console.log("Files selected:", files),
	},
}
