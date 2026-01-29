import path from "node:path"
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

function ensureCssImportsAtTop(css: string, importLines: string[]) {
	const lines = css.split(/\r?\n/)

	// `@import` must come before other rules; keep `@charset` (if any) first.
	const charsetLine = lines[0]?.trim().startsWith("@charset") ? lines[0] : null
	const startIndex = charsetLine ? 1 : 0

	const importSet = new Set(importLines.map((l) => l.trim()))
	const rest = lines
		.slice(startIndex)
		.filter((line) => !importSet.has(line.trim()))
		.join("\n")
		.trimStart()

	const prefix = [
		...(charsetLine ? [charsetLine] : []),
		...importLines,
		"",
	].join("\n")

	const combined = `${prefix}${rest}`
	return combined.endsWith("\n") ? combined : `${combined}\n`
}

async function readTextIfExists(filePath: string) {
	if (!(await fs.pathExists(filePath))) return null
	return fs.readFile(filePath, "utf8")
}

async function writeText(filePath: string, contents: string) {
	await fs.ensureDir(path.dirname(filePath))
	await fs.writeFile(filePath, contents, "utf8")
}

async function writeProjectConfig(config: BctProjectConfig) {
	const outPath = cwdPath(BCT_CONFIG_FILENAME)
	await fs.writeFile(outPath, `${JSON.stringify(config, null, 2)}\n`, "utf8")
}

async function ensurePnpm() {
	// Best-effort: if pnpm isn't available, commands will fail loudly.
	await execa("pnpm", ["-v"])
}

