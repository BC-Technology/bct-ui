"use client"

import { useState } from "react"
import { FileUpload } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/file-upload"
import type { VariantExample } from "../types"

function BasicFileUploadPreview() {
	const [files, setFiles] = useState<File[]>([])
	return (
		<FileUpload
			value={files}
			onChange={setFiles}
			label="Upload Files"
			helperText="Drag and drop files here or click to browse"
		/>
	)
}

function ImageUploadPreview() {
	const [files, setFiles] = useState<File[]>([])
	return (
		<FileUpload
			value={files}
			onChange={setFiles}
			label="Upload Images"
			accept="image/*"
			helperText="Only image files are accepted"
		/>
	)
}

function MultipleFilesPreview() {
	const [files, setFiles] = useState<File[]>([])
	return (
		<FileUpload
			value={files}
			onChange={setFiles}
			label="Upload Documents"
			multiple
			accept=".pdf,.doc,.docx"
			helperText="Upload PDF or Word documents"
		/>
	)
}

export const variants: VariantExample[] = [
	{
		name: "Basic File Upload",
		description: "Upload any file type with drag and drop",
		code: `const [files, setFiles] = useState<File[]>([])

<FileUpload
  value={files}
  onChange={setFiles}
  label="Upload Files"
/>`,
		preview: <BasicFileUploadPreview />,
	},
	{
		name: "Image Upload Only",
		description: "Restrict uploads to image files",
		code: `const [files, setFiles] = useState<File[]>([])

<FileUpload
  value={files}
  onChange={setFiles}
  label="Upload Images"
  accept="image/*"
/>`,
		preview: <ImageUploadPreview />,
	},
	{
		name: "Multiple Files",
		description: "Upload multiple files at once",
		code: `const [files, setFiles] = useState<File[]>([])

<FileUpload
  value={files}
  onChange={setFiles}
  label="Upload Documents"
  multiple
  accept=".pdf,.doc,.docx"
/>`,
		preview: <MultipleFilesPreview />,
	},
]
