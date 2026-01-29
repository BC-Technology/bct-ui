import path from "node:path"
import { fileURLToPath } from "node:url"
import {
	confirm,
	isCancel,
	note,
	outro,
	select,
	spinner,
	text,
} from "@clack/prompts"
import { execa } from "execa"
import fs from "fs-extra"
import { BCT_CONFIG_FILENAME, type BctProjectConfig } from "../config.js"
import type { parseArgs } from "../lib/args.js"
import { flagBoolean, flagString } from "../lib/args.js"
import { getUiVersion } from "../lib/ui-version.js"

type InitTemplate = "vite" | "next"
type ParsedArgs = ReturnType<typeof parseArgs>

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
}

const IS_TTY = Boolean(process.stdin.isTTY && process.stdout.isTTY)

async function readTextIfExists(filePath: string) {
	if (!(await fs.pathExists(filePath))) return null
	return fs.readFile(filePath, "utf8")
}

async function writeText(filePath: string, contents: string) {
	await fs.ensureDir(path.dirname(filePath))
	await fs.writeFile(filePath, contents, "utf8")
}

function ensureCssImportAtTop(css: string, importLine: string) {
	if (css.includes(importLine)) return css
	return `${importLine}\n${css}`
}

function stripExistingTailwindDirectives(css: string) {
	return css
		.split("\n")
		.filter((line) => {
			const t = line.trim()
			if (t === '@import "tailwindcss";' || t === "@import 'tailwindcss';")
				return false
			if (t.startsWith("@tailwind ")) return false
			return true
		})
		.join("\n")
}

async function writeProjectConfig(config: BctProjectConfig) {
	const outPath = cwdPath(BCT_CONFIG_FILENAME)
	await fs.writeFile(outPath, `${JSON.stringify(config, null, 2)}\n`, "utf8")
}

async function ensurePnpm() {
	try {
		// Best-effort: if pnpm isn't available, commands will fail loudly.
		await execa("pnpm", ["-v"])
	} catch {
		throw new Error(
			"`pnpm` is required. Install it first (https://pnpm.io/installation) and try again.",
		)
	}
}

function looksLikeUnknownOptionError(err: unknown) {
	const msg =
		err instanceof Error ? err.message : typeof err === "string" ? err : ""
	const anyErr = err as { stderr?: unknown; stdout?: unknown } | null
	const stderr = typeof anyErr?.stderr === "string" ? anyErr.stderr : ""
	const stdout = typeof anyErr?.stdout === "string" ? anyErr.stdout : ""
	const combined = `${msg}\n${stderr}\n${stdout}`.toLowerCase()
	return (
		combined.includes("unknown option") ||
		combined.includes("unknown argument") ||
		combined.includes("unrecognized option") ||
		combined.includes("unexpected option")
	)
}

async function runPnpm(args: string[]) {
	// Forward TTY so upstream CLIs can prompt if needed, but set CI to reduce surprises.
	return execa("pnpm", args, {
		stdio: "inherit",
		env: { ...process.env, CI: process.env.CI ?? "1" },
	})
}

async function detectNextGlobalsCss() {
	const globalsCandidates = [
		cwdPath("src/app/globals.css"),
		cwdPath("app/globals.css"),
		cwdPath("src/styles/globals.css"),
		cwdPath("styles/globals.css"),
	]
	return globalsCandidates.find((p) => fs.existsSync(p)) ?? globalsCandidates[0]
}

async function detectNextUsesSrcDir() {
	return Boolean(
		fs.existsSync(cwdPath("src/app")) ||
			fs.existsSync(cwdPath("src/pages")) ||
			fs.existsSync(cwdPath("src/app/globals.css")) ||
			fs.existsSync(cwdPath("src/pages/_app.tsx")),
	)
}

async function scaffoldVite(name: string) {
	await runPnpm(["create", "vite", name, "--template", "react-ts"])
}

