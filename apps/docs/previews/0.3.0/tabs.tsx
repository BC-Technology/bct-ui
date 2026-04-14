"use client"

import { Tabs } from "../../../../packages/ui/src/registry/versions/0.3.0/components/tabs"
import type { VariantPreview } from "../types"

const tabItems = [
	{
		value: "overview",
		label: "Overview",
		content: (
			<p className="text-typography-secondary">
				This is the overview tab content. It provides a high-level summary of the
				component's purpose and usage.
			</p>
		),
	},
	{
		value: "props",
		label: "Props",
		content: (
			<p className="text-typography-secondary">
				Props documentation would be listed here with types and default values.
			</p>
		),
	},
	{
		value: "examples",
		label: "Examples",
		content: (
			<p className="text-typography-secondary">
				Code examples and usage patterns for common scenarios.
			</p>
		),
	},
	{
		value: "disabled",
		label: "Disabled",
		content: <p>You won't see this.</p>,
		disabled: true,
	},
]

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Tab navigation with animated underline indicator",
		code: `<Tabs
  defaultValue="overview"
  items={[
    { value: "overview", label: "Overview", content: <p>Overview content</p> },
    { value: "props", label: "Props", content: <p>Props content</p> },
    { value: "examples", label: "Examples", content: <p>Examples content</p> },
  ]}
/>`,
		render: () => (
			<div className="w-full max-w-lg">
				<Tabs defaultValue="overview" items={tabItems} />
			</div>
		),
	},
]
