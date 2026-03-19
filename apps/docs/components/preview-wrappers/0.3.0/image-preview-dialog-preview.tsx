"use client"


import { ImagePreviewDialog  } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/image-preview-dialog"
import { SAMPLE_IMAGE_1, SAMPLE_IMAGE_2, SAMPLE_IMAGE_3 } from "../shared/utils"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Single Image Preview",
		description: "Click image to view full screen",
		code: `<ImagePreviewDialog
  src="https://example.com/image.jpg"
  alt="Sample Image"
/>`,
		preview: (
			<ImagePreviewDialog
				src={SAMPLE_IMAGE_1}
				alt="Sample Image"
				className="max-w-xs"
			/>
		),
	},
	{
		name: "Small Thumbnail",
		description: "Small thumbnail that expands on click",
		code: `<ImagePreviewDialog
  src="https://example.com/photo.jpg"
  alt="Photo"
  className="w-24 h-24 object-cover rounded"
/>`,
		preview: (
			<ImagePreviewDialog
				src={SAMPLE_IMAGE_2}
				alt="Photo"
				className="h-24 w-24 rounded object-cover"
			/>
		),
	},
	{
		name: "Multiple Images",
		description: "Multiple images with preview dialogs",
		code: `<div className="flex gap-4">
  <ImagePreviewDialog src="image1.jpg" alt="Image 1" className="w-32" />
  <ImagePreviewDialog src="image2.jpg" alt="Image 2" className="w-32" />
  <ImagePreviewDialog src="image3.jpg" alt="Image 3" className="w-32" />
</div>`,
		preview: (
			<div className="flex gap-4">
				<ImagePreviewDialog
					src={SAMPLE_IMAGE_1}
					alt="Image 1"
					className="w-32"
				/>
				<ImagePreviewDialog
					src={SAMPLE_IMAGE_2}
					alt="Image 2"
					className="w-32"
				/>
				<ImagePreviewDialog
					src={SAMPLE_IMAGE_3}
					alt="Image 3"
					className="w-32"
				/>
			</div>
		),
	},
]
