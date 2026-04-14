#!/usr/bin/env tsx
/**
 * BCT UI Docs — Add Component Preview Script
 *
 * Generates a preview wrapper file for a component in the docs site.
 *
 * Usage:
 *   pnpm docs:add-component -- --component <name> [--version <version>] [--force]
 *   pnpm docs:add-component -- --all [--version <version>] [--force]
 *
 * Examples:
 *   pnpm docs:add-component -- --component button --version 0.4.0
 *   pnpm docs:add-component -- --all --version 0.4.0
 *   pnpm docs:add-component -- --component accordion --force
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = path.join(__dirname, "..")
const REGISTRY_ROOT = path.join(DOCS_ROOT, "../../packages/ui/src/registry/versions")
const PREVIEWS_ROOT = path.join(DOCS_ROOT, "previews")
const REGISTRY_FILE = path.join(PREVIEWS_ROOT, "registry.ts")

// Parse CLI args
const args = process.argv.slice(2)
const getArg = (flag: string): string | undefined => {
	const idx = args.indexOf(flag)
	return idx !== -1 ? args[idx + 1] : undefined
}
const hasFlag = (flag: string): boolean => args.includes(flag)

const component = getArg("--component")
const version = getArg("--version") ?? "0.4.0"
const all = hasFlag("--all")
const force = hasFlag("--force")

if (!component && !all) {
	console.error("Error: Provide --component <name> or --all")
	console.error("Usage: pnpm docs:add-component -- --component button --version 0.4.0")
	process.exit(1)
}

// Load registry
const registryPath = path.join(REGISTRY_ROOT, version, "registry.json")
if (!fs.existsSync(registryPath)) {
	console.error(`Registry not found: ${registryPath}`)
	process.exit(1)
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8")) as Record<
	string,
	{
		title: string
		description?: string
		files: { src: string }[]
		deps: string[]
	}
>

// Determine which components to generate
const targets = all ? Object.keys(registry) : [component as string]

function getExportedInterface(source: string): string {
	const match = source.match(/export interface (\w+Props)/)
	return match ? match[1] : "Props"
}

function getExportedFunction(source: string): string {
	const match = source.match(/export function (\w+)/)
	return match ? match[1] : "Component"
}

function generatePreviewWrapper(
	componentName: string,
	version: string,
	entry: { title: string; description?: string; deps: string[] },
	source: string,
): string {
	const exportedFn = getExportedFunction(source)
	const exportedInterface = getExportedInterface(source)
	const relImport = `../../../../packages/ui/src/registry/versions/${version}/components/${componentName}`

	// Try to extract prop variants from interface
	const variantMatch = source.match(/variant\?:\s*((?:"[^"]+"\s*\|\s*)*"[^"]+")/s)
	const sizeMatch = source.match(/size\?:\s*((?:"[^"]+"\s*\|\s*)*"[^"]+")/s)

	const variants = variantMatch
		? variantMatch[1]
				.replace(/\s+/g, " ")
				.split("|")
				.map((v) => v.trim().replace(/"/g, ""))
				.filter(Boolean)
		: []
	const sizes = sizeMatch
		? sizeMatch[1]
				.replace(/\s+/g, " ")
				.split("|")
				.map((s) => s.trim().replace(/"/g, ""))
				.filter(Boolean)
		: []

	const variantExampleCode =
		variants.length > 0
			? variants
					.slice(0, 4)
					.map((v) => `<${exportedFn} variant="${v}">${entry.title}</${exportedFn}>`)
					.join("\n")
			: `<${exportedFn}>${entry.title}</${exportedFn}>`

	const variantRenderCode =
		variants.length > 0
			? `<div className="flex flex-wrap items-center gap-3">\n\t\t\t${variants
					.slice(0, 4)
					.map((v) => `<${exportedFn} variant="${v}">${entry.title}</${exportedFn}>`)
					.join("\n\t\t\t")}\n\t\t</div>`
			: `<${exportedFn}>${entry.title}</${exportedFn}>`

	return `"use client"

import { ${exportedFn} } from "${relImport}"
import type { VariantPreview } from "../types"

// ${exportedInterface} accepts:
// ${variants.length > 0 ? `variants: ${variants.join(" | ")}` : "no variants detected"}
// ${sizes.length > 0 ? `sizes: ${sizes.join(" | ")}` : "no sizes detected"}

export const variants: VariantPreview[] = [
	{
		name: "Default",
		description: "${entry.description ?? `${entry.title} component`}",
		code: \`${variantExampleCode}\`,
		render: () => (
			${variantRenderCode}
		),
	},
	// TODO: Add more variant examples
]
`
}

function updateRegistry(componentName: string, version: string): void {
	if (!fs.existsSync(REGISTRY_FILE)) {
		console.warn("Registry file not found — skipping registry update")
		return
	}

	const content = fs.readFileSync(REGISTRY_FILE, "utf-8")
	const importLine = `\t\t"${componentName}": () => import("./${version}/${componentName}"),`
	const versionBlock = `"${version}": {`

	if (content.includes(`"${componentName}": () => import("./${version}/${componentName}")`)) {
		console.log(`  ↳ Registry already has entry for ${componentName} in ${version}`)
		return
	}

	// Find the version block and insert the new component
	const versionIdx = content.indexOf(versionBlock)
	if (versionIdx === -1) {
		console.warn(`  ↳ Version block "${version}" not found in registry — add manually`)
		return
	}

	// Find where to insert (before closing brace of version block)
	const blockStart = content.indexOf("{", versionIdx)
	let depth = 0
	let insertIdx = blockStart

	for (let i = blockStart; i < content.length; i++) {
		if (content[i] === "{") depth++
		if (content[i] === "}") {
			depth--
			if (depth === 0) {
				insertIdx = i
				break
			}
		}
	}

	const newContent =
		content.slice(0, insertIdx) + `${importLine}\n\t` + content.slice(insertIdx)
	fs.writeFileSync(REGISTRY_FILE, newContent, "utf-8")
	console.log(`  ↳ Added registry entry for ${componentName} in ${version}`)
}

// Generate previews
let generated = 0
let skipped = 0

for (const name of targets) {
	const entry = registry[name]
	if (!entry) {
		console.warn(`⚠ Component "${name}" not found in registry v${version}`)
		continue
	}

	const outputDir = path.join(PREVIEWS_ROOT, version)
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true })
	}

	const outputFile = path.join(outputDir, `${name}.tsx`)
	if (fs.existsSync(outputFile) && !force) {
		console.log(`⏭ Skipping ${name} (already exists — use --force to overwrite)`)
		skipped++
		continue
	}

	// Read source file
	const sourcePath = path.join(
		REGISTRY_ROOT,
		version,
		"components",
		`${name}.tsx`,
	)
	if (!fs.existsSync(sourcePath)) {
		console.warn(`⚠ Source not found: ${sourcePath}`)
		continue
	}

	const source = fs.readFileSync(sourcePath, "utf-8")
	const wrapperContent = generatePreviewWrapper(name, version, entry, source)

	fs.writeFileSync(outputFile, wrapperContent, "utf-8")
	console.log(`✓ Generated preview wrapper: previews/${version}/${name}.tsx`)

	// Update registry.ts
	updateRegistry(name, version)

	generated++
}

console.log("")
console.log(`Done: ${generated} generated, ${skipped} skipped`)
if (generated > 0) {
	console.log("")
	console.log("Next steps:")
	console.log("  1. Open the generated preview file(s)")
	console.log("  2. Replace the placeholder render() with actual component usage")
	console.log("  3. Add more variant examples to demonstrate different prop combinations")
}
