import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "fs-extra"
import { findUiPackageRoot, findUiPackageRootSync } from "./package-root.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function getUiVersion(): Promise<string> {
	// Always resolve the version of the @bctechnology/ui package itself (not the user's app).
	try {
		const packageRoot = await findUiPackageRoot()
		const packageJsonPath = path.join(packageRoot, "package.json")
		const packageJson = await fs.readJson(packageJsonPath)
		return packageJson.version
	} catch {
		// Legacy fallback (development)
		const packageJsonPath = path.join(__dirname, "..", "..", "package.json")
		const packageJson = await fs.readJson(packageJsonPath)
		return packageJson.version
	}
}

export function getUiVersionSync(): string {
	// Always resolve the version of the @bctechnology/ui package itself (not the user's app).
	try {
		const packageRoot = findUiPackageRootSync()
		const packageJsonPath = path.join(packageRoot, "package.json")
		const packageJson = fs.readJsonSync(packageJsonPath)
		return packageJson.version
	} catch {
		// Legacy fallback (development)
		const packageJsonPath = path.join(__dirname, "..", "..", "package.json")
		const packageJson = fs.readJsonSync(packageJsonPath)
		return packageJson.version
	}
}
