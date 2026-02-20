import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { FileIcon } from "@/registry/versions/0.3.0/components/file-icon"

const meta = {
	title: "Components/0.3.0/FileIcon",
	component: FileIcon,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof FileIcon>

export default meta
type Story = StoryObj<typeof meta>

export const PDF: Story = {
	args: { fileName: "document.pdf" },
}

export const Image: Story = {
	args: { fileName: "photo.jpg" },
}

export const Word: Story = {
	args: { fileName: "report.docx" },
}

export const Excel: Story = {
	args: { fileName: "spreadsheet.xlsx" },
}

export const Video: Story = {
	args: { fileName: "video.mp4" },
}

export const Audio: Story = {
	args: { fileName: "audio.mp3" },
}

export const Archive: Story = {
	args: { fileName: "archive.zip" },
}

export const Unknown: Story = {
	args: { fileName: "file.xyz" },
}

export const AllTypes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="document.pdf" />
				<span className="text-xs">PDF</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="photo.jpg" />
				<span className="text-xs">Image</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="report.docx" />
				<span className="text-xs">Word</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="data.xlsx" />
				<span className="text-xs">Excel</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="video.mp4" />
				<span className="text-xs">Video</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="audio.mp3" />
				<span className="text-xs">Audio</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="archive.zip" />
				<span className="text-xs">Archive</span>
			</div>
			<div className="flex flex-col items-center gap-1">
				<FileIcon fileName="file.xyz" />
				<span className="text-xs">Unknown</span>
			</div>
		</div>
	),
}
