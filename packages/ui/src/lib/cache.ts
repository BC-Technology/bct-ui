import os from "node:os"
import path from "node:path"
import fs from "fs-extra"

export function getCacheRoot(): string {
	// Windows convention: LOCALAPPDATA
	if (process.platform === "win32") {
		const base =
			process.env.LOCALAPPDATA ?? path.join(os.homedir(), "AppData", "Local")
		return path.join(base, "bct-ui", "cache")
	}

	// macOS/Linux: ~/.cache
	return path.join(os.homedir(), ".cache", "bct-ui")
}

export function cachePath(...parts: string[]): string {
	return path.join(getCacheRoot(), ...parts)
}

export async function readCacheText(filePath: string): Promise<string | null> {
	if (!(await fs.pathExists(filePath))) return null
	return fs.readFile(filePath, "utf8")
}

export async function writeCacheText(
	filePath: string,
	contents: string,
): Promise<void> {
	await fs.ensureDir(path.dirname(filePath))
	await fs.writeFile(filePath, contents, "utf8")
}
