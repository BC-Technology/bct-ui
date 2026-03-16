import "server-only"

import { readFileSync } from "node:fs"
import { join } from "node:path"

export interface RegistryFile {
	src: string
	dst: string
}

export interface RegistryExample {
	name: string
	description: string
	code: string
}

export interface RegistryComponent {
	title: string
	description: string
	category?: string
	files: RegistryFile[]
	deps: string[]
	registryDeps?: string[]
	examples?: RegistryExample[]
}

export type Registry = Record<string, RegistryComponent>

const registryCache: Record<string, Registry> = {}

export function getRegistry(version: string): Registry {
	if (registryCache[version]) {
		return registryCache[version]
	}

	try {
		const registryPath = join(
			process.cwd(),
			"..",
			"..",
			"packages",
			"ui",
			"src",
			"registry",
			"versions",
			version,
			"registry.json",
		)
		const registryContent = readFileSync(registryPath, "utf-8")
		const registry = JSON.parse(registryContent) as Registry
		registryCache[version] = registry
		return registry
	} catch (error) {
		console.error(`Failed to load registry for version ${version}:`, error)
		return {}
	}
}

export function getComponent(
	version: string,
	componentName: string,
): RegistryComponent | null {
	const registry = getRegistry(version)
	return registry[componentName] || null
}

export function getAllComponentNames(version: string): string[] {
	const registry = getRegistry(version)
	return Object.keys(registry)
}

export function getComponentSource(
	version: string,
	componentName: string,
): string | null {
	const component = getComponent(version, componentName)
	if (!component || !component.files[0]) {
		return null
	}

	try {
		const sourcePath = join(
			process.cwd(),
			"..",
			"..",
			"packages",
			"ui",
			"src",
			"registry",
			"versions",
			version,
			component.files[0].src,
		)
		return readFileSync(sourcePath, "utf-8")
	} catch (error) {
		console.error(
			`Failed to load source for ${componentName} in version ${version}:`,
			error,
		)
		return null
	}
}
