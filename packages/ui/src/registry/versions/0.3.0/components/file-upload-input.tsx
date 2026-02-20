import clsx from "clsx"
import {
	File as FileGenericIcon,
	Maximize2,
	Undo,
	Upload,
	X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"
import { type ImageMetadata, ImagePreviewDialog } from "./image-preview-dialog"

export type FileAcceptType =
	| "image/*"
	| "image/jpeg,image/png,image/gif,image/webp,image/heic"
	| "video/*"
	| "audio/*"
	| "application/pdf"
	| "text/*"
	| "application/json"
	| ".csv,.xlsx,.xls"
	| string

export interface ExistingFileItem {
	id: string
	url?: string
	name?: string
	fileName?: string
	size?: number
	mimeType?: string
}

export interface FileUploadInputProps {
	onFileSelect: (files: FileList) => void
	accept?: FileAcceptType
	maxFiles?: number
	maxSize?: number
	placeholder?: string
	isLoading?: boolean
	error?: string
	className?: string
	ariaDescription?: string
	id?: string
	icon?: React.ReactNode
	existingItems?: ExistingFileItem[]
	onExistingRemovedChange?: (removedIds: string[]) => void
	resetTrigger?: number
	allowReplace?: boolean
	disabled?: boolean
	classNames?: {
		root?: string
		dropzone?: string
		fileList?: string
		error?: string
	}
}

function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0) return "0 Bytes"
	const k = 1024
	const dm = decimals < 0 ? 0 : decimals
	const sizes = ["Bytes", "KB", "MB", "GB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
}

function isImageAccept(accept: string): boolean {
	return accept.toLowerCase().includes("image")
}

function getSupportedTypesText(accept: string): string {
	const parts = accept.split(",").map((p) => p.trim())
	const extensions: string[] = []
	for (const part of parts) {
		const lower = part.toLowerCase()
		if (lower === "image/*") extensions.push(".png", ".jpg", ".heic")
		else if (lower === "video/*") extensions.push(".mp4", ".mov", ".avi")
		else if (lower === "audio/*") extensions.push(".mp3", ".wav", ".m4a")
		else if (lower === "application/pdf") extensions.push(".pdf")
		else if (lower === "application/json") extensions.push(".json")
		else if (lower === "text/*") extensions.push(".txt", ".md")
		else if (lower.includes("csv") || lower.includes("xls"))
			extensions.push(".csv", ".xlsx", ".xls")
		else if (lower.includes("image/jpeg") || lower.includes("image/png"))
			extensions.push(".jpg", ".png", ".gif", ".webp", ".heic")
		else {
			const ext = part.match(/\.\w+$/)
			if (ext) extensions.push(ext[0])
		}
	}
	return Array.from(new Set(extensions)).sort().join(" ")
}

