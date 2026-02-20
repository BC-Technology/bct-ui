import clsx from "clsx"
import { Upload, X } from "lucide-react"
import { type DragEvent, useId, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface FileUploadProps {
	value?: File[]
	onChange: (files: File[]) => void
	label?: string
	error?: string
	helperText?: string
	accept?: string
	multiple?: boolean
	disabled?: boolean
	maxSize?: number
	className?: string
	classNames?: {
		root?: string
		label?: string
		dropzone?: string
		fileList?: string
		error?: string
		helperText?: string
	}
}

export function FileUpload({
	value = [],
	onChange,
	label,
	error,
	helperText,
	accept,
	multiple = false,
	disabled = false,
	maxSize,
	className,
	classNames,
}: FileUploadProps) {
	const inputId = useId()
	const inputRef = useRef<HTMLInputElement>(null)
	const [isDragging, setIsDragging] = useState(false)

	const handleFiles = (files: FileList | null) => {
		if (!files) return
		const fileArray = Array.from(files)
		const validFiles = maxSize
			? fileArray.filter((file) => file.size <= maxSize)
			: fileArray
		onChange(multiple ? [...value, ...validFiles] : validFiles)
	}

	const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
		e.preventDefault()
		if (!disabled) setIsDragging(true)
	}

	const handleDragLeave = (e: DragEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleDrop = (e: DragEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsDragging(false)
		if (!disabled) handleFiles(e.dataTransfer.files)
	}

	const handleRemove = (index: number) => {
		onChange(value.filter((_, i) => i !== index))
	}

	const dropzoneStyles = clsx(
		"flex w-full flex-col items-center justify-center gap-3 rounded-radius-md border-2 border-dashed bg-surface-1 p-8",
		"cursor-pointer transition-all duration-200",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
		{
			"border-primary bg-primary-muted": isDragging,
			"border-border hover:border-primary hover:bg-surface-1-hover":
				!isDragging && !error,
			"border-error": !!error && !isDragging,
			"cursor-not-allowed opacity-50": disabled,
		},
	)

	return (
		<div
			className={twMerge("flex flex-col gap-2", classNames?.root, className)}
		>
			{label && (
				<label
					htmlFor={inputId}
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</label>
			)}

			<button
				type="button"
				className={twMerge(dropzoneStyles, classNames?.dropzone)}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={() => !disabled && inputRef.current?.click()}
				disabled={disabled}
			>
				<Upload className="size-10 text-typography-muted" />
				<div className="text-center">
					<p className="text-text-base text-typography-primary">
						<span className="font-semibold text-primary">Click to upload</span>{" "}
						or drag and drop
					</p>
					{accept && (
						<p className="mt-1 text-text-sm text-typography-muted">
							Accepted: {accept}
						</p>
					)}
					{maxSize && (
						<p className="mt-1 text-text-sm text-typography-muted">
							Max size: {(maxSize / 1024 / 1024).toFixed(1)} MB
						</p>
					)}
				</div>
				<input
					ref={inputRef}
					id={inputId}
					type="file"
					accept={accept}
					multiple={multiple}
					disabled={disabled}
					onChange={(e) => handleFiles(e.target.files)}
					className="hidden"
				/>
			</button>

			{value.length > 0 && (
				<div className={twMerge("flex flex-col gap-1.5", classNames?.fileList)}>
					{value.map((file, index) => (
						<div
							key={`${file.name}-${index}`}
							className="flex items-center justify-between gap-2 rounded-radius-md border border-border bg-surface-1 px-3 py-2"
						>
							<div className="min-w-0 flex-1">
								<p className="truncate font-medium text-text-sm text-typography-primary">
									{file.name}
								</p>
								<p className="text-text-xs text-typography-muted">
									{(file.size / 1024).toFixed(1)} KB
								</p>
							</div>
							<button
								type="button"
								onClick={() => handleRemove(index)}
								disabled={disabled}
								className="shrink-0 rounded-radius-sm p-1 text-typography-muted transition-colors hover:bg-surface-2 hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
							>
								<X className="size-4" />
							</button>
						</div>
					))}
				</div>
			)}

			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
			{helperText && !error && (
				<span
					className={twMerge(
						"text-text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</span>
			)}
		</div>
	)
}
