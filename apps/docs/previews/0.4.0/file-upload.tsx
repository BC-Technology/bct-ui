"use client"

import { useState } from "react"
import { FileUpload } from "../../../../packages/ui/src/registry/versions/0.4.0/components/file-upload"
import type { VariantPreview } from "../types"

function FileUploadDemo() {
	const [files, setFiles] = useState<File[]>([])
	return (
		<div className="w-full max-w-md">
			<FileUpload
				label="Attachments"
				value={files}
				onChange={setFiles}
				multiple
				helperText="Upload any files up to 10MB each"
				maxSize={10 * 1024 * 1024}
			/>
		</div>
	)
}

function ImageUploadDemo() {
	const [files, setFiles] = useState<File[]>([])
	return (
		<div className="w-full max-w-md">
			<FileUpload
				label="Profile photo"
				value={files}
				onChange={setFiles}
				accept="image/*"
				helperText="PNG, JPG or WebP, max 5MB"
			/>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Multiple Files",
		description: "Drag and drop zone with file list",
		code: `const [files, setFiles] = useState([])

<FileUpload
  label="Attachments"
  value={files}
  onChange={setFiles}
  multiple
  helperText="Upload any files up to 10MB each"
/>`,
		render: () => <FileUploadDemo />,
	},
	{
		name: "Single Image",
		description: "Single file upload with type restriction",
		code: `<FileUpload
  label="Profile photo"
  value={files}
  onChange={setFiles}
  accept="image/*"
  helperText="PNG, JPG or WebP, max 5MB"
/>`,
		render: () => <ImageUploadDemo />,
	},
]
