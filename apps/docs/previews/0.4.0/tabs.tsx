"use client"

import { useState } from "react"
import { Tabs } from "../../../../packages/ui/src/registry/versions/0.4.0/components/tabs"
import type { VariantPreview } from "../types"

const tabItems = [
	{ value: "overview", label: "Overview" },
	{ value: "props", label: "Props" },
	{ value: "examples", label: "Examples" },
]

function ControlledTabsDemo() {
	const [value, setValue] = useState("overview")
	return (
		<div className="flex w-full max-w-lg flex-col gap-4">
			<Tabs tabs={tabItems} value={value} onChange={setValue} />
			<p className="text-sm text-typography-muted">
				Selected: <span className="font-medium text-typography-primary">{value}</span>
			</p>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Uncontrolled segmented control with default selection",
		code: `<Tabs
  defaultValue="overview"
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "props", label: "Props" },
    { value: "examples", label: "Examples" },
  ]}
/>`,
		render: () => (
			<div className="w-full max-w-lg">
				<Tabs defaultValue="overview" tabs={tabItems} />
			</div>
		),
	},
	{
		name: "Controlled",
		description: "Controlled segmented control with external state",
		code: `const [value, setValue] = useState("overview")

<Tabs
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "props", label: "Props" },
    { value: "examples", label: "Examples" },
  ]}
  value={value}
  onChange={setValue}
/>`,
		render: () => <ControlledTabsDemo />,
	},
]
