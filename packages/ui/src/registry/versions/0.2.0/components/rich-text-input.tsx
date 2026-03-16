import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import clsx from "clsx"
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react"
import { twMerge } from "tailwind-merge"

export interface RichTextInputProps {
	value: string
	onChange: (value: string) => void
	label?: string
	error?: string
	helperText?: string
	disabled?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		toolbar?: string
		editor?: string
		error?: string
		helperText?: string
	}
}

export function RichTextInput({
	value,
	onChange,
	label,
	error,
	helperText,
	disabled = false,
	className,
	classNames,
}: RichTextInputProps) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		editable: !disabled,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML())
		},
		editorProps: {
			attributes: {
				class: clsx(
					"prose prose-sm max-w-none rounded-radius-md border bg-surface-1 px-3 py-2",
					"text-text-base text-typography-primary",
					"min-h-32 outline-none transition-all duration-200",
					"focus:border-primary focus:ring-2 focus:ring-primary-focus",
					{
						"border-border": !error,
						"border-error focus:border-error focus:ring-error": error,
					},
				),
			},
		},
	})

	if (!editor) {
		return null
	}

	const toolbarButtonStyles = clsx(
		"rounded-radius-sm p-2 text-typography-primary transition-colors",
		"hover:bg-surface-2 active:bg-surface-2-hover",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	const activeButtonStyles = "bg-primary text-primary-on hover:bg-primary-hover"

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			{label && (
				<label
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
					htmlFor="rich-text-input"
				>
					{label}
				</label>
			)}

			<div
				className={twMerge(
					"flex flex-wrap items-center gap-1 rounded-radius-md border border-border bg-surface-1 p-1",
					classNames?.toolbar,
				)}
			>
				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBold().run()}
					disabled={
						disabled || !editor.can().chain().focus().toggleBold().run()
					}
					className={clsx(toolbarButtonStyles, {
						[activeButtonStyles]: editor.isActive("bold"),
					})}
					aria-label="Bold"
				>
					<Bold className="size-4" />
				</button>

				<button
					type="button"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					disabled={
						disabled || !editor.can().chain().focus().toggleItalic().run()
					}
					className={clsx(toolbarButtonStyles, {
						[activeButtonStyles]: editor.isActive("italic"),
					})}
					aria-label="Italic"
				>
					<Italic className="size-4" />
				</button>

				<button
					type="button"
					onClick={() => editor.chain().focus().toggleStrike().run()}
					disabled={
						disabled || !editor.can().chain().focus().toggleStrike().run()
					}
					className={clsx(toolbarButtonStyles, {
						[activeButtonStyles]: editor.isActive("strike"),
					})}
					aria-label="Strikethrough"
				>
					<Strikethrough className="size-4" />
				</button>

				<div className="mx-1 h-6 w-px bg-divider" />

				<button
					type="button"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					disabled={
						disabled || !editor.can().chain().focus().toggleBulletList().run()
					}
					className={clsx(toolbarButtonStyles, {
						[activeButtonStyles]: editor.isActive("bulletList"),
					})}
					aria-label="Bullet list"
				>
					<List className="size-4" />
				</button>

				<button
					type="button"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					disabled={
						disabled || !editor.can().chain().focus().toggleOrderedList().run()
					}
					className={clsx(toolbarButtonStyles, {
						[activeButtonStyles]: editor.isActive("orderedList"),
					})}
					aria-label="Ordered list"
				>
					<ListOrdered className="size-4" />
				</button>
			</div>

			<EditorContent editor={editor} className={twMerge(classNames?.editor)} />

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
