import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

// ─── Size maps (static — defined outside to avoid recreation on each render) ──

const MODAL_WIDTH: Record<string, string> = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
}

// Widths use two separate classes (w-* and max-w-*) instead of CSS min() inside
// a single arbitrary value — Tailwind's scanner stops at commas inside brackets.
const PANEL_WIDTH: Record<string, string> = {
	sm: "w-[380px] max-w-[calc(100vw-2rem)]",
	md: "w-[45vw] max-w-[640px]",
	lg: "w-[60vw] max-w-[900px]",
	xl: "w-[75vw] max-w-[1200px]",
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DialogProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof BaseDialog.Root>,
		// `dismissible` is our friendly abstraction over Base UI's `disablePointerDismissal`.
		// Omitting it prevents consumers from accidentally mixing both APIs.
		"disablePointerDismissal"
	> {
	title?: string
	description?: string
	/**
	 * Display mode of the dialog.
	 * - `"panel"` — slides in from the side (default)
	 * - `"modal"` — centered overlay
	 */
	mode?: "panel" | "modal"
	size?: "sm" | "md" | "lg" | "xl"
	/**
	 * Which edge the panel slides in from.
	 * Only applies when `mode="panel"`.
	 * @default "right"
	 */
	side?: "left" | "right"
	/**
	 * Controls dismissal behavior:
	 * - `true` (default) — clicking the backdrop or pressing Escape closes the dialog, and an X button is shown.
	 * - `false` — the dialog can only be closed programmatically via `onOpenChange`.
	 *   The X button is hidden and backdrop clicks are disabled.
	 */
	dismissible?: boolean
	/** Extra class names applied to the `Dialog.Popup` element (or its wrapper). */
	className?: string
	/** Granular class name overrides for internal parts. */
	classNames?: {
		backdrop?: string
		popup?: string
		title?: string
		description?: string
		content?: string
		close?: string
	}
	children?: React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Dialog({
	title,
	description,
	mode = "panel",
	size = "md",
	side = "right",
	dismissible = true,
	className,
	classNames,
	children,
	...rootProps
}: DialogProps) {
	// Translate our friendly prop to the Base UI API.
	const baseRootProps = {
		...rootProps,
		disablePointerDismissal: !dismissible,
	}

	// ── Shared header ──────────────────────────────────────────────────────────
	const header = (
		<div className="flex shrink-0 items-start justify-between border-border border-b p-5">
			<div className="flex flex-col gap-1">
				{title && (
					<BaseDialog.Title
						className={twMerge(
							"font-semibold text-typography-primary text-xl",
							classNames?.title,
						)}
					>
						{title}
					</BaseDialog.Title>
				)}
				{description && (
					<BaseDialog.Description
						className={twMerge(
							"text-sm text-typography-secondary",
							classNames?.description,
						)}
					>
						{description}
					</BaseDialog.Description>
				)}
			</div>
			{dismissible && (
				<BaseDialog.Close
					aria-label="Close dialog"
					className={twMerge(
						"ml-4 shrink-0 rounded-sm p-1.5 text-typography-muted transition-colors",
						"hover:bg-surface-2 hover:text-typography-primary",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus",
						classNames?.close,
					)}
				>
					<X className="size-5" aria-hidden="true" />
				</BaseDialog.Close>
			)}
		</div>
	)

	// ── Modal mode ─────────────────────────────────────────────────────────────
	if (mode === "modal") {
		return (
			<BaseDialog.Root {...baseRootProps}>
				<BaseDialog.Portal>
					<BaseDialog.Backdrop
						className={twMerge(
							"bct-dialog-backdrop fixed inset-0 z-100 bg-overlay backdrop-blur-md",
							classNames?.backdrop,
						)}
					/>
					{/*
					 * Plain div centering wrapper — BaseDialog.Popup lives inside it as
					 * a flex child so its dimensions and position are fully predictable.
					 */}
					<div className="fixed inset-0 z-110 flex items-center justify-center p-8">
						<BaseDialog.Popup
							className={twMerge(
								"bct-dialog-modal",
								"flex w-full flex-col overflow-hidden",
								// Explicit viewport calc so tall content is always constrained on screen
								"max-h-[calc(100vh-4rem)] rounded-xl border border-border bg-surface-1 shadow-shadow-xl",
								MODAL_WIDTH[size],
								classNames?.popup,
								className,
							)}
						>
							{header}
							<div
								className={twMerge("overflow-y-auto p-5", classNames?.content)}
							>
								{children}
							</div>
						</BaseDialog.Popup>
					</div>
				</BaseDialog.Portal>
			</BaseDialog.Root>
		)
	}

	// ── Panel mode ─────────────────────────────────────────────────────────────
	/*
	 * Layout:
	 *   - The Backdrop is `fixed inset-0 z-[100]` (sits behind everything).
	 *   - A `fixed inset-0 z-[110]` wrapper positions the panel using flexbox.
	 *   - Wrapper has `pointer-events-none` so clicks pass through to the Backdrop.
	 *   - Popup has `pointer-events-auto` so it captures its own clicks.
	 *   - `p-4` gives 16 px margin from every edge.
	 *   - The Popup is `h-full` so it fills the padded container height (viewport − 32 px).
	 */
	const panelAnimationClass =
		side === "right" ? "bct-dialog-panel-right" : "bct-dialog-panel-left"

	return (
		<BaseDialog.Root {...baseRootProps}>
			<BaseDialog.Portal>
				<BaseDialog.Backdrop
					className={twMerge(
						"bct-dialog-backdrop fixed inset-0 z-100 bg-overlay backdrop-blur-md",
						classNames?.backdrop,
					)}
				/>
				<div
					className={twMerge(
						"fixed inset-0 z-110 flex p-4",
						side === "right" ? "justify-end" : "justify-start",
					)}
				>
					<BaseDialog.Popup
						className={twMerge(
							panelAnimationClass,
							"flex h-full flex-col overflow-hidden",
							"rounded-xl border border-border bg-surface-1 shadow-shadow-xl",
							PANEL_WIDTH[size],
							classNames?.popup,
							className,
						)}
					>
						{header}
						<div
							className={twMerge(
								"flex-1 overflow-y-auto p-6",
								classNames?.content,
							)}
						>
							{children}
						</div>
					</BaseDialog.Popup>
				</div>
			</BaseDialog.Portal>
		</BaseDialog.Root>
	)
}
