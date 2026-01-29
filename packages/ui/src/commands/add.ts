import path from "node:path"
import { BCT_CONFIG_FILENAME, type BctProjectConfig } from "@bct/env"
import { isCancel, note, outro, select, spinner } from "@clack/prompts"
import { execa } from "execa"
import fs from "fs-extra"
import type { parseArgs } from "../lib/args.js"
import { flagString } from "../lib/args.js"
import { loadRegistry } from "../registry/registry.js"

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
}

async function readProjectConfig(): Promise<BctProjectConfig> {
	const p = cwdPath(BCT_CONFIG_FILENAME)
	const raw = await fs.readFile(p, "utf8")
	return JSON.parse(raw) as BctProjectConfig
}

type PkgJson = {
	dependencies?: Record<string, string>
	devDependencies?: Record<string, string>
}

async function readPackageJson(): Promise<PkgJson> {
	const raw = await fs.readFile(cwdPath("package.json"), "utf8")
	return JSON.parse(raw) as PkgJson
}

type ParsedArgs = ReturnType<typeof parseArgs>

export async function runAdd(args: ParsedArgs) {
	const config = await readProjectConfig()

	// Load the versioned registry
	const registry = await loadRegistry(config.bctVersion)

	let component = args.positionals[0]
	if (!component) {
		const picked = await select({
			message: "Which component do you want to add?",
			options: Object.entries(registry)
				.sort(([a], [b]) => a.localeCompare(b))
				.map(([key, v]) => ({
					label: v.title,
					value: key,
					hint: v.description,
				})),
		})
		if (isCancel(picked)) {
			outro("Cancelled.")
			return
		}
		component = picked
	}

	const entry = registry[component]
	if (!entry) {
		throw new Error(
			`Unknown component "${component}". Available: ${Object.keys(registry).join(", ")}`,
		)
	}

	const outFromFlag = flagString(args.flags, "out")
	const outDir = cwdPath(outFromFlag ?? config.components.outDir)
	await fs.ensureDir(outDir)

	for (const file of entry.files) {
		const srcPath = path.join(
			path.dirname(new URL(import.meta.url).pathname),
			"..",
			"registry",
			"versions",
			config.bctVersion,
			file.src,
		)
		const dstPath = path.join(outDir, file.dst)
		await fs.ensureDir(path.dirname(dstPath))
		await fs.copyFile(srcPath, dstPath)
	}

	const pkg = await readPackageJson()
	const installed = new Set([
		...Object.keys(pkg.dependencies ?? {}),
		...Object.keys(pkg.devDependencies ?? {}),
	])
	const missingDeps = entry.deps.filter((dep) => !installed.has(dep))

	if (missingDeps.length > 0) {
		note(missingDeps.join("\n"), "Installing dependencies")
		const s = spinner()
		s.start("pnpm add …")
		try {
			await execa("pnpm", ["add", ...missingDeps], { stdio: "inherit" })
			s.stop("Dependencies installed")
		} catch (e) {
			s.stop("Failed installing dependencies")
			throw e
		}
	}

	const copied = entry.files
		.map((f) => path.join(outFromFlag ?? config.components.outDir, f.dst))
		.join("\n")
	note(copied, `Added ${component}`)

	outro("Done.")
}
