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
	opts?: { retries?: number },
): Promise<string> {
	const retries = opts?.retries ?? 2
	let lastErr: unknown = null

	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const res = await fetch(url, {
				headers: { "user-agent": "bct-ui-cli" },
			})
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
			if (attempt < retries) {
				await sleep(250 * (attempt + 1))
			}
		}
	}

	if (lastErr instanceof Error) throw lastErr
	throw new FetchError("Request failed", url)
}
