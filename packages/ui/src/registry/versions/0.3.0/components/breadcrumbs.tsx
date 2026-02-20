import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface BreadcrumbItem {
	label: React.ReactNode
	href?: string
	onClick?: () => void
}

export interface BreadcrumbsProps
	extends React.ComponentPropsWithoutRef<"nav"> {
	items: BreadcrumbItem[]
	separator?: React.ReactNode
	className?: string
	classNames?: {
		root?: string
		list?: string
		item?: string
		link?: string
		separator?: string
	}
}

export function Breadcrumbs({
	items,
	separator = "/",
	className,
	classNames,
	...props
}: BreadcrumbsProps) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={twMerge(classNames?.root, className)}
			{...props}
		>
			<ol className={twMerge("flex items-center gap-1.5", classNames?.list)}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li
							key={`${item.href}-${index}`}
							className={twMerge("flex items-center gap-1.5", classNames?.item)}
						>
							{item.href || item.onClick ? (
								<a
									href={item.href}
									onClick={item.onClick}
									className={twMerge(
										clsx("text-text-sm transition-colors", {
											"text-typography-muted hover:text-typography-primary":
												!isLast,
											"font-medium text-typography-primary": isLast,
										}),
										classNames?.link,
									)}
									aria-current={isLast ? "page" : undefined}
								>
									{item.label}
								</a>
							) : (
								<span
									className={twMerge(
										clsx("text-text-sm", {
											"text-typography-muted": !isLast,
											"font-medium text-typography-primary": isLast,
										}),
										classNames?.link,
									)}
									aria-current={isLast ? "page" : undefined}
								>
									{item.label}
								</span>
							)}
							{!isLast && (
								<span
									className={twMerge(
										"text-text-sm text-typography-muted",
										classNames?.separator,
									)}
									aria-hidden="true"
								>
									{separator}
								</span>
							)}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
