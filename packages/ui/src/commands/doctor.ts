import path from "node:path"
import { BCT_CONFIG_FILENAME, type BctProjectConfig } from "@bct/env"
import { note } from "@clack/prompts"
import fs from "fs-extra"

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
}

async function readProjectConfig(): Promise<BctProjectConfig> {
	const p = cwdPath(BCT_CONFIG_FILENAME)
	const raw = await fs.readFile(p, "utf8")
	return JSON.parse(raw) as BctProjectConfig
}

export async function runDoctor() {
	const _config = await readProjectConfig()

	const issues: string[] = []

	// Note: In production, we would check if the CLI supports this bctVersion.
	// For now, we just note the version for compatibility info.

	// Token CSS import presence check is intentionally heuristic (we don’t want framework-specific assumptions here yet).
	const candidateCssFiles = [
		"src/index.css",
		"src/styles.css",
		"src/app/globals.css",
		"styles/globals.css",
		"app/globals.css",
	].map((p) => cwdPath(p))

	const hasTokensImport = await (async () => {
		for (const p of candidateCssFiles) {
			if (!(await fs.pathExists(p))) continue
			const c = await fs.readFile(p, "utf8")
			if (c.includes("@bct/tokens/index.css")) return true
		}
		return false
	})()

	if (!hasTokensImport) {
		issues.push(
			`Could not find an import of "@bct/tokens/index.css" in common global CSS locations. This import is mandatory.`,
		)
	}

	if (issues.length > 0) {
		note(issues.map((i) => `- ${i}`).join("\n"), "Issues found")
		process.exitCode = 1
		return
	}

	note("Project appears compatible.", "OK")
}
