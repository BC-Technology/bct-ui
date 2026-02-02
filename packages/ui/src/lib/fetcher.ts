export class FetchError extends Error {
	constructor(
		message: string,
		public readonly url: string,
		public readonly status?: number,
	) {
		super(message)
	}
}

async function sleep(ms: number) {
	await new Promise((r) => setTimeout(r, ms))
}

export async function fetchText(
	url: string,
	opts?: { retries?: number; timeoutMs?: number },
): Promise<string> {
	const retries = opts?.retries ?? 2
	const timeoutMs = opts?.timeoutMs ?? 15_000
	let lastErr: unknown = null

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const controller = new AbortController()
			const timeout = setTimeout(() => controller.abort(), timeoutMs)
			const res = await (async () => {
				try {
					return await fetch(url, {
						headers: { "user-agent": "bct-ui-cli" },
						signal: controller.signal,
					})
				} finally {
					clearTimeout(timeout)
				}
			})()
			if (!res.ok) {
				throw new FetchError(
					`Request failed (${res.status} ${res.statusText})`,
					url,
					res.status,
				)
			}
			return await res.text()
		} catch (e) {
			lastErr = e
			const msg =
				e instanceof Error ? e.message : typeof e === "string" ? e : ""
			// If the request was aborted (timeout), surface a clearer error.
			if (
				msg.toLowerCase().includes("aborted") ||
				msg.toLowerCase().includes("abort")
			) {
				lastErr = new FetchError(`Request timed out after ${timeoutMs}ms`, url)
			}
			if (attempt < retries) {
				await sleep(250 * (attempt + 1))
			}
		}
	}

	if (lastErr instanceof Error) throw lastErr
	throw new FetchError("Request failed", url)
}
