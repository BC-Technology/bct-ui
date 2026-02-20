import clsx from "clsx"
import { Maximize2 } from "lucide-react"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Dialog } from "./dialog"

export type ImageMetadata = {
	name?: string
	size?: number
	mimeType?: string
	width?: number
	height?: number
}

export interface ImagePreviewDialogProps {
	src?: string
	alt?: string
	className?: string
	/** If true, clicking the image opens the viewer. Defaults to true. */
	clickToOpen?: boolean
	/** If true, show a hover maximize button overlay. Defaults to false. */
	showHoverButton?: boolean
	/** Optional metadata to display in the viewer dialog */
	metadata?: ImageMetadata
	/** If true, hides metadata in the viewer. Defaults to false. */
	hideMetadata?: boolean
	/** Controlled mode: externally controlled open state */
	isOpen?: boolean
	/** Controlled mode: callback when viewer should close */
	onClose?: () => void
	/** If false, do not render the inline image/trigger; only render the dialog. Defaults to true. */
	renderInline?: boolean
	classNames?: {
		root?: string
		image?: string
		dialog?: string
		metadata?: string
	}
}

function formatBytes(bytes?: number): string {
	if (!bytes || bytes === 0) return "0 B"
	const k = 1024
	const sizes = ["B", "KB", "MB", "GB"]
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

export function ImagePreviewDialog({
	src,
	alt,
	className,
	clickToOpen = true,
	showHoverButton = false,
	metadata,
	hideMetadata = false,
	isOpen: externalIsOpen,
	onClose: externalOnClose,
	renderInline = true,
	classNames,
}: ImagePreviewDialogProps) {
	const [internalOpen, setInternalOpen] = useState(false)

	const isControlled = externalIsOpen !== undefined
	const open = isControlled ? !!externalIsOpen : internalOpen

	const openViewer = () => {
		if (!src) return
		if (isControlled) return
		setInternalOpen(true)
	}

	const closeViewer = () => {
		if (isControlled) {
			externalOnClose?.()
		} else {
			setInternalOpen(false)
		}
	}

	return (
		<>
			{renderInline && (
				<div className={twMerge("group relative", classNames?.root, className)}>
					{src ? (
						<img
							src={src}
							alt={alt}
							className={twMerge(
								clsx("h-auto w-full rounded-radius-md object-cover", {
									"cursor-pointer": clickToOpen,
								}),
								classNames?.image,
							)}
							onClick={clickToOpen ? openViewer : undefined}
							onKeyDown={
								clickToOpen
									? (e) => {
											if (e.key === "Enter" || e.key === " ") {
												e.preventDefault()
												openViewer()
											}
										}
									: undefined
							}
							role={clickToOpen ? "button" : undefined}
							tabIndex={clickToOpen ? 0 : -1}
						/>
					) : (
						<div className="flex h-24 w-full items-center justify-center rounded-radius-md border border-border bg-surface-2 text-text-sm text-typography-muted">
							No image
						</div>
					)}

					{showHoverButton && src && (
						<div className="pointer-events-none absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
							<button
								type="button"
								className="pointer-events-auto rounded-radius-sm bg-surface-1 p-1 text-typography-primary shadow-shadow-sm transition-colors hover:bg-primary hover:text-primary-on"
								onClick={(e) => {
									e.stopPropagation()
									openViewer()
								}}
								aria-label="Expand image"
							>
								<Maximize2 className="h-4 w-4" />
							</button>
						</div>
					)}
				</div>
			)}

			<Dialog
				open={open}
				onOpenChange={(o) => {
					if (!o) closeViewer()
				}}
				mode="modal"
				size="xl"
				className={classNames?.dialog}
			>
				<div className="flex w-full flex-col gap-4">
					{!hideMetadata && metadata && (
						<div
							className={twMerge(
								"flex flex-col gap-3 rounded-radius-md border border-border bg-surface-2 p-4",
								classNames?.metadata,
							)}
						>
							{metadata.name && (
								<div className="flex items-center justify-between gap-2">
									<span className="text-text-sm text-typography-muted">
										Name
									</span>
									<span className="break-all text-right text-text-sm text-typography-primary">
										{metadata.name}
									</span>
								</div>
							)}
							{(metadata.size !== undefined ||
								metadata.mimeType ||
								(metadata.width !== undefined &&
									metadata.height !== undefined)) && (
								<>
									{metadata.name && <div className="border-divider border-t" />}
									<div className="flex flex-wrap gap-x-6 gap-y-2">
										{metadata.size !== undefined && (
											<div className="flex items-center gap-2">
												<span className="text-text-sm text-typography-muted">
													Size
												</span>
												<span className="text-text-sm text-typography-primary">
													{formatBytes(metadata.size)}
												</span>
											</div>
										)}
										{metadata.mimeType && (
											<div className="flex items-center gap-2">
												<span className="text-text-sm text-typography-muted">
													Type
												</span>
												<span className="text-text-sm text-typography-primary">
													{metadata.mimeType}
												</span>
											</div>
										)}
										{metadata.width !== undefined &&
											metadata.height !== undefined && (
												<div className="flex items-center gap-2">
													<span className="text-text-sm text-typography-muted">
														Dimensions
													</span>
													<span className="text-text-sm text-typography-primary">
														{metadata.width} × {metadata.height} px
													</span>
												</div>
											)}
									</div>
								</>
							)}
						</div>
					)}

					<div className="flex w-full items-center justify-center overflow-auto">
						{src && (
							<img
								src={src}
								alt={alt || "Image preview"}
								className="h-auto w-full rounded-radius-md object-contain"
							/>
						)}
					</div>
				</div>
			</Dialog>
		</>
	)
}
