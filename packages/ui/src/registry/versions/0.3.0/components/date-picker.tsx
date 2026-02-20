import { Popover } from "@base-ui/react/popover"
import { useDatePicker } from "@rehookify/datepicker"
import clsx from "clsx"
import { format } from "date-fns"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface DatePickerProps {
	value: string
	onChange: (value: string) => void
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
		header?: string
		calendar?: string
		day?: string
		error?: string
		helperText?: string
	}
}

export function DatePicker({
	value,
	onChange,
	label,
	placeholder = "Select a date",
	error,
	helperText,
	disabled = false,
	minDate,
	maxDate,
	className,
	classNames,
}: DatePickerProps) {
	const [selectedDates, setSelectedDates] = useState<Date[]>([])
	const [offsetDate, setOffsetDate] = useState<Date>(new Date())

	const handleChange = (dates: Date[]) => {
		setSelectedDates(dates)
		onChange(dates.length > 0 ? format(dates[0], "PPP") : "")
	}

	const {
		data: { weekDays, calendars },
		propGetters,
	} = useDatePicker({
		selectedDates,
		onDatesChange: handleChange,
		offsetDate,
		onOffsetChange: setOffsetDate,
		dates: { mode: "single", minDate, maxDate },
	})

	useEffect(() => {
		if (!value) {
			setSelectedDates([])
			return
		}
		const parsed = new Date(value)
		if (!Number.isNaN(parsed.getTime())) {
			setSelectedDates([parsed])
		}
	}, [value])

	const calendar = calendars[0]

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
						className={clsx({
							"font-light text-typography-muted": selectedDates.length === 0,
						})}
					>
						{selectedDates.length > 0
							? format(selectedDates[0], "PPP")
							: placeholder}
					</span>
					<Calendar className="size-4 shrink-0 text-typography-muted" />
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Positioner sideOffset={6}>
						<Popover.Popup
							className={twMerge(
								"z-50 w-72 rounded-radius-md border border-border bg-surface-1 p-4 shadow-shadow-lg",
								classNames?.popup,
							)}
						>
							<div
								className={twMerge(
									"mb-4 flex items-center justify-between",
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
								{calendar.days.map((day) => (
									<button
										key={day.$date.toString()}
										type="button"
										{...propGetters.dayButton(day)}
										className={twMerge(
											clsx(
												"rounded-radius-sm p-2 text-center text-text-sm transition-colors",
												{
													"text-typography-primary hover:bg-surface-2":
														!day.disabled && !day.selected,
													"bg-primary font-semibold text-primary-on":
														day.selected,
													"cursor-not-allowed text-typography-muted opacity-50":
														day.disabled,
													"font-semibold": day.now && !day.selected,
													"ring-1 ring-primary": day.now && !day.selected,
												},
											),
											classNames?.day,
										)}
									>
										{day.day}
									</button>
								))}
							</div>
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
