#!/usr/bin/env node
import { runAdd } from "./commands/add.js"
import { runDoctor } from "./commands/doctor.js"
import { runInit } from "./commands/init.js"
import { parseArgs } from "./lib/args.js"
import { cliIntro } from "./lib/cli-ui.js"

const VERSION = "0.1.0"

function printHelp() {
	// Keep this minimal and stable (no framework dependency).
	// This is intentionally not localized.
	process.stdout.write(
		[
			"BCT UI platform CLI",
			"",
			"Usage:",
			"  bct <command> [options]",
			"",
			"Commands:",
			"  init     Initialize a project with BCT UI conventions",
			"  add      Add a component by copying source into your project",
			"  doctor   Validate that the project matches BCT requirements",
			"",
			"Global options:",
			"  -h, --help       Show help",
			"  -V, --version    Show version",
			"",
		].join("\n"),
	)
}

async function main() {
	const argv = process.argv.slice(2)
	const [first] = argv
	if (first === "-h" || first === "--help" || !first) {
		printHelp()
		return
	}
	if (first === "-V" || first === "--version") {
		process.stdout.write(`${VERSION}\n`)
		return
	}

	const parsed = parseArgs(argv)
	const cmd = parsed.command

	cliIntro()

	if (cmd === "init") {
		await runInit(parsed)
		return
	}

	if (cmd === "add") {
		await runAdd(parsed)
		return
	}

	if (cmd === "doctor") {
		await runDoctor()
		return
	}

	printHelp()
	process.exitCode = 1
}

main().catch((err) => {
	// eslint/biome console rules allow error
	console.error(err instanceof Error ? err.message : err)
	process.exitCode = 1
})
