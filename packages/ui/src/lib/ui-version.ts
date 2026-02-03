import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "fs-extra"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function getUiVersion(): Promise<string> {
	// When running from installed package, look for package.json in the package root
	// In development, this will be the monorepo root. In production, it will be the package root.
	try {
		const packageJsonPath = path.join(process.cwd(), "package.json")
		const packageJson = await fs.readJson(packageJsonPath)
		return packageJson.version
	} catch {
		// Fallback: try relative to this file (for development)
		const packageJsonPath = path.join(__dirname, "..", "..", "package.json")
		const packageJson = await fs.readJson(packageJsonPath)
		return packageJson.version
	}
}

export function getUiVersionSync(): string {
	// When running from installed package, look for package.json in the package root
	// In development, this will be the monorepo root. In production, it will be the package root.
	try {
		const packageJsonPath = path.join(process.cwd(), "package.json")
		const packageJson = fs.readJsonSync(packageJsonPath)
		return packageJson.version
	} catch {
		// Fallback: try relative to this file (for development)
		const packageJsonPath = path.join(__dirname, "..", "..", "package.json")
		const packageJson = fs.readJsonSync(packageJsonPath)
		return packageJson.version
	}
}
