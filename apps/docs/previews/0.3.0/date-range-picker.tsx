"use client"

import { useState } from "react"
import {
	type DateRange,
	DateRangePicker,
} from "../../../../packages/ui/src/registry/versions/0.3.0/components/date-range-picker"
import type { VariantPreview } from "../types"

function DateRangeDemo() {
	const [range, setRange] = useState<DateRange>({
		startDate: null,
		endDate: null,
	})
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<DateRangePicker
				label="Date range"
				value={range}
				onChange={setRange}
				placeholder="Select a range"
			/>
			{range.startDate && range.endDate && (
				<p className="text-sm text-typography-muted">
					{range.startDate} — {range.endDate}
				</p>
			)}
		</div>
	)
}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "Date range picker for selecting start and end dates",
		code: `const [range, setRange] = useState({ startDate: null, endDate: null })

<DateRangePicker
  label="Date range"
  value={range}
  onChange={setRange}
  placeholder="Select a range"
/>`,
		render: () => <DateRangeDemo />,
	},
]
