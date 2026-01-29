export type RegistryEntry = {
	files: Array<{ src: string; dst: string }>
	deps: string[]
	title: string
	description?: string
}

export type Registry = Record<string, RegistryEntry>

// Dynamic import to load the versioned registry
export async function loadRegistry(version: string): Promise<Registry> {
	try {
		const module = await import(`./versions/${version}/registry.js`)
		return module.registry as Registry
	} catch (error) {
		throw new Error(`Registry version "${version}" not found: ${error}`)
	}
}

// For backward compatibility during development, also export the current version
export const registry: Registry = {} // This will be empty in production, use loadRegistry instead
