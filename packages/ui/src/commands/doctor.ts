import path from "node:path"
import { note } from "@clack/prompts"
import fs from "fs-extra"
import { BCT_CONFIG_FILENAME, type BctProjectConfig } from "../config.js"

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

	// Token CSS presence check - tokens are now directly in the configured file path for both frameworks
	const hasTokens = await (async () => {
		const tokensPath = cwdPath(_config.tokens.filePath)
		if (!(await fs.pathExists(tokensPath))) return false
		const content = await fs.readFile(tokensPath, "utf8")
		return content.trim().length > 0
	})()

	if (!hasTokens) {
		issues.push(
			`Could not find tokens file at "${_config.tokens.filePath}". This file is mandatory.`,
		)
	}

	if (issues.length > 0) {
		note(issues.map((i) => `- ${i}`).join("\n"), "Issues found")
		process.exitCode = 1
		return
	}

	note("Project appears compatible.", "OK")
}
