"use client"

import { useState } from "react"
import { Switch } from "../../../../packages/ui/src/registry/versions/0.3.0/components/switch"
import type { VariantPreview } from "../types"

function SwitchDemo() {
	const [checked, setChecked] = useState(false)
	return (
		<Switch
			label={checked ? "Enabled" : "Disabled"}
			checked={checked}
			onCheckedChange={setChecked}
		/>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Toggle switch with label",
		code: `const [on, setOn] = useState(false)

<Switch
  label={on ? "Enabled" : "Disabled"}
  checked={on}
  onCheckedChange={setOn}
/>`,
		render: () => (
			<div className="flex flex-col gap-4">
				<SwitchDemo />
				<Switch label="Notifications" defaultChecked />
				<Switch label="Disabled (off)" disabled />
				<Switch label="Disabled (on)" disabled defaultChecked />
			</div>
		),
	},
]
