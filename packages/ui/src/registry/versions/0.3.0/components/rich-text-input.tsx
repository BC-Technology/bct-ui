import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import clsx from "clsx"
import {
	Bold,
	Heading2,
	Italic,
	List,
	ListOrdered,
	Strikethrough,
} from "lucide-react"
import { twMerge } from "tailwind-merge"

export interface RichTextInputProps {
	value: string
	onChange: (value: string) => void
	label?: string
	error?: string
	helperText?: string
	placeholder?: string
	disabled?: boolean
	className?: string
	classNames?: {
		root?: string
		label?: string
		toolbar?: string
		toolbarButton?: string
		editor?: string
		error?: string
		helperText?: string
	}
}

const EDITOR_ID = "rich-text-editor"

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
					"min-h-32 w-full rounded-b-radius-md border-x border-b bg-surface-1 px-3 py-2",
					"text-text-base text-typography-primary",
					"outline-none transition-all duration-200",
					"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
					"prose prose-sm max-w-none",
					{
						"border-border": !error,
						"border-error": !!error,
					},
				),
			},
		},
	})

	if (!editor) return null

	const toolbarButtonBase = clsx(
		"rounded-radius-sm p-1.5 text-typography-secondary transition-colors",
		"hover:bg-surface-2 hover:text-typography-primary",
		"active:bg-surface-2-hover",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	const activeStyles = "bg-primary-muted text-primary"

	const toolbarButtons = [
		{
			label: "Bold",
			icon: <Bold className="size-4" />,
			action: () => editor.chain().focus().toggleBold().run(),
			canRun: () => editor.can().chain().focus().toggleBold().run(),
			isActive: editor.isActive("bold"),
		},
		{
			label: "Italic",
			icon: <Italic className="size-4" />,
			action: () => editor.chain().focus().toggleItalic().run(),
			canRun: () => editor.can().chain().focus().toggleItalic().run(),
			isActive: editor.isActive("italic"),
		},
		{
			label: "Strikethrough",
			icon: <Strikethrough className="size-4" />,
			action: () => editor.chain().focus().toggleStrike().run(),
			canRun: () => editor.can().chain().focus().toggleStrike().run(),
			isActive: editor.isActive("strike"),
		},
		null,
		{
			label: "Heading",
			icon: <Heading2 className="size-4" />,
			action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
			canRun: () => true,
			isActive: editor.isActive("heading", { level: 2 }),
		},
		null,
		{
			label: "Bullet list",
			icon: <List className="size-4" />,
			action: () => editor.chain().focus().toggleBulletList().run(),
			canRun: () => editor.can().chain().focus().toggleBulletList().run(),
			isActive: editor.isActive("bulletList"),
		},
		{
			label: "Ordered list",
			icon: <ListOrdered className="size-4" />,
			action: () => editor.chain().focus().toggleOrderedList().run(),
			canRun: () => editor.can().chain().focus().toggleOrderedList().run(),
			isActive: editor.isActive("orderedList"),
		},
	]

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			{label && (
				<label
					htmlFor={EDITOR_ID}
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</label>
			)}

			<div
				className={twMerge(
					clsx(
						"flex flex-wrap items-center gap-0.5 rounded-t-radius-md border border-border bg-surface-1 p-1",
						{ "border-error": !!error },
					),
					classNames?.toolbar,
				)}
			>
				{toolbarButtons.map((btn, i) =>
					btn === null ? (
						<div
							key={`separator-${i}-of-${toolbarButtons.length}`}
							className="mx-1 h-5 w-px bg-divider"
						/>
					) : (
						<button
							key={btn.label}
							type="button"
							onClick={btn.action}
							disabled={disabled || !btn.canRun()}
							className={twMerge(
								clsx(toolbarButtonBase, { [activeStyles]: btn.isActive }),
								classNames?.toolbarButton,
							)}
							aria-label={btn.label}
							aria-pressed={btn.isActive}
						>
							{btn.icon}
						</button>
					),
				)}
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