async function postProcessViteForSrcDirFalse() {
	// Move src/* contents up one level and update imports
	const srcDir = cwdPath("src")
	const rootDir = cwdPath(".")

	if (!(await fs.pathExists(srcDir))) {
		// Nothing to do (project may already be non-src layout).
		return
	}

	// Get all files in src directory
	const files = await fs.readdir(srcDir, { recursive: true })

	for (const file of files) {
		if (typeof file !== "string") continue
		const srcPath = path.join(srcDir, file)
		const dstPath = path.join(rootDir, file)

		// Skip directories for now, they'll be created as needed
		const stat = await fs.stat(srcPath)
		if (stat.isDirectory()) continue

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
				/resolve\.alias\['@'\]\s*:\s*path\.resolve\([^)]*?['"]src['"][^)]*?\)/g,
				`resolve.alias['@'] : path.resolve(process.cwd(), '.')`,
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
	await execa("pnpm", ["add", "-D", "tailwindcss", "@tailwindcss/vite"], {
		stdio: "inherit",
	})

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
	if (!nextViteConfig.includes("import { defineConfig }")) {
		nextViteConfig = `import { defineConfig } from "vite"\n${nextViteConfig}`
	}
	if (!nextViteConfig.includes("import path")) {
		nextViteConfig = `import path from "node:path"\n${nextViteConfig}`
	}
	if (!nextViteConfig.includes("import tailwindcss")) {
		nextViteConfig = `import tailwindcss from "@tailwindcss/vite"\n${nextViteConfig}`
	}

	// Ensure the config has resolve.alias setup
	if (!nextViteConfig.includes("resolve:")) {
		nextViteConfig = nextViteConfig.replace(
			/export default defineConfig\(\{/,
			`export default defineConfig({\n\tresolve: {\n\t\talias: {\n\t\t\t"@": path.resolve(process.cwd(), "${srcDir ? "src" : "."}")\n\t\t}\n\t},\n`,
		)
	} else if (!nextViteConfig.includes('"@":')) {
		nextViteConfig = nextViteConfig.replace(
			/(resolve:\s*\{)/,
			`$1\n\t\talias: {\n\t\t\t"@": path.resolve(process.cwd(), "${srcDir ? "src" : "."}")\n\t\t},`,
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
	await execa("pnpm", ["add", "react-router-dom"], { stdio: "inherit" })

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

async function patchNextApp() {
	// Next scaffolding can generate Tailwind/PostCSS config; be careful not to clobber.
	// Only add a minimal Tailwind setup if it looks missing.
	const pkgJsonPath = cwdPath("package.json")
	const pkgRaw = await readTextIfExists(pkgJsonPath)
	const pkg = pkgRaw ? JSON.parse(pkgRaw) : null
	const deps = (pkg?.dependencies ?? {}) as Record<string, string>
	const devDeps = (pkg?.devDependencies ?? {}) as Record<string, string>

	const hasTailwindDep = Boolean(deps.tailwindcss || devDeps.tailwindcss)
	let tailwindAvailable = hasTailwindDep
	const postcssConfigCandidates = [
		"postcss.config.mjs",
		"postcss.config.js",
		"postcss.config.cjs",
	].map((p) => cwdPath(p))
	const hasPostcssConfig = postcssConfigCandidates.some((p) => fs.existsSync(p))

	if (!hasTailwindDep) {
		// Tailwind v4 uses the PostCSS plugin (works with Next via PostCSS).
		await execa(
			"pnpm",
			["add", "-D", "tailwindcss", "@tailwindcss/postcss", "postcss"],
			{ stdio: "inherit" },
		)
		tailwindAvailable = true

		// Only create a PostCSS config if none exists (avoid ambiguity).
		if (!hasPostcssConfig) {
			const postcssConfigPath = cwdPath("postcss.config.mjs")
			const postcssConfig = `const config = {\n\tplugins: {\n\t\t"@tailwindcss/postcss": {},\n\t},\n}\n\nexport default config\n`
			await writeText(postcssConfigPath, postcssConfig)
		}
	}

	// Token import is handled centrally after scaffolding.
	// If Tailwind is missing from globals.css, ensure a minimal Tailwind entrypoint.
	const globalsCandidates = [
		cwdPath("src/app/globals.css"),
		cwdPath("app/globals.css"),
		cwdPath("src/styles/globals.css"),
		cwdPath("styles/globals.css"),
	]
	const globalsPath =
		globalsCandidates.find((p) => fs.existsSync(p)) ?? globalsCandidates[0]

	const existingCss = (await readTextIfExists(globalsPath)) ?? ""
	const hasV4Import =
		existingCss.includes('@import "tailwindcss";') ||
		existingCss.includes("@import 'tailwindcss';")
	const hasV3Directives = existingCss
		.split(/\r?\n/)
		.some((l) => l.trim().startsWith("@tailwind "))

	if (!hasV4Import && !hasV3Directives && tailwindAvailable) {
		await writeText(
			globalsPath,
			ensureCssImportsAtTop(existingCss, ['@import "tailwindcss";']),
		)
	}
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
	const config: BctProjectConfig = {
		bctVersion,
		appType: template,
		srcDir: Boolean(srcDir),
		paths: {
			aliasPrefix: "@",
			aliasTarget: srcDir ? "src" : ".",
		},
		tokens: {
			filePath: srcDir ? "src/bct/index.css" : "bct/index.css",
		},
		components: {
			outDir: srcDir ? "src/components" : "components",
		},
		features: {
			i18n: {
				enabled: Boolean(i18nEnabled),
				zustandLocaleStore: Boolean(zustandLocaleStore),
			},
			themeStore: { enabled: Boolean(themeStore) },
		},
	}

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

		const targetDir = cwdPath(name)
		if (await fs.pathExists(targetDir)) {
			const entries = await fs.readdir(targetDir)
			if (entries.length > 0) {
				throw new Error(
					`Target directory already exists and is not empty: ${targetDir}`,
				)
			}
		}

		const proceed = await confirm({
			message: `Create project "${name}"?`,
			initialValue: true,
		})
		if (isCancel(proceed) || !proceed) {
			outro("Cancelled.")
			return
		}

		note(
			"This will run the template scaffolder. If it prompts, answer in the terminal.",
			"Scaffolding project",
		)
		if (template === "vite") {
			await execa("pnpm", ["create", "vite", name, "--template", "react-ts"], {
				stdio: "inherit",
			})
		} else {
			const nextArgs = [
				"create",
				"next-app",
				name,
				"--ts",
				"--eslint",
				"--tailwind",
				"--app",
				"--import-alias",
				"@/*",
			]
			if (srcDir) {
				nextArgs.push("--src-dir")
			} else {
				// Prefer explicit false to avoid interactive prompts in newer create-next-app versions.
				nextArgs.push("--no-src-dir")
			}
			await execa("pnpm", nextArgs, { stdio: "inherit" })
		}

		process.chdir(targetDir)

		// Post-process Vite if srcDir is false (must run inside project).
		if (template === "vite" && !srcDir) {
			const s = spinner()
			s.start("Configuring project structure…")
			await postProcessViteForSrcDirFalse()
			s.stop("Project structure configured")
		}
	}

	await writeProjectConfig(config)

	const deps = ["clsx", "date-fns", "@base-ui/react"]
	note(deps.join("\n"), "Installing base dependencies")
	await execa("pnpm", ["add", ...deps], { stdio: "inherit" })

	// Install Biome
	note("@biomejs/biome", "Installing Biome")
	await execa("pnpm", ["add", "-D", "@biomejs/biome"], { stdio: "inherit" })

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
			includes: srcDir ? ["src/**/*"] : ["**/*"],
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

	{
		const extraDeps = new Set<string>()
		if (i18nEnabled) extraDeps.add("paraglide-js")
		if (zustandLocaleStore || themeStore) extraDeps.add("zustand")
		if (extraDeps.size > 0) {
			await execa("pnpm", ["add", ...Array.from(extraDeps)], {
				stdio: "inherit",
			})
		}
	}

	if (template === "vite") await patchViteApp(srcDir)
	if (template === "next") await patchNextApp()

	// Copy tokens into the project (shipped inside @bct/ui)
	const tokensSource = path.join(
		path.dirname(new URL(import.meta.url).pathname),
		"..",
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
		const cssPath = srcDir ? cwdPath("src/index.css") : cwdPath("index.css")
		const existingCss = (await readTextIfExists(cssPath)) ?? ""
		const tokenImport = `@import "./${path.relative(path.dirname(cssPath), tokensDest).replaceAll("\\\\", "/")}";`
		const withImports = ensureCssImportsAtTop(existingCss, [
			'@import "tailwindcss";',
			tokenImport,
		])
		await writeText(cssPath, withImports)
	} else if (template === "next") {
		const globalsPath = srcDir
			? cwdPath("src/app/globals.css")
			: cwdPath("app/globals.css")
		const existingCss = (await readTextIfExists(globalsPath)) ?? ""
		const tokenImport = `@import "./${path.relative(path.dirname(globalsPath), tokensDest).replaceAll("\\\\", "/")}";`
		const withTokens = ensureCssImportsAtTop(existingCss, [tokenImport])
		await writeText(globalsPath, withTokens)
	}

	outro("Initialized.")
}
