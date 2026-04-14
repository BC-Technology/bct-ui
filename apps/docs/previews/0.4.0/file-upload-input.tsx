"use client"

import { FileUploadInput } from "../../../../packages/ui/src/registry/versions/0.4.0/components/file-upload-input"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Advanced file upload with image grid previews and expand dialog",
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
