"use client"

import {
	type ExistingFileItem,
	FileUploadInput,
} from "../../../../packages/ui/src/registry/versions/0.4.0/components/file-upload-input"
import type { VariantPreview } from "../types"

const existingImages: ExistingFileItem[] = [
	{
		id: "img-1",
		url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
		name: "mountain-landscape.jpg",
		fileName: "mountain-landscape.jpg",
		size: 204800,
		mimeType: "image/jpeg",
	},
	{
		id: "img-2",
		url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
		name: "forest-path.jpg",
		fileName: "forest-path.jpg",
		size: 153600,
		mimeType: "image/jpeg",
	},
	{
		id: "img-3",
		url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80",
		name: "ocean-sunset.jpg",
		fileName: "ocean-sunset.jpg",
		size: 178200,
		mimeType: "image/jpeg",
	},
]

export const variants: VariantPreview[] = [
	{
		name: "With Existing Images",
		description:
			"FileUploadInput with pre-loaded images showing the image grid, expand, and remove capabilities",
		code: `const existingItems = [
  { id: "img-1", url: "/uploads/photo1.jpg", name: "photo1.jpg", size: 204800, mimeType: "image/jpeg" },
  { id: "img-2", url: "/uploads/photo2.jpg", name: "photo2.jpg", size: 153600, mimeType: "image/jpeg" },
]

<FileUploadInput
  onFileSelect={(files) => handleFiles(files)}
  existingItems={existingItems}
  onExistingRemovedChange={(ids) => console.log("removed:", ids)}
  accept="image/*"
  maxFiles={6}
/>`,
		render: () => (
			<div className="w-full max-w-md">
				<FileUploadInput
					onFileSelect={() => {}}
					existingItems={existingImages}
					onExistingRemovedChange={() => {}}
					accept="image/*"
					maxFiles={6}
				/>
			</div>
		),
	},
	{
		name: "Default",
		description:
			"Advanced file upload with image grid previews and expand dialog",
		code: `<FileUploadInput
  onFileSelect={(files) => console.log(files)}
  accept="image/*"
  maxFiles={5}
  placeholder="Drop images here or click to browse"
/>`,
		render: () => (
			<div className="w-full max-w-md">
				<FileUploadInput
					onFileSelect={() => {}}
					accept="image/*"
					maxFiles={5}
					placeholder="Drop images here or click to browse"
				/>
			</div>
		),
	},
	{
		name: "PDF Only",
		description: "File upload restricted to PDF documents",
		code: `<FileUploadInput
  onFileSelect={(files) => handleFiles(files)}
  accept="application/pdf"
  maxFiles={1}
  placeholder="Upload your contract (PDF)"
/>`,
		render: () => (
			<div className="w-full max-w-md">
				<FileUploadInput
					onFileSelect={() => {}}
					accept="application/pdf"
					maxFiles={1}
					placeholder="Upload your contract (PDF)"
				/>
			</div>
		),
	},
]
