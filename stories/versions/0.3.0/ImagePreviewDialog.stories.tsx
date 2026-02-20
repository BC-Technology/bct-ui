import type { Meta, StoryObj } from "@storybook/react"
// biome-ignore lint/correctness/noUnusedImports: false positive
import React from "react"
// @ts-expect-error
import { ImagePreviewDialog } from "@/registry/versions/0.3.0/components/image-preview-dialog"

const meta = {
	title: "Components/0.3.0/ImagePreviewDialog",
	component: ImagePreviewDialog,
	tags: ["version:0.3.0"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ImagePreviewDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		src: "https://picsum.photos/800/600",
		alt: "Sample image",
	},
}

export const WithMetadata: Story = {
	args: {
		src: "https://picsum.photos/800/600?random=2",
		alt: "Project screenshot",
		metadata: {
			fileName: "screenshot.jpg",
			fileSize: "1.2 MB",
			dimensions: "800 × 600",
			uploadedAt: "2024-01-15",
		},
	},
}

export const Landscape: Story = {
	args: {
		src: "https://picsum.photos/1200/400?random=3",
		alt: "Landscape image",
		metadata: {
			fileName: "landscape.jpg",
			fileSize: "2.4 MB",
		},
	},
}

export const Portrait: Story = {
	args: {
		src: "https://picsum.photos/400/800?random=4",
		alt: "Portrait image",
		metadata: {
			fileName: "portrait.jpg",
			fileSize: "980 KB",
		},
	},
}
