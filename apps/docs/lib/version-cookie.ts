import "server-only"
import { cookies } from "next/headers"

const VERSION_COOKIE_NAME = "bct-ui-version"
const DEFAULT_VERSION = "0.4.0"

export async function getPreferredVersion(): Promise<string> {
	const cookieStore = await cookies()
	return cookieStore.get(VERSION_COOKIE_NAME)?.value || DEFAULT_VERSION
}