async function scaffoldNext(name: string, preferredSrcDir: boolean) {
	// Prefer deterministic flags (avoid generator questions), but retry with fewer flags if
	// the user's create-next-app version doesn't support them.
	const base = [
		"create",
		"next-app",
		name,
		"--ts",
		"--app",
		"--import-alias",
		"@/*",
	]

	const attempts: string[][] = [
		[
			...base,
			"--eslint",
			"--no-tailwind",
			preferredSrcDir ? "--src-dir" : "--no-src-dir",
		],
		[
			...base,
			"--eslint",
			"--no-tailwind",
			...(preferredSrcDir ? ["--src-dir"] : []),
		],
		[
			...base,
			"--eslint",
			"--tailwind",
			...(preferredSrcDir ? ["--src-dir"] : []),
		],
		[...base, "--eslint", "--tailwind"],
	]

	let lastErr: unknown = null
	for (const a of attempts) {
		try {
			await runPnpm(a)
			return
		} catch (err) {
			lastErr = err
			if (!looksLikeUnknownOptionError(err)) break
		}
	}

	throw lastErr
}

async function listFilesRecursive(rootDir: string): Promise<string[]> {
	const out: string[] = []
	async function walk(currentDir: string) {
		const entries = await fs.readdir(currentDir, { withFileTypes: true })
		for (const entry of entries) {
			const abs = path.join(currentDir, entry.name)
			if (entry.isDirectory()) {
				await walk(abs)
				continue
			}
			out.push(path.relative(rootDir, abs))
		}
	}
	await walk(rootDir)
	return out
}

