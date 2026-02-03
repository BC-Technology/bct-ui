import fs from "node:fs"
import path from "node:path"
import process from "node:process"
import { fileURLToPath } from "node:url"

const packageDir = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
)
const pkgJsonPath = path.join(packageDir, "package.json")
const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"))

const version = pkgJson.version
const versionDir = path.join(packageDir, "src", "registry", "versions", version)
const registryJsonPath = path.join(versionDir, "registry.json")

function fail(msg) {
	process.stderr.write(`${msg}\n`)
	process.exit(1)
}

if (!fs.existsSync(versionDir)) {
	fail(
		`Missing registry version folder:\n` +
			`  ${versionDir}\n\n` +
			`Refusing to publish ${pkgJson.name}@${version}.`,
	)
}

if (!fs.existsSync(registryJsonPath)) {
	fail(
		`Missing registry.json:\n` +
			`  ${registryJsonPath}\n\n` +
			`Refusing to publish ${pkgJson.name}@${version}.`,
	)
}
