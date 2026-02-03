import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "fs-extra"

export async function findUiPackageRoot(): Promise<string> {
	// When installed, code runs from `dist/**`. We need the real package root
	// (the directory that contains the package.json with name "@bctechnology/ui").
	let dir = path.dirname(fileURLToPath(import.meta.url))
	for (let i = 0; i < 12; i++) {
		const pkgJsonPath = path.join(dir, "package.json")
		if (await fs.pathExists(pkgJsonPath)) {
			try {
				const pkg = await fs.readJson(pkgJsonPath)
				if (pkg?.name === "@bctechnology/ui") return dir
			} catch {
				// ignore and continue walking upwards
			}
		}
		const parent = path.dirname(dir)
		if (parent === dir) break
		dir = parent
	}
	// Fallback: best-effort. This should only happen in unusual environments.
	return path.dirname(fileURLToPath(import.meta.url))
}
