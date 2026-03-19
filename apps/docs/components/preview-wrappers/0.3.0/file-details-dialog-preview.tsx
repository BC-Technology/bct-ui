"use client"

import { useState } from "react"
import { Button } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/button"
import { FileDetailsDialog } from "../../../../../packages/ui/src/registry/versions/0.3.0/components/file-details-dialog"
import type { VariantExample } from "../types"

function PdfFileDetailsPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>View PDF Details</Button>
			<FileDetailsDialog
				isOpen={open}
				onClose={() => setOpen(false)}
				file={{
					name: "document.pdf",
					fileSize: 2457600,
					mimeType: "application/pdf",
					createdAt: new Date().toISOString(),
				}}
			/>
		</>
	)
}

function ImageFileDetailsPreview() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button onClick={() => setOpen(true)}>View Image Details</Button>
			<FileDetailsDialog
				isOpen={open}
				onClose={() => setOpen(false)}
				file={{
					name: "photo.jpg",
					fileSize: 1048576,
					mimeType: "image/jpeg",
					createdAt: new Date().toISOString(),
				}}
			/>
		</>
	)
}

export const variants: VariantExample[] = [
	{
		name: "PDF File Details",
		description: "View details of a PDF document",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>View File Details</Button>
<FileDetailsDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  file={{
    name: "document.pdf",
    fileSize: 2457600,
    mimeType: "application/pdf",
    createdAt: new Date().toISOString()
  }}
/>`,
		preview: <PdfFileDetailsPreview />,
	},
	{
		name: "Image File Details",
		description: "View details of an image file",
		code: `const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>View Image Details</Button>
<FileDetailsDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  file={{
    name: "photo.jpg",
    fileSize: 1048576,
    mimeType: "image/jpeg",
    createdAt: new Date().toISOString()
  }}
/>`,
		preview: <ImageFileDetailsPreview />,
	},
]
