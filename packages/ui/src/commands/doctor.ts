import path from "node:path"
import { note } from "@clack/prompts"
import fs from "fs-extra"

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
}

export async function runDoctor() {
	const issues: string[] = []

	// Token CSS presence check - detect srcDir and check tokens at the expected path
	const srcDir = fs.existsSync(cwdPath("src"))
	const tokensPath = srcDir ? "src/index.css" : "index.css"

	const hasTokens = await (async () => {
		const fullTokensPath = cwdPath(tokensPath)
		if (!(await fs.pathExists(fullTokensPath))) return false
		const content = await fs.readFile(fullTokensPath, "utf8")
		return content.trim().length > 0
	})()

	if (!hasTokens) {
		issues.push(
			`Could not find tokens file at "${tokensPath}". This file is mandatory.`,
		)
	}

	if (issues.length > 0) {
		note(issues.map((i) => `- ${i}`).join("\n"), "Issues found")
		process.exitCode = 1
		return
	}

	note("Project appears compatible.", "OK")
}
