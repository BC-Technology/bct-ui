"use client"

import { useState } from "react"
import { ColorPicker } from "../../../../packages/ui/src/registry/versions/0.4.0/components/color-picker"
import type { VariantPreview } from "../types"

function ColorPickerDemo() {
	const [color, setColor] = useState("#21459b")
	return (
		<div className="flex flex-col items-center gap-3">
			<ColorPicker value={color} onChange={setColor} label="Brand color" />
			<div className="flex items-center gap-2">
				<div
					className="h-6 w-12 rounded border border-border"
					style={{ backgroundColor: color }}
				/>
				<span className="font-mono text-sm text-typography-secondary">{color}</span>
			</div>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Color picker with hex input and native color selector",
		code: `const [color, setColor] = useState("#21459b")

<ColorPicker value={color} onChange={setColor} label="Brand color" />`,
		render: () => <ColorPickerDemo />,
	},
]
