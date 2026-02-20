import { addons } from "storybook/manager-api"

const VERSION_STORAGE_KEY = "bct-component-version"
const THEME_STORAGE_KEY = "bct-storybook-theme"
const DEFAULT_VERSION = "0.3.0"
const VERSIONED_VERSIONS = new Set(["0.3.0", "0.2.0"])
const VERSION_GLOBAL_KEY = "componentVersion"

const getStoredVersion = () => {
	try {
		return localStorage.getItem(VERSION_STORAGE_KEY) || DEFAULT_VERSION
	} catch {
		return DEFAULT_VERSION
	}
}

const setStoredVersion = (version: string) => {
	try {
		localStorage.setItem(VERSION_STORAGE_KEY, version)
	} catch {
		// ignore
	}
}

const version = getStoredVersion()

addons.setConfig({
	sidebar: {
		filters: {
			version: (item) => {
				if (!VERSIONED_VERSIONS.has(version)) return true
				const tags: string[] = (item as { tags?: string[] }).tags ?? []
				if (tags.length === 0) return true
				const hasVersionTag = tags.some((t) => t.startsWith("version:"))
				if (!hasVersionTag) return true
				return tags.includes(`version:${version}`)
			},
		},
	},
})

addons.register("bct-version-switcher", () => {
	const channel = addons.getChannel()

	channel.once("setGlobals", () => {
		const storedVersion = getStoredVersion()
		channel.emit("updateGlobals", {
			globals: { [VERSION_GLOBAL_KEY]: storedVersion },
		})
	})

	channel.on(
		"globalsUpdated",
		({ globals }: { globals: Record<string, string> }) => {
			const newVersion = globals[VERSION_GLOBAL_KEY] || DEFAULT_VERSION
			const prevVersion = getStoredVersion()

			if (newVersion !== prevVersion) {
				setStoredVersion(newVersion)
				window.location.reload()
			}
		},
	)
})

addons.register("bct-theme-toggle", () => {
	const channel = addons.getChannel()

	const applyTheme = (isDark: boolean) => {
		const iframe = document.querySelector(
			"#storybook-preview-iframe",
		) as HTMLIFrameElement
		if (iframe?.contentDocument?.documentElement) {
			if (isDark) {
				iframe.contentDocument.documentElement.classList.add("dark")
				iframe.contentDocument.documentElement.setAttribute(
					"data-theme",
					"dark",
				)
			} else {
				iframe.contentDocument.documentElement.classList.remove("dark")
				iframe.contentDocument.documentElement.setAttribute(
					"data-theme",
					"light",
				)
			}
		}
	}

	channel.on("storyRendered", () => {
		const isDark = localStorage.getItem(THEME_STORAGE_KEY) === "dark"
		applyTheme(isDark)
	})
})
