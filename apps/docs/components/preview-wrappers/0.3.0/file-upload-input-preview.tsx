"use client"


import { FileUploadInput  } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/file-upload-input"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Image Grid Upload",
		description: "Upload images with grid preview",
		code: `<FileUploadInput
  onFileSelect={(files) => console.log('Selected:', files)}
  accept="image/*"
  maxFiles={5}
  placeholder="Upload Photos"
/>`,
		preview: (
			<FileUploadInput
				onFileSelect={(files) => {}}
				accept="image/*"
				maxFiles={5}
				placeholder="Upload Photos"
			/>
		),
	},
	{
		name: "Single Image Upload",
		description: "Upload a single image with preview",
		code: `<FileUploadInput
  onFileSelect={(files) => console.log('Selected:', files)}
  accept="image/*"
  maxFiles={1}
  placeholder="Profile Picture"
/>`,
		preview: (
			<FileUploadInput
				onFileSelect={(files) => {}}
				accept="image/*"
				maxFiles={1}
				placeholder="Profile Picture"
			/>
		),
	},
]
