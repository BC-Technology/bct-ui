"use client"

import { useState } from "react"
import { Slider } from "../../../../packages/ui/src/registry/versions/0.3.0/components/slider"
import type { VariantPreview } from "../types"

function SliderDemo() {
	const [value, setValue] = useState([40])
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Slider
				value={value}
				onValueChange={(v) => setValue(Array.isArray(v) ? [...v] : [v])}
				min={0}
				max={100}
				label="Volume"
				showValue
			/>
			<p className="text-sm text-typography-muted">Value: {value[0]}</p>
		</div>
	)
}

function RangeSliderDemo() {
	const [range, setRange] = useState([20, 80])
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Slider
				value={range}
				onValueChange={(v) => setRange(Array.isArray(v) ? [...v] : [v])}
				min={0}
				max={100}
				label="Price range"
				showValue
			/>
			<p className="text-sm text-typography-muted">
				€{range[0]} — €{range[1]}
			</p>
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Single",
		description: "Single-handle range slider",
		code: `const [value, setValue] = useState([40])

<Slider
  value={value}
  onValueChange={(v) => setValue(Array.isArray(v) ? [...v] : [v])}
  min={0}
  max={100}
  label="Volume"
/>`,
		render: () => <SliderDemo />,
	},
	{
		name: "Range",
		description: "Dual-handle range slider",
		code: `const [range, setRange] = useState([20, 80])

<Slider
  value={range}
  onValueChange={(v) => setRange(Array.isArray(v) ? [...v] : [v])}
  min={0}
  max={100}
  label="Price range"
/>`,
		render: () => <RangeSliderDemo />,
	},
]
