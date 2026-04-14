"use client"

import { FileIcon } from "../../../../packages/ui/src/registry/versions/0.4.0/components/file-icon"
import type { VariantPreview } from "../types"

const fileExamples = [
	{ name: "report.pdf", label: "PDF" },
	{ name: "spreadsheet.xlsx", label: "Excel" },
	{ name: "document.docx", label: "Word" },
	{ name: "photo.jpg", mimeType: "image/jpeg", label: "Image" },
	{ name: "notes.txt", label: "Text" },
	{ name: "archive.zip", label: "File" },
]

export const variants: VariantPreview[] = [
	{
		name: "File Types",
		description: "Icons automatically determined from file name or MIME type",
		code: `<FileIcon name="report.pdf" />
<FileIcon name="spreadsheet.xlsx" />
<FileIcon name="photo.jpg" mimeType="image/jpeg" />
<FileIcon name="document.docx" />`,
		render: () => (
			<div className="flex flex-wrap items-center gap-6">
				{fileExamples.map(({ name, mimeType, label }) => (
					<div key={name} className="flex flex-col items-center gap-1.5">
						<div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-surface-1">
							<FileIcon name={name} mimeType={mimeType} className="h-6 w-6 text-typography-secondary" />
						</div>
						<span className="text-xs text-typography-muted">{label}</span>
					</div>
				))}
			</div>
		),
	},
]
