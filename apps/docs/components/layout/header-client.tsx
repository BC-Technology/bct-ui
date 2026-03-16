"use client"

import { Github, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"

interface HeaderClientProps {
	versionSwitcher: ReactNode
}

export function HeaderClient({ versionSwitcher }: HeaderClientProps) {
	const { theme, setTheme } = useTheme()

	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 flex">
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<span className="font-bold text-lg">BCT UI</span>
					</Link>
					<nav className="flex items-center gap-6 text-sm">
						<Link
							href="/components/0.4.0"
							className="text-typography-secondary transition-colors hover:text-typography-primary"
						>
							Components
						</Link>
						<Link
							href="/getting-started"
							className="text-typography-secondary transition-colors hover:text-typography-primary"
						>
							Getting Started
						</Link>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-2">
					{versionSwitcher}
					<button
						type="button"
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="inline-flex h-9 w-9 items-center justify-center rounded-md font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
						aria-label="Toggle theme"
					>
						<Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</button>
					<Link
						href="https://github.com/BC-Technology/bct-ui"
						target="_blank"
						rel="noreferrer"
						className="inline-flex h-9 w-9 items-center justify-center rounded-md font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
					>
						<Github className="h-4 w-4" />
						<span className="sr-only">GitHub</span>
					</Link>
				</div>
			</div>
		</header>
	)
}
