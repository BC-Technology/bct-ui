import fs from "node:fs"
import path from "node:path"
import type { Registry, RegistryEntry } from "@/lib/categories"
import { CATEGORY_META } from "@/lib/categories"

export type { Registry, RegistryEntry } from "@/lib/categories"
export { CATEGORY_META } from "@/lib/categories"

const REGISTRY_BASE = path.join(
	process.cwd(),
	"../../packages/ui/src/registry/versions",
)

const registryCache = new Map<string, Registry>()

export function getRegistry(version: string): Registry {
	if (registryCache.has(version)) {
		// biome-ignore lint/style/noNonNullAssertion: This is safe, since we check that it's not null
		return registryCache.get(version)!
	}

	const registryPath = path.join(REGISTRY_BASE, version, "registry.json")

	try {
		const raw = fs.readFileSync(registryPath, "utf-8")
		const registry = JSON.parse(raw) as Registry
		registryCache.set(version, registry)
		return registry
	} catch {
		return {}
	}
}

export function getComponent(
	version: string,
	name: string,
): (RegistryEntry & { name: string }) | null {
	const registry = getRegistry(version)
	const entry = registry[name]
	if (!entry) return null
	return { ...entry, name }
}

export function getAllComponents(
	version: string,
): Array<RegistryEntry & { name: string }> {
	const registry = getRegistry(version)
	return Object.entries(registry)
		.map(([name, entry]) => ({ ...entry, name }))
		.sort((a, b) => a.title.localeCompare(b.title))
}

export function getAllComponentNames(version: string): string[] {
	const registry = getRegistry(version)
	return Object.keys(registry).sort()
}

export function getComponentsByCategory(
	version: string,
): Record<string, Array<RegistryEntry & { name: string }>> {
	const components = getAllComponents(version)
	const grouped: Record<string, Array<RegistryEntry & { name: string }>> = {}

	for (const component of components) {
		const category = component.category ?? "other"
		if (!grouped[category]) {
			grouped[category] = []
		}
		grouped[category].push(component)
	}

	return grouped
}

export function getComponentSource(
	version: string,
	name: string,
): string | null {
	const sourcePath = path.join(
		REGISTRY_BASE,
		version,
		"components",
		`${name}.tsx`,
	)

	try {
		return fs.readFileSync(sourcePath, "utf-8")
	} catch {
		return null
	}
}

export function componentExistsInVersion(
	component: string,
	version: string,
): boolean {
	const registry = getRegistry(version)
	return component in registry
}

export function getAllVersionsForComponent(
	component: string,
	versions: string[],
): string[] {
	return versions.filter((v) => componentExistsInVersion(component, v))
}

export function getSortedCategories(
	grouped: Record<string, unknown>,
): string[] {
	return Object.keys(grouped).sort((a, b) => {
		const orderA = CATEGORY_META[a]?.order ?? 99
		const orderB = CATEGORY_META[b]?.order ?? 99
		return orderA - orderB
	})
}
