"use client"

import { ChevronDown } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

const VERSIONS = ["0.4.0", "0.3.0", "0.2.0"] as const

interface VersionSwitcherClientProps {
	currentVersion: string
	availableComponentsByVersion: Record<string, string[]>
}

export function VersionSwitcherClient({
	currentVersion,
	availableComponentsByVersion,
}: VersionSwitcherClientProps) {
	const pathname = usePathname()
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	const handleVersionChange = (newVersion: string) => {
		// Extract component name from current path
		const componentMatch = pathname.match(/\/components\/[\d.]+\/([^/]+)/)

		if (componentMatch) {
			const componentName = componentMatch[1]
			// Check if component exists in the new version
			const componentsInNewVersion =
				availableComponentsByVersion[newVersion] || []

			if (componentsInNewVersion.includes(componentName)) {
				// Component exists, navigate to it
				router.push(`/components/${newVersion}/${componentName}`)
			} else {
				// Component doesn't exist, go to overview page
				router.push(`/components/${newVersion}`)
			}
		} else {
			// Not on a component page, just replace version in path
			const newPath = pathname.replace(/\/0\.\d+\.\d+/, `/${newVersion}`)
			router.push(newPath)
		}

		setIsOpen(false)
	}

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 font-medium text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<span>v{currentVersion}</span>
				<ChevronDown className="h-4 w-4" />
			</button>
			{isOpen && (
				<>
					<button
						type="button"
						className="fixed inset-0 z-40"
						onClick={() => setIsOpen(false)}
						aria-label="Close version menu"
					/>
					<div className="absolute top-full right-0 z-50 mt-2 min-w-32 overflow-hidden rounded-md border border-border bg-background p-1 shadow-md">
						{VERSIONS.map((version) => (
							<button
								type="button"
								key={version}
								onClick={() => handleVersionChange(version)}
								className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
									version === currentVersion
										? "bg-accent text-accent-foreground"
										: ""
								}`}
							>
								v{version}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	)
}
