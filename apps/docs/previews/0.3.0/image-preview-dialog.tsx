"use client"

import { ImagePreviewDialog } from "../../../../packages/ui/src/registry/versions/0.3.0/components/image-preview-dialog"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Click to Expand",
		description: "Click the image to open a fullscreen viewer with metadata",
		code: `<ImagePreviewDialog
  src="/photo.jpg"
  alt="Scenic landscape"
  showHoverButton
  metadata={{
    name: "landscape.jpg",
    size: 1_200_000,
    mimeType: "image/jpeg",
    width: 3840,
    height: 2160,
  }}
/>`,
		render: () => (
			<div className="flex flex-col items-center gap-3">
				<ImagePreviewDialog
					src="https://picsum.photos/seed/bctui/400/225"
					alt="Sample image"
					showHoverButton
					metadata={{
						name: "sample-image.jpg",
						size: 1_200_000,
						mimeType: "image/jpeg",
						width: 1920,
						height: 1080,
					}}
					className="w-64 rounded-md"
				/>
				<p className="text-typography-muted text-xs">Click image to expand</p>
			</div>
		),
	},
]
