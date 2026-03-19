"use client"


import { FileIcon  } from "../../../../../packages/ui/src/registry/versions/0.4.0/components/file-icon"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Document Types",
		description: "Icons for different document file types",
		code: `<div className="flex gap-4">
  <FileIcon name="document.pdf" />
  <FileIcon name="spreadsheet.xlsx" />
  <FileIcon name="presentation.pptx" />
  <FileIcon name="document.docx" />
</div>`,
		preview: (
			<div className="flex gap-4">
				<FileIcon name="document.pdf" />
				<FileIcon name="spreadsheet.xlsx" />
				<FileIcon name="presentation.pptx" />
				<FileIcon name="document.docx" />
			</div>
		),
	},
	{
		name: "Image Types",
		description: "Icons for image file types",
		code: `<div className="flex gap-4">
  <FileIcon name="photo.jpg" />
  <FileIcon name="image.png" />
  <FileIcon name="graphic.svg" />
  <FileIcon name="animation.gif" />
</div>`,
		preview: (
			<div className="flex gap-4">
				<FileIcon name="photo.jpg" />
				<FileIcon name="image.png" />
				<FileIcon name="graphic.svg" />
				<FileIcon name="animation.gif" />
			</div>
		),
	},
	{
		name: "Code & Archive Types",
		description: "Icons for code and archive files",
		code: `<div className="flex gap-4">
  <FileIcon name="script.js" />
  <FileIcon name="styles.css" />
  <FileIcon name="archive.zip" />
  <FileIcon name="data.json" />
</div>`,
		preview: (
			<div className="flex gap-4">
				<FileIcon name="script.js" />
				<FileIcon name="styles.css" />
				<FileIcon name="archive.zip" />
				<FileIcon name="data.json" />
			</div>
		),
	},
]
