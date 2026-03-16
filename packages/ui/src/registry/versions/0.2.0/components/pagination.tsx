import clsx from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface PaginationProps extends React.ComponentPropsWithoutRef<"nav"> {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	siblingCount?: number
	showFirstLast?: boolean
	className?: string
	classNames?: {
		root?: string
		list?: string
		item?: string
		button?: string
		ellipsis?: string
	}
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	siblingCount = 1,
	showFirstLast = true,
	className,
	classNames,
	...props
}: PaginationProps) {
	const generatePageNumbers = () => {
		const pages: (number | string)[] = []
		const leftSibling = Math.max(currentPage - siblingCount, 1)
		const rightSibling = Math.min(currentPage + siblingCount, totalPages)

		if (showFirstLast && leftSibling > 2) {
			pages.push(1)
			if (leftSibling > 3) pages.push("...")
		} else {
			for (let i = 1; i < leftSibling; i++) {
				pages.push(i)
			}
		}

		for (let i = leftSibling; i <= rightSibling; i++) {
			pages.push(i)
		}

		if (showFirstLast && rightSibling < totalPages - 1) {
			if (rightSibling < totalPages - 2) pages.push("...")
			pages.push(totalPages)
		} else {
			for (let i = rightSibling + 1; i <= totalPages; i++) {
				pages.push(i)
			}
		}

		return pages
	}

	const buttonStyles = clsx(
		"inline-flex size-10 items-center justify-center rounded-radius-md",
		"font-medium text-text-sm transition-colors",
		"outline-none ring-offset-2 ring-offset-background",
		"focus-visible:ring-2 focus-visible:ring-primary-focus",
		"disabled:cursor-not-allowed disabled:opacity-50",
	)

	return (
		<nav
			aria-label="Pagination"
			className={twMerge(classNames?.root, className)}
			{...props}
		>
			<ul className={twMerge("flex items-center gap-1", classNames?.list)}>
				<li className={twMerge(classNames?.item)}>
					<button
						type="button"
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage === 1}
						className={twMerge(
							buttonStyles,
							"text-typography-secondary hover:bg-surface-2 hover:text-typography-primary",
							classNames?.button,
						)}
						aria-label="Previous page"
					>
						<ChevronLeft className="size-4" />
					</button>
				</li>

				{generatePageNumbers().map((page) => (
					<li key={`${page}`} className={twMerge(classNames?.item)}>
						{typeof page === "number" ? (
							<button
								type="button"
								onClick={() => onPageChange(page)}
								className={twMerge(
									buttonStyles,
									clsx({
										"bg-primary text-primary-on": page === currentPage,
										"text-typography-secondary hover:bg-surface-2 hover:text-typography-primary":
											page !== currentPage,
									}),
									classNames?.button,
								)}
								aria-label={`Page ${page}`}
								aria-current={page === currentPage ? "page" : undefined}
							>
								{page}
							</button>
						) : (
							<span
								className={twMerge(
									"inline-flex size-10 items-center justify-center text-text-sm text-typography-muted",
									classNames?.ellipsis,
								)}
							>
								{page}
							</span>
						)}
					</li>
				))}

				<li className={twMerge(classNames?.item)}>
					<button
						type="button"
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className={twMerge(
							buttonStyles,
							"text-typography-secondary hover:bg-surface-2 hover:text-typography-primary",
							classNames?.button,
						)}
						aria-label="Next page"
					>
						<ChevronRight className="size-4" />
					</button>
				</li>
			</ul>
		</nav>
	)
}
