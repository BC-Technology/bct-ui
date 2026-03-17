"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface NavItem {
	title: string
	href: string
	items?: NavItem[]
}

interface SidebarClientProps {
	navigation: NavItem[]
}

export function SidebarClient({ navigation }: SidebarClientProps) {
	const pathname = usePathname()

	return (
		<aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto bg-background md:sticky md:block md:w-64">
			<div className="py-6 pr-6 lg:py-8">
				<nav className="space-y-6">
					{navigation.map((item) => (
						<NavSection
							key={item.href}
							item={item}
							pathname={pathname}
							level={0}
						/>
					))}
				</nav>
			</div>
		</aside>
	)
}

function NavSection({
	item,
	pathname,
	level,
}: {
	item: NavItem
	pathname: string
	level: number
}) {
	const [isOpen, setIsOpen] = useState(true)
	const isActive = pathname === item.href
	const hasChildren = item.items && item.items.length > 0

	// Check if any child is active
	const hasActiveChild = hasChildren
		? item.items?.some(
				(child) =>
					pathname === child.href ||
					child.items?.some((subChild) => pathname === subChild.href),
			)
		: false

	return (
		<div className="space-y-1">
			{item.href !== "#" && !hasChildren ? (
				<Link
					href={item.href}
					onClick={() => setIsOpen(false)}
					className={cn(
						"group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
						level === 0 && "font-semibold",
						level === 1 && "font-medium",
						level === 2 && "font-normal",
						isActive
							? "bg-primary/10 text-primary"
							: "text-typography-secondary hover:bg-surface-1 hover:text-typography-primary",
					)}
				>
					<span className="flex-1">{item.title}</span>
				</Link>
			) : hasChildren ? (
				<button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					className={cn(
						"flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
						level === 0 && "font-semibold",
						level === 1 && "font-medium",
						level === 2 && "font-normal",
						hasActiveChild || isActive
							? "text-typography-primary"
							: "text-typography-secondary hover:text-typography-primary",
					)}
				>
					<span className="flex-1">{item.title}</span>
					<ChevronRight
						className={cn(
							"h-4 w-4 transition-transform",
							isOpen && "rotate-90",
						)}
					/>
				</button>
			) : (
				<Link
					href={item.href}
					onClick={() => setIsOpen(false)}
					className={cn(
						"group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all",
						level === 0 && "font-semibold",
						level === 1 && "font-medium",
						level === 2 && "font-normal",
						isActive
							? "bg-primary/10 text-primary"
							: "text-typography-secondary hover:bg-surface-1 hover:text-typography-primary",
					)}
				>
					<span className="flex-1">{item.title}</span>
				</Link>
			)}

			{hasChildren && isOpen && (
				<div
					className={cn(
						"space-y-1",
						level === 0 && "mt-1 ml-0",
						level === 1 && "ml-3 pl-3",
						level === 2 && "ml-3 pl-3",
					)}
				>
					{item.items?.map((subItem) => (
						<NavSection
							key={subItem.href}
							item={subItem}
							pathname={pathname}
							level={level + 1}
						/>
					))}
				</div>
			)}
		</div>
	)
}
