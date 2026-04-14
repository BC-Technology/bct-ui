"use client"

import { useState } from "react"
import { Portal } from "../../../../packages/ui/src/registry/versions/0.2.0/components/portal"
import type { VariantPreview } from "../types"

function PortalDemo() {
	const [show, setShow] = useState(false)
	return (
		<div className="flex flex-col items-center gap-4">
			<button
				type="button"
				onClick={() => setShow(!show)}
				className="rounded-md border border-border bg-surface-1 px-4 py-2 text-sm text-typography-primary transition-colors hover:bg-surface-2"
			>
				{show ? "Hide portal content" : "Show portal content"}
			</button>
			{show && (
				<Portal>
					<div className="fixed right-4 bottom-4 z-50 rounded-lg border border-border bg-surface-1 p-4 shadow-shadow-lg">
						<p className="text-sm text-typography-primary">
							This is rendered in a portal (outside the React tree)
						</p>
						<button
							type="button"
							onClick={() => setShow(false)}
							className="mt-2 text-typography-muted text-xs underline"
						>
							Dismiss
						</button>
					</div>
				</Portal>
			)}
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description:
			"Renders content outside the React component tree using createPortal",
		code: `<Portal>
  <div className="fixed bottom-4 right-4">
    Portal content rendered at document.body
  </div>
</Portal>`,
		render: () => <PortalDemo />,
	},
]
