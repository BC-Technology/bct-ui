"use client"

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CATEGORY_META, type RegistryEntry } from "@/lib/categories"
import { getNewInVersion } from "@/lib/versions"

interface SidebarProps {
	version: string
	grouped: Record<string, Array<RegistryEntry & { name: string }>>
	sortedCategories: string[]
}

const DOC_LINKS = [
	{ href: "/getting-started", label: "Getting Started" },
	{ href: "/design-system", label: "Design System" },
	{ href: "/contributing", label: "Contributing" },
	{ href: "/changelog", label: "Changelog" },
]

export function Sidebar({ version, grouped, sortedCategories }: SidebarProps) {
	const pathname = usePathname()

	return (
		<aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-border border-r py-6 pr-4 md:block lg:w-64">
			{/* Documentation section */}
			<div className="mb-6">
				<p className="mb-2 px-3 font-semibold text-typography-muted text-xs uppercase tracking-widest">
					Documentation
				</p>
				<nav className="flex flex-col gap-0.5">
					{DOC_LINKS.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className={clsx(
								"rounded-md px-3 py-1.5 text-sm transition-colors",
								pathname === href
									? "bg-primary/10 font-medium text-primary"
									: "text-typography-secondary hover:bg-surface-1 hover:text-typography-primary",
							)}
						>
							{label}
						</Link>
					))}
				</nav>
			</div>

			{/* Divider */}
			<div className="mx-3 mb-6 h-px bg-border" />

			{/* Components section */}
			<div>
				<div className="mb-2 flex items-center justify-between px-3">
					<p className="font-semibold text-typography-muted text-xs uppercase tracking-widest">
						Components
					</p>
					<Link
						href={`/components/${version}`}
						className="text-typography-muted text-xs transition-colors hover:text-typography-primary"
					>
						All
					</Link>
				</div>
				<nav className="flex flex-col gap-4">
					{sortedCategories.map((category) => (
						<div key={category}>
							<p className="mb-1 px-3 font-medium text-typography-muted text-xs">
								{CATEGORY_META[category]?.label ?? category}
							</p>
							<div className="flex flex-col gap-0.5">
								{grouped[category].map((component) => {
									const href = `/components/${version}/${component.name}`
									const isActive = pathname === href
									const newIn = getNewInVersion(component.name)

									return (
										<Link
											key={component.name}
											href={href}
											className={clsx(
												"flex items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
												isActive
													? "bg-primary/10 font-medium text-primary"
													: "text-typography-secondary hover:bg-surface-1 hover:text-typography-primary",
											)}
										>
											<span>{component.title}</span>
											{newIn && (
												<span className="rounded-full bg-success-muted px-1.5 py-0.5 font-medium text-2xs text-typography-primary">
													New
												</span>
											)}
										</Link>
									)
								})}
							</div>
						</div>
					))}
				</nav>
			</div>
		</aside>
	)
}
