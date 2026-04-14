"use client"

import { useState } from "react"
import { DatePicker } from "../../../../packages/ui/src/registry/versions/0.3.0/components/date-picker"
import type { VariantPreview } from "../types"

function DatePickerDemo() {
	const [date, setDate] = useState("")
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<DatePicker
				label="Select date"
				value={date}
				onChange={setDate}
				placeholder="Pick a date"
			/>
			{date && (
				<p className="text-sm text-typography-muted">Selected: {date}</p>
			)}
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Date picker with calendar popup and keyboard navigation",
		code: `const [date, setDate] = useState("")

<DatePicker
  label="Select date"
  value={date}
  onChange={setDate}
  placeholder="Pick a date"
/>`,
		render: () => <DatePickerDemo />,
	},
]
