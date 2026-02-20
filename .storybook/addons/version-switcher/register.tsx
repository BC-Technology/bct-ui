import { addons } from "storybook/manager-api"

const ADDON_ID = "bct-version-switcher"
const GLOBAL_KEY = "componentVersion"
const DEFAULT_VERSION = "0.3.0"
const STORAGE_KEY = "bct-component-version"

const getStoredVersion = () => {
	try {
		return localStorage.getItem(STORAGE_KEY) || DEFAULT_VERSION
	} catch {
		return DEFAULT_VERSION
	}
}

const setStoredVersion = (version: string) => {
	try {
		localStorage.setItem(STORAGE_KEY, version)
	} catch {
		// ignore
	}
}

addons.register(ADDON_ID, () => {
	const channel = addons.getChannel()

	channel.once("setGlobals", () => {
		const storedVersion = getStoredVersion()
		channel.emit("updateGlobals", { globals: { [GLOBAL_KEY]: storedVersion } })
	})

	channel.on(
		"globalsUpdated",
		({ globals }: { globals: Record<string, string> }) => {
			const newVersion = globals[GLOBAL_KEY] || DEFAULT_VERSION
			const prevVersion = getStoredVersion()

			if (newVersion !== prevVersion) {
				setStoredVersion(newVersion)
				window.location.reload()
			}
		},
	)
})
