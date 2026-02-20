import { Popover } from "@base-ui/react/popover"
import { useDatePicker } from "@rehookify/datepicker"
import clsx from "clsx"
import { format } from "date-fns"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface DateRange {
	startDate: string | null
	endDate: string | null
}

export interface DateRangePickerProps {
	value: DateRange
	onChange: (value: DateRange) => void
	label?: string
	placeholder?: string
	error?: string
	helperText?: string
	disabled?: boolean
	minDate?: Date
	maxDate?: Date
	className?: string
	classNames?: {
		root?: string
		label?: string
		trigger?: string
		popup?: string
		rangeDisplay?: string
		header?: string
		calendar?: string
		day?: string
		actions?: string
		error?: string
		helperText?: string
	}
}

export function DateRangePicker({
	value,
	onChange,
	label,
	placeholder = "Select date range",
	error,
	helperText,
	disabled = false,
	minDate,
	maxDate,
	className,
	classNames,
}: DateRangePickerProps) {
	const [selectedDates, setSelectedDates] = useState<Date[]>([])
	const [offsetDate, setOffsetDate] = useState<Date>(new Date())

	const {
		data: { weekDays, calendars },
		propGetters,
	} = useDatePicker({
		selectedDates,
		onDatesChange: setSelectedDates,
		offsetDate,
		onOffsetChange: setOffsetDate,
		dates: { mode: "range", minDate, maxDate },
	})

	useEffect(() => {
		const dates: Date[] = []
		if (value.startDate) {
			const start = new Date(value.startDate)
			if (!Number.isNaN(start.getTime())) dates.push(start)
		}
		if (value.endDate) {
			const end = new Date(value.endDate)
			if (!Number.isNaN(end.getTime())) dates.push(end)
		}
		setSelectedDates(dates)
	}, [value.startDate, value.endDate])

	useEffect(() => {
		if (selectedDates.length === 2) {
			onChange({
				startDate: format(selectedDates[0], "yyyy-MM-dd"),
				endDate: format(selectedDates[1], "yyyy-MM-dd"),
			})
		} else if (selectedDates.length === 0) {
			onChange({ startDate: null, endDate: null })
		}
	}, [selectedDates, onChange])

	const calendar = calendars[0]

	const handleClear = () => {
		setSelectedDates([])
		onChange({ startDate: null, endDate: null })
	}

	const triggerStyles = clsx(
		"flex h-10 w-full items-center justify-between gap-2 rounded-radius-md border bg-surface-1 px-3 py-2",
		"text-text-base text-typography-primary",
		"outline-none transition-all duration-200",
		"focus:border-primary focus:ring-2 focus:ring-primary-focus focus:ring-inset",
		"disabled:cursor-not-allowed disabled:bg-surface-1-disabled disabled:text-typography-muted",
		{
			"border-border hover:border-border-hover": !error,
			"border-error focus:border-error focus:ring-error": !!error,
		},
	)

	const displayText =
		selectedDates.length === 2
			? `${format(selectedDates[0], "PPP")} – ${format(selectedDates[1], "PPP")}`
			: selectedDates.length === 1
				? `${format(selectedDates[0], "PPP")} – ...`
				: placeholder

	return (
		<div
			className={twMerge("flex flex-col gap-1", classNames?.root, className)}
		>
			{label && (
				<span
					className={twMerge(
						"font-medium text-text-sm text-typography-primary",
						classNames?.label,
					)}
				>
					{label}
				</span>
			)}
			<Popover.Root>
				<Popover.Trigger
					className={twMerge(triggerStyles, classNames?.trigger)}
					disabled={disabled}
				>
					<span
						className={clsx("truncate", {
							"font-light text-typography-muted": selectedDates.length === 0,
						})}
					>
						{displayText}
					</span>
					<Calendar className="size-4 shrink-0 text-typography-muted" />
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner sideOffset={6}>
						<Popover.Popup
							className={twMerge(
								"z-50 w-80 rounded-radius-md border border-border bg-surface-1 p-4 shadow-shadow-lg",
								classNames?.popup,
							)}
						>
							<div
								className={twMerge(
									"mb-3 flex items-center gap-2 rounded-radius-md bg-surface-2 p-2",
									classNames?.rangeDisplay,
								)}
							>
								<div className="flex-1 text-center">
									<p className="text-text-xs text-typography-muted">From</p>
									<p
										className={clsx("font-medium text-text-sm", {
											"text-typography-muted": selectedDates.length === 0,
											"text-typography-primary": selectedDates.length > 0,
										})}
									>
										{selectedDates.length > 0
											? format(selectedDates[0], "PPP")
											: "Select"}
									</p>
								</div>
								<div className="h-8 w-px bg-divider" />
								<div className="flex-1 text-center">
									<p className="text-text-xs text-typography-muted">To</p>
									<p
										className={clsx("font-medium text-text-sm", {
											"text-typography-muted": selectedDates.length < 2,
											"text-typography-primary": selectedDates.length === 2,
										})}
									>
										{selectedDates.length === 2
											? format(selectedDates[1], "PPP")
											: "Select"}
									</p>
								</div>
							</div>

							<div
								className={twMerge(
									"mb-3 flex items-center justify-between",
									classNames?.header,
								)}
							>
								<button
									type="button"
									{...propGetters.subtractOffset({ months: 1 })}
									className="rounded-radius-sm p-1.5 text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
								>
									<ChevronLeft className="size-4" />
								</button>
								<span className="font-semibold text-text-base text-typography-primary">
									{calendar.month} {calendar.year}
								</span>
								<button
									type="button"
									{...propGetters.addOffset({ months: 1 })}
									className="rounded-radius-sm p-1.5 text-typography-muted transition-colors hover:bg-surface-2 hover:text-typography-primary"
								>
									<ChevronRight className="size-4" />
								</button>
							</div>

							<div className="mb-2 grid grid-cols-7 gap-1">
								{weekDays.map((day) => (
									<div
										key={day}
										className="p-1 text-center font-medium text-text-xs text-typography-muted"
									>
										{day}
									</div>
								))}
							</div>

							<div
								className={twMerge(
									"grid grid-cols-7 gap-1",
									classNames?.calendar,
								)}
							>
								{calendar.days.map((day) => {
									const isInRange =
										selectedDates.length === 2 &&
										day.$date >= selectedDates[0] &&
										day.$date <= selectedDates[1]

									return (
										<button
											key={day.$date.toString()}
											type="button"
											{...propGetters.dayButton(day)}
											className={twMerge(
												clsx(
													"rounded-radius-sm p-2 text-center text-text-sm transition-colors",
													{
														"text-typography-primary hover:bg-surface-2":
															!day.disabled && !day.selected && !isInRange,
														"bg-primary font-semibold text-primary-on":
															day.selected,
														"bg-primary-muted text-typography-primary":
															isInRange && !day.selected,
														"cursor-not-allowed text-typography-muted opacity-50":
															day.disabled,
														"font-semibold ring-1 ring-primary":
															day.now && !day.selected,
													},
												),
												classNames?.day,
											)}
											disabled={day.disabled}
										>
											{day.day}
										</button>
									)
								})}
							</div>

							{selectedDates.length > 0 && (
								<div
									className={twMerge(
										"mt-3 flex justify-end",
										classNames?.actions,
									)}
								>
									<button
										type="button"
										onClick={handleClear}
										className="rounded-radius-sm px-3 py-1.5 text-text-sm text-typography-secondary transition-colors hover:bg-surface-2 hover:text-typography-primary"
									>
										Clear
									</button>
								</div>
							)}
						</Popover.Popup>
					</Popover.Positioner>
				</Popover.Portal>
			</Popover.Root>
			{error && (
				<span className={twMerge("text-error text-text-sm", classNames?.error)}>
					{error}
				</span>
			)}
			{helperText && !error && (
				<span
					className={twMerge(
						"text-text-sm text-typography-muted",
						classNames?.helperText,
					)}
				>
					{helperText}
				</span>
			)}
		</div>
	)
}
