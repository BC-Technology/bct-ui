import path from "node:path"
import { fileURLToPath } from "node:url"
import { confirm, isCancel, note, outro, spinner } from "@clack/prompts"
import { execa } from "execa"
import fs from "fs-extra"
import { BCT_CONFIG_FILENAME, type BctProjectConfig } from "../config.js"
import type { parseArgs } from "../lib/args.js"
import { flagString } from "../lib/args.js"
import { getUiVersion } from "../lib/ui-version.js"

type InitTemplate = "vite" | "next"
type ParsedArgs = ReturnType<typeof parseArgs>

function cwdPath(...parts: string[]) {
	return path.join(process.cwd(), ...parts)
}

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

async function runPnpmInstall(packages: string[], dev = false) {
	// Run pnpm add with hidden stdio to prevent any potential interactive prompts
	const args = dev ? ["add", "-D", ...packages] : ["add", ...packages]
	await execa("pnpm", args, {
		stdio: ["ignore", "pipe", "pipe"],
		env: { ...process.env, CI: "1" },
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

// ============================================================================
// Manual project scaffolding (avoids nested CLIs entirely)
// ============================================================================

async function patchViteApp(srcDir: boolean) {
	// Tailwind v4 uses the Vite plugin
	await runPnpmInstall(["tailwindcss", "@tailwindcss/vite"], true)

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

	// Install React Router and update App.tsx
	await runPnpmInstall(["react-router-dom"])

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
	await runPnpmInstall(["tailwindcss", "@tailwindcss/postcss", "postcss"], true)

	// Ensure postcss config uses @tailwindcss/postcss (Tailwind v4 docs).
	const postcssConfigPath = cwdPath("postcss.config.mjs")
	const postcssConfig = `const config = {\n\tplugins: {\n\t\t"@tailwindcss/postcss": {},\n\t},\n}\n\nexport default config\n`
	await writeText(postcssConfigPath, postcssConfig)

	const existingCss = (await readTextIfExists(globalsPath)) ?? ""
	const stripped = stripExistingTailwindDirectives(existingCss)
	// Token import is handled centrally after scaffolding
	await writeText(globalsPath, stripped)
}

async function removeCompetingLinters() {
	try {
		const pkgPath = cwdPath("package.json")
		const pkgContent = await readTextIfExists(pkgPath)
		if (!pkgContent) return

		const pkg = JSON.parse(pkgContent)
		const deps = pkg.dependencies || {}
		const devDeps = pkg.devDependencies || {}

		// Linters/formatters to remove
		const toRemove = [
			"prettier",
			"eslint",
			"@typescript-eslint/eslint-plugin",
			"@typescript-eslint/parser",
			"stylelint",
			"tslint",
			"standard",
			"semistandard",
			"happiness",
			"xo",
			"standardx",
		]

		const foundToRemove: string[] = []
		for (const dep of toRemove) {
			if (deps[dep] || devDeps[dep]) {
				foundToRemove.push(dep)
			}
		}

		if (foundToRemove.length > 0) {
			note(
				`Removing competing linters/formatters: ${foundToRemove.join(", ")}`,
				"Cleanup",
			)
			await execa("pnpm", ["remove", ...foundToRemove], {
				stdio: ["ignore", "pipe", "pipe"],
				env: { ...process.env, CI: "1" },
			})
		}

		// Also remove config files
		const configFilesToRemove = [
			".prettierrc",
			".prettierrc.js",
			".prettierrc.json",
			".prettierrc.yaml",
			".prettierrc.yml",
			"prettier.config.js",
			"prettier.config.cjs",
			".eslintrc",
			".eslintrc.js",
			".eslintrc.json",
			".eslintrc.yaml",
			".eslintrc.yml",
			"eslint.config.js",
			"eslint.config.cjs",
			".stylelintrc",
			".stylelintrc.js",
			".stylelintrc.json",
			"stylelint.config.js",
			"stylelint.config.cjs",
		]

		for (const configFile of configFilesToRemove) {
			const configPath = cwdPath(configFile)
			if (fs.existsSync(configPath)) {
				await fs.remove(configPath)
			}
		}
	} catch {
		// Non-critical, just continue
		// Note: We don't show warnings to user for cleaner UX
	}
}

async function detectProjectStructure(): Promise<{
	appType: InitTemplate
	srcDir: boolean
}> {
	// Check for Next.js indicators
	if (
		fs.existsSync("next.config.ts") ||
		fs.existsSync("next.config.js") ||
		fs.existsSync("next.config.mjs")
	) {
		return {
			appType: "next",
			srcDir: await detectNextUsesSrcDir(),
		}
	}

	// Check for Vite indicators
	if (
		fs.existsSync("vite.config.ts") ||
		fs.existsSync("vite.config.js") ||
		fs.existsSync("vite.config.mjs")
	) {
		return {
			appType: "vite",
			srcDir: fs.existsSync("src"),
		}
	}

	throw new Error(
		"No Vite or Next.js project detected in the current directory.\n\n" +
			"BCT init only works on existing Vite or Next.js projects.\n\n" +
			"Please ensure you're in a project directory with one of:\n" +
			"  - vite.config.ts/js/mjs (for Vite projects)\n" +
			"  - next.config.ts/js/mjs (for Next.js projects)\n\n" +
			"If you need to create a new project first:\n" +
			"  Vite: pnpm create vite my-app --template react-ts\n" +
			"  Next: npx create-next-app@latest my-app\n\n" +
			"Then: cd my-app && bct init",
	)
}

export async function runInit(args: ParsedArgs) {
	await ensurePnpm()

	// Detect framework and src structure from existing project
	const { appType, srcDir: projectSrcDir } = await detectProjectStructure()

	const srcDirFromFlag = flagString(args.flags, "src-dir")
	const srcDir =
		srcDirFromFlag !== undefined ? srcDirFromFlag === "true" : projectSrcDir

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
		appType,
		srcDir,
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

	await writeProjectConfig(config)

	// Remove competing linters/formatters before installing Biome
	await removeCompetingLinters()

	const deps = ["clsx", "date-fns", "@base-ui/react"]
	const s2 = spinner()
	s2.start("Installing dependencies…")
	await runPnpmInstall(deps)
	await runPnpmInstall(["@biomejs/biome"], true)
	s2.stop("Dependencies installed")

	// Write biome.json (always overwrite since we removed competing linters)
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

	// Write .vscode/settings.json (always overwrite for Biome integration)
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
		await runPnpmInstall(["paraglide-js"])
		if (zustandLocaleStore) await runPnpmInstall(["zustand"])
	}

	if (themeStore) {
		await runPnpmInstall(["zustand"])
	}

	if (appType === "vite") await patchViteApp(srcDir)
	if (appType === "next") await patchNextApp(await detectNextGlobalsCss())

	// Update tsconfig.json paths for @ alias (works for both Vite and Next.js)
	const tsconfigPath = cwdPath("tsconfig.json")
	const tsconfig = (await readTextIfExists(tsconfigPath)) ?? "{}"
	const tsconfigObj = JSON.parse(tsconfig)

	if (!tsconfigObj.compilerOptions) tsconfigObj.compilerOptions = {}
	if (!tsconfigObj.compilerOptions.paths) tsconfigObj.compilerOptions.paths = {}

	tsconfigObj.compilerOptions.baseUrl = "."
	// Only set @/* if not already defined to avoid overwriting custom paths
	if (!tsconfigObj.compilerOptions.paths["@/*"]) {
		tsconfigObj.compilerOptions.paths["@/*"] = [srcDir ? "src/*" : "*"]
	}

	await writeText(tsconfigPath, `${JSON.stringify(tsconfigObj, null, 2)}\n`)

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
	if (appType === "vite") {
		const cssPath = srcDir ? cwdPath("src/index.css") : cwdPath("index.css")
		const existingCss = (await readTextIfExists(cssPath)) ?? ""
		const withTokens = ensureCssImportAtTop(
			existingCss,
			`@import "./${path.relative(path.dirname(cssPath), tokensDest).replaceAll("\\\\", "/")}";`,
		)
		await writeText(cssPath, withTokens)
	} else if (appType === "next") {
		const globalsPathResolved = await detectNextGlobalsCss()
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
