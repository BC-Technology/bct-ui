"use client"

import { Github, Moon, Package, Sun } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeaderClientProps {
	versionSwitcher: ReactNode
}

export function HeaderClient({ versionSwitcher }: HeaderClientProps) {
	const { theme, setTheme } = useTheme()
	const pathname = usePathname()

	const navLinks = [
		{ href: "/getting-started", label: "Docs" },
		{ href: "/components/0.4.0", label: "Components" },
	]

	return (
		<header className="sticky top-0 z-50 w-full bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex h-16 w-full items-center justify-between px-6">
				<div className="mr-8 flex">
					<Link
						href="/"
						className="flex items-center gap-2 transition-opacity hover:opacity-80"
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-on">
							<Package className="h-5 w-5" />
						</div>
						<span className="font-bold text-lg text-typography-primary">
							BCT UI
						</span>
					</Link>
				</div>

				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => {
						const isActive = pathname.startsWith(link.href)
						return (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"rounded-lg px-3 py-2 font-medium text-sm transition-all",
									isActive
										? "bg-primary/10 text-primary"
										: "text-typography-secondary hover:bg-surface-1 hover:text-typography-primary",
								)}
							>
								{link.label}
							</Link>
						)
					})}
				</nav>

				<div className="ml-auto flex items-center gap-2">
					{versionSwitcher}
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-medium text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						aria-label="Toggle theme"
					>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</button>

					<Link
						href="https://github.com/BC-Technology/bct-ui"
						target="_blank"
						rel="noreferrer"
						className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-medium text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
						aria-label="GitHub repository"
					>
						<Github className="h-[1.1rem] w-[1.1rem]" />
					</Link>
				</div>
			</div>
		</header>
	)
}
