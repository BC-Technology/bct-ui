"use client"

import { Alert } from "../../../../packages/ui/src/registry/versions/0.2.0/components/alert"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
	{
		name: "Variants",
		description: "All four semantic alert variants",
		code: `<Alert variant="info" title="Information">This is an informational message.</Alert>
<Alert variant="success" title="Success!">Your changes have been saved.</Alert>
<Alert variant="warning" title="Warning">This action may have side effects.</Alert>
<Alert variant="error" title="Error">Something went wrong. Please try again.</Alert>`,
		render: () => (
			<div className="flex w-full max-w-lg flex-col gap-3">
				<Alert variant="info" title="Information">
					This is an informational message.
				</Alert>
				<Alert variant="success" title="Success!">
					Your changes have been saved.
				</Alert>
				<Alert variant="warning" title="Warning">
					This action may have side effects.
				</Alert>
				<Alert variant="error" title="Error">
					Something went wrong. Please try again.
				</Alert>
			</div>
		),
	},
	{
		name: "Dismissible",
		description: "Alert with close button",
		code: `<Alert variant="info" title="Update available" onClose={() => {}}>
  A new version of BCT UI is available.
</Alert>`,
		render: () => (
			<div className="w-full max-w-lg">
				<Alert variant="info" title="Update available" onClose={() => {}}>
					A new version of BCT UI is available.
				</Alert>
			</div>
		),
	},
]
