import type { ComponentType } from "react"

export interface ComponentModule {
	[key: string]: ComponentType<any>
}

/**
 * Dynamically imports a component from the registry
 * This runs on the server side during build/render
 */
export async function loadComponentModule(
	version: string,
	componentName: string,
): Promise<ComponentModule | null> {
	try {
		const module = await import(
			`../../../packages/ui/src/registry/versions/${version}/components/${componentName}.tsx`
		)
		return module
	} catch (error) {
		console.error(
			`Failed to load component ${componentName} for version ${version}:`,
			error,
		)
		return null
	}
}

/**
 * Gets the main export from a component module
 * Handles both default and named exports
 */
export function getComponentFromModule(
	module: ComponentModule,
	componentName: string,
): ComponentType<any> | null {
	// Try to find the component - check for PascalCase version first
	const pascalName = componentName
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("")

	if (module[pascalName]) {
		return module[pascalName]
	}

	// Check for default export
	if (module.default) {
		return module.default
	}

	// Check for exact name match
	if (module[componentName]) {
		return module[componentName]
	}

	return null
}
