import { File, FileSpreadsheet, FileText, Image } from "lucide-react"

export interface FileIconProps {
	name: string
	mimeType?: string
	className?: string
}

const imageExtensions = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"svg",
	"heic",
	"avif",
]
const spreadsheetExtensions = ["xls", "xlsx", "csv"]
const textExtensions = ["txt", "md", "rtf", "doc", "docx", "pdf"]

export function FileIcon({
	name,
	mimeType,
	className = "h-5 w-5",
}: FileIconProps) {
	const extension = name.split(".").pop()?.toLowerCase() ?? ""

	if (mimeType?.startsWith("image") || imageExtensions.includes(extension)) {
		return <Image className={className} />
	}
	if (
		mimeType?.includes("spreadsheet") ||
		spreadsheetExtensions.includes(extension)
	) {
		return <FileSpreadsheet className={className} />
	}
	if (
		mimeType?.includes("excel") ||
		mimeType?.includes("text") ||
		mimeType?.includes("document") ||
		mimeType?.includes("pdf") ||
		textExtensions.includes(extension)
	) {
		return <FileText className={className} />
	}
	return <File className={className} />
}
