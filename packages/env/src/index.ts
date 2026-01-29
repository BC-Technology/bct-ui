export const BCT_PLATFORM_VERSION = "0.1.0"

export type BctProjectConfig = {
	bctVersion: string
	appType: "vite" | "next"
	srcDir: boolean
	paths: {
		aliasPrefix: "@"
		aliasTarget: "src" | "."
	}
	tokens: {
		filePath: string // e.g. "src/bct/index.css" or "bct/index.css"
	}
	components: {
		outDir: string // e.g. "src/components" or "components"
	}
	features: {
		i18n: {
			enabled: boolean
			zustandLocaleStore: boolean
		}
		themeStore: {
			enabled: boolean
		}
	}
}

export const BCT_CONFIG_FILENAME = "bct.config.json"
