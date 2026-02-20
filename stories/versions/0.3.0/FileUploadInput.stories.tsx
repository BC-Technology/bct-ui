import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { FileUploadInput } from "@/registry/versions/0.3.0/components/file-upload-input"

const meta = {
	title: "Components/0.3.0/FileUploadInput",
	component: FileUploadInput,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FileUploadInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		label: "Upload files",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFilesChange: (files: File[]) => console.log("Files changed:", files),
	},
}

export const ImagesOnly: Story = {
	args: {
		label: "Upload images",
		accept: "image/*",
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFilesChange: (files: File[]) => console.log("Images changed:", files),
	},
}

export const WithExistingItems: Story = {
	args: {
		label: "Documents",
		existingItems: [
			{
				id: "1",
				name: "existing-report.pdf",
				size: 1024000,
				url: "https://example.com/report.pdf",
			},
			{
				id: "2",
				name: "data-export.xlsx",
				size: 512000,
				url: "https://example.com/data.xlsx",
			},
		],
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFilesChange: (files: File[]) => console.log("Files changed:", files),
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onRemoveExisting: (id: string) => console.log("Remove existing:", id),
	},
}

export const Disabled: Story = {
	args: {
		label: "Disabled upload",
		disabled: true,
		// biome-ignore lint/suspicious/noConsole: allowed for stories
		onFilesChange: (files: File[]) => console.log("Files changed:", files),
	},
}
