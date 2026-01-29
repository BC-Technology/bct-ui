import { cachePath, readCacheText, writeCacheText } from "../lib/cache"
import { fetchText } from "../lib/fetcher"

export type RegistryEntry = {
	files: Array<{ src: string; dst: string }>
	deps: string[]
	title: string
	description?: string
}

export type Registry = Record<string, RegistryEntry>

export async function loadRegistry(version: string): Promise<Registry> {
	const ref = `v${version}`
	const url = `https://raw.githubusercontent.com/BC-Technology/bct-ui/${ref}/packages/ui/src/registry/versions/${version}/registry.json`

	const cacheFile = cachePath(version, "registry.json")
	const cached = await readCacheText(cacheFile)
	if (cached) return JSON.parse(cached) as Registry

	const text = await fetchText(url)
	await writeCacheText(cacheFile, text)
	return JSON.parse(text) as Registry
}

// For backward compatibility during development, also export the current version
export const registry: Registry = {} // This will be empty in production, use loadRegistry instead
