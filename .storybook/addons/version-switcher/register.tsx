import { useCallback, useState } from "react"
import { IconButton } from "storybook/internal/components"
import { addons, types } from "storybook/internal/manager-api"

const ADDON_ID = "bct-version-switcher"
const TOOL_ID = `${ADDON_ID}/tool`
const _PARAM_KEY = "componentVersion"

const VERSIONS = ["0.2.0", "0.1.12", "0.1.11", "0.1.8", "0.1.0"]

const VersionSwitcher = () => {
	const [currentVersion, setCurrentVersion] = useState(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem("bct-component-version") || "0.2.0"
		}
		return "0.2.0"
	})
	const [isOpen, setIsOpen] = useState(false)

	const handleVersionChange = useCallback((version: string) => {
		setCurrentVersion(version)
		localStorage.setItem("bct-component-version", version)
		setIsOpen(false)

		// Trigger a global event that stories can listen to
		if (typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("bct-version-change", { detail: { version } }),
			)
		}
	}, [])

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<IconButton
				key={TOOL_ID}
				title={`Component Version: ${currentVersion}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				v{currentVersion}
			</IconButton>
			{isOpen && (
				<div
					style={{
						position: "absolute",
						top: "100%",
						right: 0,
						marginTop: "4px",
						backgroundColor: "white",
						border: "1px solid #ccc",
						borderRadius: "4px",
						boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
						zIndex: 1000,
						minWidth: "120px",
					}}
				>
					{VERSIONS.map((version) => (
						<button
							key={version}
							onClick={() => handleVersionChange(version)}
							style={{
								display: "block",
								width: "100%",
								padding: "8px 16px",
								border: "none",
								background:
									version === currentVersion ? "#f0f0f0" : "transparent",
								textAlign: "left",
								cursor: "pointer",
								fontSize: "14px",
							}}
							onMouseEnter={(e) => {
								if (version !== currentVersion) {
									e.currentTarget.style.backgroundColor = "#f5f5f5"
								}
							}}
							onMouseLeave={(e) => {
								if (version !== currentVersion) {
									e.currentTarget.style.backgroundColor = "transparent"
								}
							}}
						>
							v{version}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

addons.register(ADDON_ID, () => {
	addons.add(TOOL_ID, {
		type: types.TOOL,
		title: "Version Switcher",
		match: ({ viewMode, tabId }) => !tabId && viewMode === "story",
		render: () => <VersionSwitcher />,
	})
})
