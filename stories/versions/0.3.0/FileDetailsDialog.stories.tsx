import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React, { useState } from "react"
// @ts-expect-error
import { Button } from "@/registry/versions/0.3.0/components/button"
// @ts-expect-error
import { FileDetailsDialog } from "@/registry/versions/0.3.0/components/file-details-dialog"

const meta = {
	title: "Components/0.3.0/FileDetailsDialog",
	component: FileDetailsDialog,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FileDetailsDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>View File Details</Button>
				<FileDetailsDialog
					open={open}
					onOpenChange={setOpen}
					file={{
						name: "project-report.pdf",
						size: 2048576,
						type: "application/pdf",
						uploadedAt: new Date("2024-01-15"),
					}}
				/>
			</>
		)
	},
}

export const Processing: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>View Processing File</Button>
				<FileDetailsDialog
					open={open}
					onOpenChange={setOpen}
					file={{
						name: "large-dataset.xlsx",
						size: 10485760,
						type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						uploadedAt: new Date(),
						status: "processing",
					}}
				/>
			</>
		)
	},
}

export const WithError: Story = {
	render: () => {
		const [open, setOpen] = useState(false)
		return (
			<>
				<Button onClick={() => setOpen(true)}>View Failed File</Button>
				<FileDetailsDialog
					open={open}
					onOpenChange={setOpen}
					file={{
						name: "corrupted-file.pdf",
						size: 512000,
						type: "application/pdf",
						uploadedAt: new Date("2024-01-10"),
						status: "error",
						errorMessage: "File could not be processed. Please try uploading again.",
					}}
				/>
			</>
		)
	},
}
