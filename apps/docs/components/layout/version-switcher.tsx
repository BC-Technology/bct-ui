import { getAllComponentNames } from "@/lib/registry"
import { VersionSwitcherClient } from "./version-switcher-client"

const VERSIONS = ["0.4.0", "0.3.0", "0.2.0"] as const

interface VersionSwitcherProps {
	currentVersion: string
}

export function VersionSwitcher({ currentVersion }: VersionSwitcherProps) {
	// Pre-fetch all component lists for all versions on the server
	const availableComponentsByVersion: Record<string, string[]> = {}
	for (const version of VERSIONS) {
		availableComponentsByVersion[version] = getAllComponentNames(version)
	}

	return (
		<VersionSwitcherClient
			currentVersion={currentVersion}
			availableComponentsByVersion={availableComponentsByVersion}
		/>
	)
}
