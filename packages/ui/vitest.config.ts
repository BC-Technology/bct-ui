import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		environment: "jsdom",
		include: [
			"src/registry/versions/0.5.0/__tests__/**/*.test.ts",
			"src/registry/versions/0.5.0/__tests__/**/*.test.tsx",
		],
		globals: true,
	},
})
