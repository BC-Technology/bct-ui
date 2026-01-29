import { fileURLToPath } from "node:url"
import fs from "fs-extra"

export async function getUiVersion(): Promise<string> {
	const pkgPath = fileURLToPath(new URL("../package.json", import.meta.url))
	const pkg = JSON.parse(await fs.readFile(pkgPath, "utf8")) as {
		version?: string
	}
	return pkg.version ?? "0.0.0"
}
