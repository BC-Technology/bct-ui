"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<button type="button"
				className="inline-flex h-9 w-9 items-center justify-center rounded-md text-typography-muted transition-colors hover:bg-surface-1 hover:text-typography-primary"
				aria-label="Toggle theme"
			>
				<Sun className="h-4 w-4" />
			</button>
		)
	}

	const isDark = resolvedTheme === "dark"

	return (
		<button type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="inline-flex h-9 w-9 items-center justify-center rounded-md text-typography-muted transition-colors hover:bg-surface-1 hover:text-typography-primary"
			aria-label="Toggle theme"
		>
			{isDark ? (
				<Sun className="h-4 w-4" />
			) : (
				<Moon className="h-4 w-4" />
			)}
		</button>
	)
}
