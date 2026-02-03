import { cachePath, readCacheText, writeCacheText } from "../lib/cache"
import { FetchError, fetchText } from "../lib/fetcher"

export type RegistryEntry = {
	files: Array<{ src: string; dst: string }>
	deps: string[]
	title: string
	description?: string
}

export type Registry = Record<string, RegistryEntry>

export async function loadRegistry(version: string): Promise<Registry> {
	const cacheFile = cachePath(version, "registry.json")
	const cached = await readCacheText(cacheFile)
	if (cached) return JSON.parse(cached) as Registry

	const ref = `v${version}`
	const url = `https://raw.githubusercontent.com/BC-Technology/bct-ui/${ref}/packages/ui/src/registry/versions/${version}/registry.json`
	try {
		const text = await fetchText(url)
		await writeCacheText(cacheFile, text)
		return JSON.parse(text) as Registry
	} catch (e) {
		if (e instanceof FetchError && e.status === 404) {
			throw new Error(
				`Could not fetch registry for version ${version}.\n\n` +
					`Expected a GitHub tag/release named "${ref}" and a registry file at:\n` +
					`  ${url}\n\n` +
					`Please ensure the release/tag exists for this package version.`,
			)
		}
		throw e
	}
}

// For backward compatibility during development, also export the current version
export const registry: Registry = {} // This will be empty in production, use loadRegistry instead
