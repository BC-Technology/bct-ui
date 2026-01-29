type ParsedArgs = {
	command?: string
	positionals: string[]
	flags: Record<string, string | boolean>
}

export function parseArgs(argv: string[]): ParsedArgs {
	const out: ParsedArgs = { positionals: [], flags: {} }
	const args = [...argv]

	out.command = args.shift()

	while (args.length > 0) {
		const cur = args.shift()
		if (!cur) break

		if (cur === "--") {
			out.positionals.push(...args)
			break
		}

		if (cur.startsWith("--")) {
			const [rawKey, rawValue] = cur.slice(2).split("=", 2)
			const key = rawKey.trim()
			if (!key) continue

			if (rawValue !== undefined) {
				out.flags[key] = rawValue
				continue
			}

			const next = args[0]
			if (next && !next.startsWith("-")) {
				out.flags[key] = args.shift() as string
			} else {
				out.flags[key] = true
			}
			continue
		}

		out.positionals.push(cur)
	}

	return out
}

export function flagString(
	flags: Record<string, string | boolean>,
	key: string,
): string | undefined {
	const v = flags[key]
	if (typeof v === "string") return v
	return undefined
}

export function flagBoolean(
	flags: Record<string, string | boolean>,
	key: string,
): boolean {
	return Boolean(flags[key])
}
