"use client"

import { Alert } from "../../../../../packages/ui/src/registry/versions/0.2.0/components/alert"
import type { VariantExample } from "../types"

export const variants: VariantExample[] = [
	{
		name: "Info Alert",
		description: "Informational message",
		code: `<Alert variant="info">
  This is an informational message
</Alert>`,
		preview: (
			<Alert variant="info">
				This is an informational message about your account settings.
			</Alert>
		),
	},
	{
		name: "Success Alert",
		description: "Success confirmation message",
		code: `<Alert variant="success">
  Your changes have been saved successfully
</Alert>`,
		preview: (
			<Alert variant="success">
				Your changes have been saved successfully!
			</Alert>
		),
	},
	{
		name: "Warning Alert",
		description: "Warning message",
		code: `<Alert variant="warning">
  Please review your settings before continuing
</Alert>`,
		preview: (
			<Alert variant="warning">
				Please review your settings before continuing.
			</Alert>
		),
	},
	{
		name: "Error Alert",
		description: "Error message",
		code: `<Alert variant="error">
  An error occurred while processing your request
</Alert>`,
		preview: (
			<Alert variant="error">
				An error occurred while processing your request. Please try again.
			</Alert>
		),
	},
]
