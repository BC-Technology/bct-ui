import path from "node:path"
import { isCancel, note, outro, select, spinner } from "@clack/prompts"
import { execa } from "execa"
import fs from "fs-extra"
import type { parseArgs } from "../lib/args.js"
import { flagString } from "../lib/args.js"
import { cachePath, readCacheText, writeCacheText } from "../lib/cache"
import { FetchError, fetchText } from "../lib/fetcher"
import { getUiVersion } from "../lib/ui-version.js"
import { loadRegistry } from "../registry/registry.js"

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
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
	// Load the versioned registry using the installed package version
	const version = await getUiVersion()
	const registry = await loadRegistry(version)

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
	const defaultOutDir = fs.existsSync(cwdPath("src"))
		? "src/components"
		: "components"
	const outDir = cwdPath(outFromFlag ?? defaultOutDir)
	await fs.ensureDir(outDir)

	for (const file of entry.files) {
		const dstPath = path.join(outDir, file.dst)
		await fs.ensureDir(path.dirname(dstPath))

		const cacheFile = cachePath(version, file.src)
		let contents = await readCacheText(cacheFile)
		if (!contents) {
			const ref = `v${version}`
			const url = `https://raw.githubusercontent.com/BC-Technology/bct-ui/${ref}/packages/ui/src/registry/versions/${version}/${file.src}`
			try {
				contents = await fetchText(url)
			} catch (e) {
				if (e instanceof FetchError && e.status === 404) {
					throw new Error(
						`Could not fetch component files for version ${version}.\n\n` +
							`Expected a GitHub tag/release named "${ref}" and the file at:\n` +
							`  ${url}\n\n` +
							`Please ensure the release/tag exists for this package version.`,
					)
				}
				throw e
			}

			await writeCacheText(cacheFile, contents)
		}

		await fs.writeFile(dstPath, contents, "utf8")
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
			await execa("pnpm", ["add", ...missingDeps], {
				stdio: ["ignore", "pipe", "pipe"],
				env: { ...process.env, CI: process.env.CI ?? "1" },
			})
			s.stop("Dependencies installed")
		} catch (e) {
			s.stop("Failed installing dependencies")
			const anyErr = e as { stdout?: unknown; stderr?: unknown }
			const stdout = typeof anyErr.stdout === "string" ? anyErr.stdout : ""
			const stderr = typeof anyErr.stderr === "string" ? anyErr.stderr : ""
			const tail = `${stdout}\n${stderr}`.trim()
			if (tail) note(tail.slice(-6000), "pnpm output (last 6000 chars)")
			throw e
		}
	}

	const copied = entry.files
		.map((f) => path.join(outFromFlag ?? defaultOutDir, f.dst))
		.join("\n")
	note(copied, `Added ${component}`)

	outro("Done.")
}
