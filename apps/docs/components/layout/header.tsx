import { HeaderClient } from "./header-client"
import { VersionSwitcher } from "./version-switcher"

interface HeaderProps {
	currentVersion?: string
}

export function Header({ currentVersion = "0.4.0" }: HeaderProps) {
	return (
		<HeaderClient
			versionSwitcher={<VersionSwitcher currentVersion={currentVersion} />}
		/>
	)
}
