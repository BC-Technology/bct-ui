import { Github, Layers } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { VersionSwitcher } from "@/components/ui/version-switcher"
import {
	getAllVersionsForComponent,
	getComponentsByCategory,
	getSortedCategories,
} from "@/lib/registry"
import { DEFAULT_VERSION, VALID_VERSIONS, type Version } from "@/lib/versions"

interface HeaderProps {
	version?: string
	currentComponent?: string
}

export function Header({
	version = DEFAULT_VERSION,
	currentComponent,
}: HeaderProps) {
	const grouped = getComponentsByCategory(version)
	const sortedCategories = getSortedCategories(grouped)
	const componentVersions = currentComponent
		? getAllVersionsForComponent(currentComponent, [...VALID_VERSIONS])
		: undefined

	return (
		<header className="sticky top-0 z-50 border-border border-b bg-background/80 backdrop-blur-md">
			<div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-2 font-bold text-typography-primary transition-opacity hover:opacity-80"
				>
					<div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
						<Layers className="h-4 w-4 text-primary-on" />
					</div>
					<span className="font-serif text-lg tracking-tight">BCT UI</span>
				</Link>

				{/* Desktop nav links */}
				<nav className="ml-6 hidden items-center gap-1 md:flex">
					<Link
						href="/getting-started"
						className="rounded-md px-3 py-1.5 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
					>
						Docs
					</Link>
					<Link
						href="/design-system"
						className="rounded-md px-3 py-1.5 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
					>
						Design System
					</Link>
					<Link
						href={`/components/${version}`}
						className="rounded-md px-3 py-1.5 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
					>
						Components
					</Link>
					<Link
						href="/changelog"
						className="rounded-md px-3 py-1.5 text-sm text-typography-secondary transition-colors hover:bg-surface-1 hover:text-typography-primary"
					>
						Changelog
					</Link>
				</nav>

				{/* Spacer */}
				<div className="flex-1" />

				{/* Right side controls */}
				<div className="flex items-center gap-2">
					<VersionSwitcher
						currentVersion={version as Version}
						currentComponent={currentComponent}
						componentVersions={componentVersions}
					/>
					<ThemeToggle />
					<a
						href="https://github.com/BC-Technology/bct-ui"
						target="_blank"
						rel="noopener noreferrer"
						className="hidden h-9 w-9 items-center justify-center rounded-md text-typography-muted transition-colors hover:bg-surface-1 hover:text-typography-primary sm:inline-flex"
						aria-label="GitHub"
					>
						<Github className="h-4 w-4" />
					</a>
					<MobileNav
						version={version}
						grouped={grouped}
						sortedCategories={sortedCategories}
					/>
				</div>
			</div>
		</header>
	)
}
