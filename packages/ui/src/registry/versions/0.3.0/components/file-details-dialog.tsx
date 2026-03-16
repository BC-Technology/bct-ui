import clsx from "clsx"
import { Info, Trash2 } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"
import { Dialog } from "./dialog"
import { FileIcon } from "./file-icon"
import { Spinner } from "./spinner"

export type FileStatus = "idle" | "processing" | "failed" | "done"

export interface FileDetails {
	name: string
	mimeType?: string
	fileSize?: number
	uploadedBy?: string
	createdAt?: string
	category?: string
	errorMessage?: string
}

export interface FileDetailsDialogProps {
	isOpen: boolean
	onClose: () => void
	file?: FileDetails | null
	status?: FileStatus
	onDelete?: () => void
	content?: React.ReactNode
	infoText?: string
	className?: string
	classNames?: {
		root?: string
		header?: string
		meta?: string
		body?: string
	}
}

function formatFileSize(bytes?: number): string {
	if (!bytes) return "—"
	if (bytes < 1024) return `${bytes} B`
	const units = ["KB", "MB", "GB", "TB"]
	let size = bytes / 1024
	let unitIndex = 0
	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024
		unitIndex += 1
	}
	return `${size.toFixed(1)} ${units[unitIndex]}`
}

function formatDate(iso?: string): string {
	if (!iso) return "—"
	try {
		return new Intl.DateTimeFormat(undefined, {
			dateStyle: "medium",
			timeStyle: "short",
		}).format(new Date(iso))
	} catch {
		return iso
	}
}

export function FileDetailsDialog({
	isOpen,
	onClose,
	file,
	status = "done",
	onDelete,
	content,
	infoText,
	className,
	classNames,
}: FileDetailsDialogProps) {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={(o) => {
				if (!o) onClose()
			}}
			mode="panel"
			size="sm"
			className={twMerge(classNames?.root, className)}
		>
			{file ? (
				<div className="space-y-4">
					{/* File header */}
					<div
						className={twMerge(
							"flex items-center justify-between gap-3",
							classNames?.header,
						)}
					>
						<div className="flex min-w-0 items-center gap-3">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-radius-md border border-border bg-surface-2 text-typography-muted">
								<FileIcon
									name={file.name}
									mimeType={file.mimeType}
									className="h-5 w-5"
								/>
							</div>
							<div className="min-w-0">
								<p className="truncate font-semibold text-text-base text-typography-primary">
									{file.name}
								</p>
								{file.category && (
									<p className="text-text-sm text-typography-muted">
										{file.category}
									</p>
								)}
							</div>
						</div>
						{onDelete && (
							<button
								type="button"
								onClick={onDelete}
								className={clsx(
									"shrink-0 rounded-radius-md p-2 text-typography-muted transition-colors",
									"hover:bg-error-muted hover:text-error",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
								)}
								aria-label="Delete file"
							>
								<Trash2 className="h-4 w-4" />
							</button>
						)}
					</div>

					{/* Metadata grid */}
					<div
						className={twMerge(
							"grid grid-cols-1 gap-3 sm:grid-cols-2",
							classNames?.meta,
						)}
					>
						<div>
							<p className="text-text-xs text-typography-muted">Uploaded by</p>
							<p className="text-text-sm text-typography-primary">
								{file.uploadedBy || "—"}
							</p>
						</div>
						<div>
							<p className="text-text-xs text-typography-muted">Date</p>
							<p className="text-text-sm text-typography-primary">
								{formatDate(file.createdAt)}
							</p>
						</div>
						<div>
							<p className="text-text-xs text-typography-muted">Size</p>
							<p className="text-text-sm text-typography-primary">
								{formatFileSize(file.fileSize)}
							</p>
						</div>
						<div>
							<p className="text-text-xs text-typography-muted">Type</p>
							<p className="text-text-sm text-typography-primary">
								{file.mimeType || "—"}
							</p>
						</div>
					</div>

					{/* Body section */}
					<div
						className={twMerge("border-border border-t pt-4", classNames?.body)}
					>
						<h3 className="mb-2 font-semibold text-text-sm text-typography-primary">
							Content
						</h3>

						{/* Info banner */}
						<div className="mb-4 flex gap-2 rounded-radius-md bg-surface-2 p-3 text-text-sm text-typography-muted">
							<Info className="mt-0.5 h-4 w-4 shrink-0" />
							<p>
								{infoText ||
									"File content is extracted automatically and used for search and analysis."}
							</p>
						</div>

						{/* Status-driven body */}
						{status === "failed" ? (
							<div className="rounded-radius-md border border-error bg-error-muted p-3 text-error text-text-sm">
								{file.errorMessage || "Processing failed. Please try again."}
							</div>
						) : status === "processing" ? (
							<div className="flex items-center justify-center rounded-radius-md bg-surface-2 p-6">
								<Spinner size="md" />
							</div>
						) : status === "done" ? (
							content ? (
								<div className="space-y-2">{content}</div>
							) : (
								<p className="text-text-sm text-typography-muted italic">
									No content available.
								</p>
							)
						) : null}
					</div>
				</div>
			) : (
				<div className="flex items-center justify-center p-8">
					<p className="text-text-sm text-typography-muted">
						No file selected.
					</p>
				</div>
			)}
		</Dialog>
	)
}
