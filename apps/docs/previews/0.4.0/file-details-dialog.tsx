"use client"

import { useState } from "react"
import { Button } from "../../../../packages/ui/src/registry/versions/0.4.0/components/button"
import { FileDetailsDialog } from "../../../../packages/ui/src/registry/versions/0.4.0/components/file-details-dialog"
import type { VariantPreview } from "../types"

function FileDetailsDemo() {
	const [open, setOpen] = useState(false)
	return (
		<>
			<Button variant="tertiary" onClick={() => setOpen(true)}>
				View File Details
			</Button>
			<FileDetailsDialog
				isOpen={open}
				onClose={() => setOpen(false)}
				file={{
					name: "project-proposal.pdf",
					mimeType: "application/pdf",
					fileSize: 2_400_000,
					uploadedBy: "Jonas Blendstrup",
					createdAt: new Date().toISOString(),
					category: "Documents",
				}}
				status="done"
				onDelete={() => setOpen(false)}
			/>
		</>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Dialog showing file metadata, status, and delete action",
		code: `<FileDetailsDialog
  isOpen={open}
  onClose={() => setOpen(false)}
  file={{
    name: "project-proposal.pdf",
    mimeType: "application/pdf",
    fileSize: 2_400_000,
    uploadedBy: "Jonas Blendstrup",
    createdAt: new Date().toISOString(),
  }}
  status="done"
  onDelete={() => handleDelete()}
/>`,
		render: () => <FileDetailsDemo />,
	},
]
