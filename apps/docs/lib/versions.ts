export const VALID_VERSIONS = ["0.4.0", "0.3.0", "0.2.0"] as const
export type Version = (typeof VALID_VERSIONS)[number]
export const DEFAULT_VERSION: Version = "0.4.0"

export function isValidVersion(v: string): v is Version {
	return (VALID_VERSIONS as readonly string[]).includes(v)
}

export function getVersionLabel(version: Version): string {
	const labels: Record<Version, string> = {
		"0.4.0": "v0.4.0 (Latest)",
		"0.3.0": "v0.3.0",
		"0.2.0": "v0.2.0",
	}
	return labels[version]
}

export function getVersionBadge(version: Version): string | null {
	if (version === DEFAULT_VERSION) return "Latest"
	return null
}

// Returns true if a component was introduced in a version that is newer than another
export function isNewerThan(version: Version, than: Version): boolean {
	const order: Record<Version, number> = { "0.2.0": 0, "0.3.0": 1, "0.4.0": 2 }
	return order[version] > order[than]
}

// Components added in v0.3.0 (not in v0.2.0)
export const NEW_IN_030 = [
	"file-icon",
	"image-preview-dialog",
	"file-details-dialog",
	"file-upload-input",
	"sidebar",
	"header",
]

// Returns a "New in vX.Y.Z" label if the component was added after v0.2.0
export function getNewInVersion(component: string): string | null {
	if (NEW_IN_030.includes(component)) return "0.3.0"
	return null
}
