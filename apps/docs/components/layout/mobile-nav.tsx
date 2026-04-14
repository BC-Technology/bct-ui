"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { CATEGORY_META, type RegistryEntry } from "@/lib/categories"

interface MobileNavProps {
	version: string
	grouped: Record<string, Array<RegistryEntry & { name: string }>>
	sortedCategories: string[]
}

export function MobileNav({ version, grouped, sortedCategories }: MobileNavProps) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	// Close on route change
	useEffect(() => {
		setOpen(false)
	}, [pathname])

	// Lock body scroll when open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [open])

	return (
		<>
			<button
				onClick={() => setOpen(!open)}
				className="inline-flex h-9 w-9 items-center justify-center rounded-md text-typography-muted transition-colors hover:bg-surface-1 hover:text-typography-primary md:hidden"
				aria-label="Toggle menu"
			>
				{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
			</button>

			{open && (
				<div className="fixed inset-0 top-14 z-40 md:hidden">
					{/* Backdrop */}
					<div
						className="absolute inset-0 bg-overlay/50"
						onClick={() => setOpen(false)}
					/>
					{/* Drawer */}
					<div className="relative z-10 h-full w-72 overflow-y-auto border-r border-border bg-background p-6">
						<nav className="flex flex-col gap-1">
							<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-typography-muted">
								Documentation
							</p>
							{[
								{ href: "/getting-started", label: "Getting Started" },
								{ href: "/design-system", label: "Design System" },
								{ href: "/contributing", label: "Contributing" },
								{ href: "/changelog", label: "Changelog" },
							].map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									className="rounded-md px-3 py-2 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
								>
									{label}
								</Link>
							))}
						</nav>

						<div className="mt-6">
							<p className="mb-2 text-xs font-semibold uppercase tracking-widest text-typography-muted">
								Components
							</p>
							{sortedCategories.map((category) => (
								<div key={category} className="mb-4">
									<p className="mb-1 px-3 text-xs font-medium text-typography-muted">
										{CATEGORY_META[category]?.label ?? category}
									</p>
									{grouped[category].map((component) => (
										<Link
											key={component.name}
											href={`/components/${version}/${component.name}`}
											className="block rounded-md px-3 py-1.5 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
										>
											{component.title}
										</Link>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