export function FileUploadInput({
	onFileSelect,
	icon,
	accept = "image/*",
	maxFiles = 1,
	maxSize,
	placeholder,
	isLoading = false,
	error,
	className = "",
	ariaDescription,
	id = "file-upload",
	existingItems = [],
	onExistingRemovedChange,
	resetTrigger,
	allowReplace = false,
	disabled = false,
	classNames,
}: FileUploadInputProps) {
	const [dragActive, setDragActive] = useState(false)
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [fileErrors, setFileErrors] = useState<string[]>([])
	const [removedExistingIds, setRemovedExistingIds] = useState<Set<string>>(
		new Set(),
	)
	const [expandedImage, setExpandedImage] = useState<{
		url: string
		alt: string
		metadata?: ImageMetadata
	} | null>(null)
	const [objectUrls, setObjectUrls] = useState<Map<File, string>>(new Map())
	const objectUrlsRef = useRef<Map<File, string>>(new Map())
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (resetTrigger !== undefined) {
			setSelectedFiles([])
			setFileErrors([])
			setRemovedExistingIds(new Set())
			if (inputRef.current) inputRef.current.value = ""
		}
	}, [resetTrigger])

	useEffect(() => {
		const newUrls = new Map<File, string>()
		for (const file of selectedFiles) {
			newUrls.set(
				file,
				objectUrlsRef.current.get(file) ?? URL.createObjectURL(file),
			)
		}
		for (const [file, url] of objectUrlsRef.current) {
			if (!newUrls.has(file)) URL.revokeObjectURL(url)
		}
		objectUrlsRef.current = newUrls
		setObjectUrls(newUrls)
		return () => {
			for (const url of newUrls.values()) URL.revokeObjectURL(url)
		}
	}, [selectedFiles])

	const activeExistingCount = useMemo(() => {
		let count = 0
		for (const item of existingItems) {
			if (!removedExistingIds.has(item.id)) count++
		}
		return count
	}, [existingItems, removedExistingIds])

	const handleToggleExisting = (itemId: string) => {
		setRemovedExistingIds((prev) => {
			const next = new Set(prev)
			if (next.has(itemId)) next.delete(itemId)
			else next.add(itemId)
			onExistingRemovedChange?.(Array.from(next))
			return next
		})
	}

	const handleFiles = (files: FileList | null) => {
		if (!files) return
		let fileArray = Array.from(files)
		const errors: string[] = []

		if (allowReplace && fileArray.length > 0) {
			const toRemove = existingItems
				.filter((i) => !removedExistingIds.has(i.id))
				.map((i) => i.id)
			if (toRemove.length > 0) {
				const newRemoved = new Set([...removedExistingIds, ...toRemove])
				setRemovedExistingIds(newRemoved)
				onExistingRemovedChange?.(Array.from(newRemoved))
			}
			if (fileArray.length > maxFiles) {
				fileArray = fileArray.slice(0, maxFiles)
				errors.push(
					`Maximum ${maxFiles} ${maxFiles > 1 ? "files" : "file"} allowed.`,
				)
			}
			setSelectedFiles([])
		} else {
			const allowed = Math.max(
				0,
				maxFiles - activeExistingCount - selectedFiles.length,
			)
			if (fileArray.length > allowed) {
				if (allowed <= 0) {
					errors.push(
						`Maximum ${maxFiles} ${maxFiles > 1 ? "files" : "file"} already reached.`,
					)
					setFileErrors(errors)
					return
				}
				fileArray = fileArray.slice(0, allowed)
				errors.push(
					`Only ${allowed} more ${allowed > 1 ? "files" : "file"} can be added (max ${maxFiles}).`,
				)
			}
		}

		const validFiles = fileArray.filter((file) => {
			if (maxSize && file.size > maxSize) {
				errors.push(
					`"${file.name}" exceeds the maximum size of ${formatBytes(maxSize)}.`,
				)
				return false
			}
			return true
		})

		const allFiles = allowReplace
			? validFiles
			: [...selectedFiles, ...validFiles]
		setFileErrors(errors)
		setSelectedFiles(allFiles)

		const dt = new DataTransfer()
		for (const file of allFiles) dt.items.add(file)
		onFileSelect(dt.files)
	}

	const removeFile = (index: number) => {
		const newFiles = [...selectedFiles]
		newFiles.splice(index, 1)
		setSelectedFiles(newFiles)
		setFileErrors([])
		const dt = new DataTransfer()
		for (const file of newFiles) dt.items.add(file)
		if (inputRef.current) {
			inputRef.current.files = dt.files
			if (newFiles.length === 0) inputRef.current.value = ""
		}
		onFileSelect(dt.files)
	}

	const handleDrag = (e: React.DragEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
		else if (e.type === "dragleave") setDragActive(false)
	}

	const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files)
	}

	const placeholderText =
		placeholder ??
		(maxFiles === 1 ? "Click to upload a file" : "Click to upload files")
	const supportedText = accept ? getSupportedTypesText(accept) : ""
	const isImage = isImageAccept(accept ?? "")

	const expandBtnClass =
		"absolute left-1 top-1 cursor-pointer rounded-radius-sm bg-surface-1 p-0.5 text-typography-primary opacity-0 transition-all hover:bg-primary hover:text-primary-on group-hover:opacity-100"
	const removeBtnClass =
		"absolute right-1 top-1 cursor-pointer rounded-radius-sm bg-surface-1 p-0.5 text-typography-primary opacity-0 transition-all hover:bg-error hover:text-error-on group-hover:opacity-100"
	const restoreBtnClass =
		"absolute right-1 top-1 cursor-pointer rounded-radius-sm bg-surface-1 p-0.5 text-typography-primary opacity-0 transition-all hover:bg-success hover:text-success-on group-hover:opacity-100"

	return (
		<div className={twMerge("w-full", classNames?.root, className)}>
			<button
				type="button"
				disabled={isLoading || disabled}
				onClick={() => inputRef.current?.click()}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				className={twMerge(
					clsx(
						"w-full rounded-radius-md border-2 border-dashed bg-surface-1 p-6 transition-colors duration-200",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
						{
							"border-primary bg-primary-muted": dragActive,
							"border-border hover:border-primary hover:bg-surface-1-hover":
								!dragActive && !error,
							"border-error": !!error && !dragActive,
							"pointer-events-none opacity-50": isLoading || disabled,
						},
					),
					classNames?.dropzone,
				)}
				aria-describedby={ariaDescription ? "file-description" : undefined}
			>
				<div className="flex flex-col items-center gap-3 py-4">
					{icon ?? (
						<Upload
							size={40}
							className="text-typography-muted"
							strokeWidth={1.5}
							aria-hidden="true"
						/>
					)}
					<p className="text-center text-text-sm text-typography-muted">
						{placeholderText.split(" ").slice(0, -2).join(" ")}{" "}
						<span className="cursor-pointer font-semibold text-primary underline">
							{placeholderText.split(" ").slice(-2).join(" ")}
						</span>
					</p>
					<input
						ref={inputRef}
						type="file"
						id={id}
						accept={accept}
						multiple={maxFiles > 1}
						onChange={(e) => handleFiles(e.target.files)}
						disabled={isLoading || disabled}
						className="hidden"
						aria-invalid={!!error}
					/>
				</div>
			</button>

			<div className="mt-2 flex items-center justify-between">
				{supportedText && (
					<span className="text-text-xs text-typography-muted">
						Supported: {supportedText}
					</span>
				)}
				{maxSize && (
					<span className="text-text-xs text-typography-muted">
						Max: {formatBytes(maxSize)}
					</span>
				)}
			</div>

			{(existingItems.length > 0 || selectedFiles.length > 0) && (
				<div className={twMerge("mt-4", classNames?.fileList)}>
					{isImage ? (
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
							{existingItems.map((item) => {
								const removed = removedExistingIds.has(item.id)
								return (
									<div
										key={`existing-${item.id}`}
										className={clsx(
											"group relative aspect-square overflow-hidden rounded-radius-md border border-border bg-surface-2",
											{ "opacity-30": removed },
										)}
									>
										{item.url ? (
											<img
												src={item.url}
												alt={item.name ?? "Existing image"}
												className="size-full object-contain"
											/>
										) : (
											<div className="flex size-full items-center justify-center text-typography-muted">
												<FileGenericIcon size={24} />
											</div>
										)}
										<div className="absolute inset-0 bg-dark opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
										{item.url && (
											<button
												type="button"
												disabled={isLoading || removed}
												className={expandBtnClass}
												title="Expand"
												onClick={(e) => {
													e.stopPropagation()
													const itemUrl = item.url ?? ""
													setExpandedImage({
														url: itemUrl,
														alt: item.name ?? item.fileName ?? "Image",
														metadata: {
															name: item.name ?? item.fileName,
															size: item.size,
															mimeType: item.mimeType,
														},
													})
												}}
											>
												<Maximize2 className="h-4 w-4" />
											</button>
										)}
										<button
											type="button"
											disabled={isLoading || disabled}
											className={removed ? restoreBtnClass : removeBtnClass}
											title={removed ? "Restore" : "Remove"}
											onClick={() => handleToggleExisting(item.id)}
										>
											{removed ? (
												<Undo className="h-4 w-4" />
											) : (
												<X className="h-4 w-4" />
											)}
										</button>
										<div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-overlay to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
											<p className="truncate text-light text-text-xs">
												{item.name ?? "Existing"}
											</p>
											{typeof item.size === "number" && (
												<p className="text-light/80 text-text-xs">
													{formatBytes(item.size)}
												</p>
											)}
										</div>
									</div>
								)
							})}
							{selectedFiles.map((file) => {
								const imageUrl = objectUrls.get(file)
								if (!imageUrl) return null
								return (
									<div
										key={`${file.name}-${file.lastModified}`}
										className="group relative aspect-square overflow-hidden rounded-radius-md border border-border bg-surface-2"
									>
										<img
											src={imageUrl}
											alt={file.name}
											className="size-full object-contain"
										/>
										<div className="absolute inset-0 bg-dark opacity-0 transition-opacity duration-300 group-hover:opacity-50" />
										<button
											type="button"
											disabled={isLoading || disabled}
											className={expandBtnClass}
											title="Expand"
											onClick={(e) => {
												e.stopPropagation()
												setExpandedImage({
													url: imageUrl,
													alt: file.name,
													metadata: {
														name: file.name,
														size: file.size,
														mimeType: file.type,
													},
												})
											}}
										>
											<Maximize2 className="h-4 w-4" />
										</button>
										<button
											type="button"
											disabled={isLoading || disabled}
											className={removeBtnClass}
											title="Remove"
											onClick={() => removeFile(selectedFiles.indexOf(file))}
										>
											<X className="h-4 w-4" />
										</button>
										<div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-overlay to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
											<p className="truncate text-light text-text-xs">
												{file.name}
											</p>
											<p className="text-light/80 text-text-xs">
												{formatBytes(file.size)}
											</p>
										</div>
									</div>
								)
							})}
						</div>
					) : (
						<div className="flex flex-col gap-2">
							{existingItems.map((item) => {
								const removed = removedExistingIds.has(item.id)
								return (
									<div
										key={`existing-${item.id}`}
										className={clsx(
											"flex items-center justify-between rounded-radius-md bg-surface-1 p-2",
											{ "opacity-30": removed },
										)}
									>
										<div className="flex items-center gap-3">
											<FileGenericIcon
												size={20}
												className="text-typography-muted"
											/>
											<div className="flex flex-col">
												<span className="text-text-sm text-typography-primary">
													{item.name ?? item.fileName ?? "Existing file"}
												</span>
												{typeof item.size === "number" && (
													<span className="text-text-xs text-typography-muted">
														{formatBytes(item.size)}
													</span>
												)}
											</div>
										</div>
										<button
											type="button"
											disabled={isLoading || disabled}
											title={removed ? "Restore" : "Remove"}
											className={clsx(
												"rounded-full p-1 text-typography-muted transition-colors hover:bg-surface-2",
												removed ? "hover:text-success" : "hover:text-error",
											)}
											onClick={() => handleToggleExisting(item.id)}
										>
											{removed ? <Undo size={16} /> : <X size={16} />}
										</button>
									</div>
								)
							})}
							{selectedFiles.map((file) => (
								<div
									key={`${file.name}-${file.lastModified}`}
									className="flex items-center justify-between rounded-radius-md bg-surface-1 p-2"
								>
									<div className="flex items-center gap-3">
										<FileGenericIcon
											size={20}
											className="text-typography-muted"
										/>
										<div className="flex flex-col">
											<span className="text-text-sm text-typography-primary">
												{file.name}
											</span>
											<span className="text-text-xs text-typography-muted">
												{formatBytes(file.size)}
											</span>
										</div>
									</div>
									<button
										type="button"
										disabled={isLoading || disabled}
										title="Remove"
										className="rounded-full p-1 text-typography-muted transition-colors hover:bg-surface-2 hover:text-error"
										onClick={() => removeFile(selectedFiles.indexOf(file))}
									>
										<X size={16} />
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			{fileErrors.length > 0 && (
				<div className={twMerge("mt-2 flex flex-col gap-1", classNames?.error)}>
					{fileErrors.map((err) => (
						<p key={err} className="text-error text-text-xs">
							{err}
						</p>
					))}
				</div>
			)}
			{error && (
				<p
					className={twMerge("mt-2 text-error text-text-sm", classNames?.error)}
				>
					{error}
				</p>
			)}
			{ariaDescription && (
				<p id="file-description" className="sr-only">
					{ariaDescription}
				</p>
			)}

			<ImagePreviewDialog
				isOpen={expandedImage !== null}
				onClose={() => setExpandedImage(null)}
				src={expandedImage?.url}
				alt={expandedImage?.alt}
				metadata={expandedImage?.metadata}
				renderInline={false}
			/>
		</div>
	)
}
