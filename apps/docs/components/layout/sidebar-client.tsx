"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
		<aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-border border-r md:sticky md:block md:w-64">
			<div className="py-6 pr-6 lg:py-8">
				<nav className="space-y-1">
					{navigation.map((item) => (
						<NavSection key={item.href} item={item} pathname={pathname} />
					))}
				</nav>
			</div>
		</aside>
	)
}

function NavSection({ item, pathname }: { item: NavItem; pathname: string }) {
	const isActive = pathname === item.href

	return (
		<div className="space-y-1">
			{item.href !== "#" ? (
				<Link
					href={item.href}
					className={cn(
						"block rounded-md px-3 py-2 font-medium text-sm transition-colors",
						isActive
							? "bg-accent text-accent-foreground"
							: "text-typography-secondary hover:bg-accent hover:text-accent-foreground",
					)}
				>
					{item.title}
				</Link>
			) : (
				<div className="px-3 py-2 font-semibold text-sm text-typography-primary">
					{item.title}
				</div>
			)}
			{item.items && (
				<div className="ml-3 space-y-1 border-border border-l pl-3">
					{item.items.map((subItem) => (
						<NavSection key={subItem.href} item={subItem} pathname={pathname} />
					))}
				</div>
			)}
		</div>
	)
}