async function postProcessViteForSrcDirFalse() {
	// Move src/* contents up one level and update imports
	const srcDir = cwdPath("src")
	const rootDir = cwdPath(".")

	if (!(await fs.pathExists(srcDir))) return

	// Get all files in src directory
	const files = await listFilesRecursive(srcDir)

	for (const file of files) {
		const srcPath = path.join(srcDir, file)
		const dstPath = path.join(rootDir, file)

		// Read file content
		let content = await fs.readFile(srcPath, "utf8")

		// Update import paths that reference src/
		content = content.replace(/from\s+["'](\.\.?\/)?src\//g, 'from "./')
		content = content.replace(
			/import\s*\(\s*["'](\.\.?\/)?src\//g,
			'import("./',
		)

		// Update tsconfig paths if they exist
		if (file === "tsconfig.json") {
			content = content.replace(/"src\/\*\*/g, '"**')
			content = content.replace(/"src\/"/g, '"."')
		}

		// Update vite config if it exists
		if (file === "vite.config.ts" || file === "vite.config.js") {
			content = content.replace(
				/resolve\.alias\['@'\]\s*:\s*path\.resolve\(__dirname,\s*['"]src['"]\)/g,
				`resolve.alias['@'] : path.resolve(__dirname, '.')`,
			)
		}

		await fs.ensureDir(path.dirname(dstPath))
		await fs.writeFile(dstPath, content, "utf8")
	}

	// Remove the src directory
	await fs.remove(srcDir)
}

async function patchViteApp(srcDir: boolean) {
	// Tailwind v4 uses the Vite plugin
	await runPnpm(["add", "-D", "tailwindcss", "@tailwindcss/vite"])

	// Patch vite config to include tailwindcss() plugin and @ alias.
	const viteConfigCandidates = [
		"vite.config.ts",
		"vite.config.js",
		"vite.config.mjs",
	].map((p) => cwdPath(p))
	const viteConfigPath =
		viteConfigCandidates.find((p) => fs.existsSync(p)) ??
		cwdPath("vite.config.ts")
	const viteConfig = (await readTextIfExists(viteConfigPath)) ?? ""

	let nextViteConfig = viteConfig

	// Add imports if not present
	if (
		!/import\s*\{\s*defineConfig\s*\}\s*from\s*["']vite["']/.test(
			nextViteConfig,
		)
	) {
		nextViteConfig = `import { defineConfig } from "vite"\n${nextViteConfig}`
	}
	if (!/import\s+path\s+from\s*["']node:path["']/.test(nextViteConfig)) {
		nextViteConfig = `import path from "node:path"\n${nextViteConfig}`
	}
	if (
		!/import\s+tailwindcss\s+from\s*["']@tailwindcss\/vite["']/.test(
			nextViteConfig,
		)
	) {
		nextViteConfig = `import tailwindcss from "@tailwindcss/vite"\n${nextViteConfig}`
	}

	// Ensure the config has resolve.alias setup
	if (!nextViteConfig.includes("resolve:")) {
		nextViteConfig = nextViteConfig.replace(
			/export default defineConfig\(\{/,
			`export default defineConfig({\n\tresolve: {\n\t\talias: {\n\t\t\t"@": path.resolve(__dirname, "${srcDir ? "src" : "."}")\n\t\t}\n\t},\n`,
		)
	} else if (!nextViteConfig.includes('"@":')) {
		nextViteConfig = nextViteConfig.replace(
			/(resolve:\s*\{)/,
			`$1\n\t\talias: {\n\t\t\t"@": path.resolve(__dirname, "${srcDir ? "src" : "."}")\n\t\t},`,
		)
	}

	// Ensure plugins includes tailwindcss
	if (!nextViteConfig.includes("tailwindcss()")) {
		if (nextViteConfig.includes("plugins:")) {
			nextViteConfig = nextViteConfig.replace(
				/(plugins:\s*\[)/,
				`$1\n\t\ttailwindcss(),`,
			)
		} else {
			nextViteConfig = nextViteConfig.replace(
				/export default defineConfig\(\{/,
				`export default defineConfig({\n\tplugins: [tailwindcss()],\n`,
			)
		}
	}

	await writeText(viteConfigPath, nextViteConfig)

	// Update tsconfig.json paths
	const tsconfigPath = cwdPath("tsconfig.json")
	const tsconfig = (await readTextIfExists(tsconfigPath)) ?? "{}"
	const tsconfigObj = JSON.parse(tsconfig)

	if (!tsconfigObj.compilerOptions) tsconfigObj.compilerOptions = {}
	if (!tsconfigObj.compilerOptions.paths) tsconfigObj.compilerOptions.paths = {}

	tsconfigObj.compilerOptions.baseUrl = "."
	tsconfigObj.compilerOptions.paths["@/*"] = [srcDir ? "src/*" : "*"]

	await writeText(tsconfigPath, `${JSON.stringify(tsconfigObj, null, 2)}\n`)

	// Install React Router and update App.tsx
	await runPnpm(["add", "react-router-dom"])

	// Update App.tsx to use React Router
	const appTsxPath = cwdPath(srcDir ? "src/App.tsx" : "App.tsx")
	const appJsxPath = cwdPath(srcDir ? "src/App.jsx" : "App.jsx")
	const appPath = fs.existsSync(appTsxPath) ? appTsxPath : appJsxPath

	if (appPath) {
		const routerCode = `import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<main className="min-h-dvh bg-(--bct-bg) p-6 text-(--bct-fg)">
				<h1 className="font-semibold text-2xl">BCT App</h1>
				<p className="mt-2 text-(--bct-muted-fg) text-sm">
					Welcome to your BCT-powered React app!
				</p>
			</main>
		),
	},
])

export default function App() {
	return <RouterProvider router={router} />
}
`
		await writeText(appPath, routerCode)

		// Update main.tsx to use App as default export
		const mainPath = cwdPath(srcDir ? "src/main.tsx" : "main.tsx")
		if (fs.existsSync(mainPath)) {
			let mainContent = await fs.readFile(mainPath, "utf8")
			mainContent = mainContent.replace(
				/import.*App.*from\s+["']\.\/App["']/,
				'import App from "./App"',
			)
			await writeText(mainPath, mainContent)
		}
	}

	// Token import is handled centrally after scaffolding
}

async function patchNextApp(globalsPath: string) {
	// Tailwind v4 uses the PostCSS plugin
	await runPnpm(["add", "-D", "tailwindcss", "@tailwindcss/postcss", "postcss"])

	// Ensure postcss config uses @tailwindcss/postcss (Tailwind v4 docs).
	const postcssConfigPath = cwdPath("postcss.config.mjs")
	const postcssConfig = `const config = {\n\tplugins: {\n\t\t"@tailwindcss/postcss": {},\n\t},\n}\n\nexport default config\n`
	await writeText(postcssConfigPath, postcssConfig)

	const existingCss = (await readTextIfExists(globalsPath)) ?? ""
	const stripped = stripExistingTailwindDirectives(existingCss)
	// Token import is handled centrally after scaffolding
	await writeText(globalsPath, stripped)
}

export async function runInit(args: ParsedArgs) {
	await ensurePnpm()

	const templateFromFlag = flagString(args.flags, "template")
	const templateFromFlags: InitTemplate | undefined =
		templateFromFlag === "vite" || templateFromFlag === "next"
			? templateFromFlag
			: undefined

	const srcDirFromFlag = flagString(args.flags, "src-dir")
	const srcDirDefault =
		srcDirFromFlag === undefined ? true : srcDirFromFlag === "true"

	const existing = flagBoolean(args.flags, "existing")

	const templatePicked = templateFromFlags
		? templateFromFlags
		: await select({
				message: "Which template?",
				options: [
					{ label: "Vite + React + TypeScript", value: "vite" },
					{ label: "Next.js + TypeScript", value: "next" },
				],
			})
	if (isCancel(templatePicked)) {
		outro("Cancelled.")
		return
	}
	const template: InitTemplate = templatePicked

	const srcDir =
		srcDirFromFlag !== undefined
			? srcDirDefault
			: await confirm({
					message: "Use `src/` directory?",
					initialValue: true,
				})
	if (isCancel(srcDir)) {
		outro("Cancelled.")
		return
	}

	const i18nEnabled = await confirm({
		message: "Add i18n with Paraglide?",
		initialValue: false,
	})
	if (isCancel(i18nEnabled)) {
		outro("Cancelled.")
		return
	}

	const zustandLocaleStore = i18nEnabled
		? await confirm({
				message: "Add Zustand store for locale management?",
				initialValue: false,
			})
		: false
	if (isCancel(zustandLocaleStore)) {
		outro("Cancelled.")
		return
	}

	const themeStore = await confirm({
		message: "Add default theme store?",
		initialValue: true,
	})
	if (isCancel(themeStore)) {
		outro("Cancelled.")
		return
	}

	const bctVersion = await getUiVersion()
	const preferredSrcDir = Boolean(srcDir)

	if (!existing) {
		const nameFromFlag = flagString(args.flags, "name")
		const namePicked = nameFromFlag
			? nameFromFlag
			: await text({ message: "Project name?", placeholder: "bct-app" })
		if (isCancel(namePicked)) {
			outro("Cancelled.")
			return
		}
		const name = String(namePicked || "bct-app")

		const proceed = await confirm({
			message: `Create project "${name}"?`,
			initialValue: true,
		})
		if (isCancel(proceed) || !proceed) {
			outro("Cancelled.")
			return
		}

		if (await fs.pathExists(cwdPath(name))) {
			throw new Error(
				`Directory "${name}" already exists. Choose a different name or remove the directory.`,
			)
		}

		// Avoid running a spinner while an upstream generator may prompt on the same TTY.
		if (IS_TTY) note("", "Scaffolding project (generator may output prompts)")

		if (template === "vite") {
			await scaffoldVite(name)
		} else {
			await scaffoldNext(name, preferredSrcDir)
		}

		// Move into the generated project before any post-processing.
		process.chdir(cwdPath(name))

		// Post-process Vite if srcDir is false
		if (template === "vite" && !preferredSrcDir) {
			const s = spinner()
			s.start("Configuring project structure…")
			await postProcessViteForSrcDirFalse()
			s.stop("Project structure configured")
		}
	}

	const projectSrcDir =
		template === "next" ? await detectNextUsesSrcDir() : preferredSrcDir
	const globalsPath = template === "next" ? await detectNextGlobalsCss() : null

	const config: BctProjectConfig = {
		bctVersion,
		appType: template,
		srcDir: projectSrcDir,
		paths: {
			aliasPrefix: "@",
			aliasTarget: projectSrcDir ? "src" : ".",
		},
		tokens: {
			filePath: projectSrcDir ? "src/bct/index.css" : "bct/index.css",
		},
		components: {
			outDir: projectSrcDir ? "src/components" : "components",
		},
		features: {
			i18n: {
				enabled: Boolean(i18nEnabled),
				zustandLocaleStore: Boolean(zustandLocaleStore),
			},
			themeStore: { enabled: Boolean(themeStore) },
		},
	}

	await writeProjectConfig(config)

	const deps = ["clsx", "date-fns", "@base-ui/react"]
	note(deps.join("\n"), "Installing base dependencies")
	await runPnpm(["add", ...deps])

	// Install Biome
	note("@biomejs/biome", "Installing Biome")
	await runPnpm(["add", "-D", "@biomejs/biome"])

	// Write biome.json
	const biomeConfig = {
		$schema: "./node_modules/@biomejs/biome/configuration_schema.json",
		root: true,
		vcs: {
			enabled: false,
			clientKind: "git",
			useIgnoreFile: true,
		},
		files: {
			includes: projectSrcDir ? ["src/**/*"] : ["**/*"],
		},
		formatter: {
			enabled: true,
			indentStyle: "tab",
		},
		linter: {
			enabled: true,
			rules: {
				recommended: true,
				suspicious: {
					noExplicitAny: "off",
					noConsole: {
						level: "warn",
						options: {
							allow: ["assert", "error", "info", "warn"],
						},
					},
				},
				correctness: {
					noUnusedImports: "error",
				},
				nursery: {
					useSortedClasses: {
						level: "error",
						fix: "safe",
						options: {
							attributes: ["classList", "className"],
							functions: ["clsx", "cva", "tw", "tw.*"],
						},
					},
				},
			},
		},
		javascript: {
			formatter: {
				quoteStyle: "double",
				trailingCommas: "all",
				semicolons: "asNeeded",
			},
		},
		assist: {
			enabled: true,
			actions: {
				source: {
					organizeImports: "on",
				},
			},
		},
	}
	await writeText(
		cwdPath("biome.json"),
		`${JSON.stringify(biomeConfig, null, 2)}\n`,
	)

	// Write .vscode/settings.json
	const vscodeSettings = {
		"biome.enabled": true,
		"biome.requireConfiguration": true,
		"biome.lsp.bin": "./node_modules/.bin/biome",

		"editor.defaultFormatter": "biomejs.biome",
		"editor.formatOnSave": true,
		"editor.codeActionsOnSave": {
			"source.fixAll.biome": "explicit",
			"source.organizeImports.biome": "explicit",
		},

		"[javascript]": { "editor.defaultFormatter": "biomejs.biome" },
		"[typescript]": { "editor.defaultFormatter": "biomejs.biome" },
		"[javascriptreact]": { "editor.defaultFormatter": "biomejs.biome" },
		"[typescriptreact]": { "editor.defaultFormatter": "biomejs.biome" },
		"[json]": { "editor.defaultFormatter": "biomejs.biome" },
		"[jsonc]": { "editor.defaultFormatter": "biomejs.biome" },
		"[css]": { "editor.defaultFormatter": "biomejs.biome" },
	}
	await writeText(
		cwdPath(".vscode/settings.json"),
		`${JSON.stringify(vscodeSettings, null, 2)}\n`,
	)

	if (i18nEnabled) {
		await runPnpm(["add", "paraglide-js"])
		if (zustandLocaleStore) await runPnpm(["add", "zustand"])
	}

	if (themeStore) {
		await runPnpm(["add", "zustand"])
	}

	if (template === "vite") await patchViteApp(projectSrcDir)
	if (template === "next")
		await patchNextApp(globalsPath ?? cwdPath("app/globals.css"))

	// Copy tokens into the project (shipped inside @bct/ui)
	const packageRoot = path.resolve(
		path.dirname(fileURLToPath(import.meta.url)),
		"..",
		"..",
	)
	const tokensSource = path.join(
		packageRoot,
		"src",
		"assets",
		"tokens",
		"index.css",
	)
	const tokensDest = cwdPath(config.tokens.filePath)
	await fs.ensureDir(path.dirname(tokensDest))
	await fs.copyFile(tokensSource, tokensDest)

	// Update global CSS to import local tokens
	if (template === "vite") {
		const cssPath = projectSrcDir
			? cwdPath("src/index.css")
			: cwdPath("index.css")
		const existingCss = (await readTextIfExists(cssPath)) ?? ""
		const withTokens = ensureCssImportAtTop(
			existingCss,
			`@import "./${path.relative(path.dirname(cssPath), tokensDest).replaceAll("\\\\", "/")}";`,
		)
		await writeText(cssPath, withTokens)
	} else if (template === "next") {
		const globalsPathResolved = globalsPath ?? (await detectNextGlobalsCss())
		const existingCss = (await readTextIfExists(globalsPathResolved)) ?? ""
		const withTokens = ensureCssImportAtTop(
			existingCss,
			`@import "./${path
				.relative(path.dirname(globalsPathResolved), tokensDest)
				.replaceAll("\\\\", "/")}";`,
		)
		await writeText(globalsPathResolved, withTokens)
	}

	outro("Initialized.")
}
