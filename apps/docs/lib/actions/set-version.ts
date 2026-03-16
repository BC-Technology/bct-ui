"use server"

import { cookies } from "next/headers"

const VERSION_COOKIE_NAME = "bct-ui-version"

export async function setPreferredVersion(version: string) {
	const cookieStore = await cookies()
	cookieStore.set(VERSION_COOKIE_NAME, version, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365, // 1 year
		sameSite: "lax",
	})
}
