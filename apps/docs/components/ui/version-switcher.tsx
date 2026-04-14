"use client"

import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { VALID_VERSIONS, type Version } from "@/lib/versions"

interface VersionSwitcherProps {
	currentVersion: string
	currentComponent?: string
	/** Versions that have the current component — computed server-side */
	componentVersions?: string[]
}

export function VersionSwitcher({
	currentVersion,
	currentComponent,
	componentVersions,
}: VersionSwitcherProps) {
	const router = useRouter()

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const newVersion = e.target.value as Version

		if (currentComponent) {
			const hasComponent = componentVersions?.includes(newVersion) ?? false
			if (hasComponent) {
				router.push(`/components/${newVersion}/${currentComponent}`)
			} else {
				router.push(`/components/${newVersion}`)
			}
		} else {
			router.push(`/components/${newVersion}`)
		}
	}

	return (
		<div className="relative">
			<select
				value={currentVersion}
				onChange={handleChange}
				className="h-8 appearance-none rounded-md border border-border bg-surface-1 py-0 pl-3 pr-8 text-sm text-typography-primary transition-colors hover:border-border-hover hover:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-primary-focus"
				aria-label="Select version"
			>
				{VALID_VERSIONS.map((v) => (
					<option key={v} value={v}>
						{v === "0.4.0" ? `v${v} (Latest)` : `v${v}`}
					</option>
				))}
			</select>
			<ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3.5 w-3.5 -translate-y-1/2 text-typography-muted" />
		</div>
	)
}
