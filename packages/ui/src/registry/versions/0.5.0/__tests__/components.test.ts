import { describe, expect, it } from "vitest"

// Wave 0 stubs: verify component files exist and export expected names.
// Full component tests can be authored in Phase 7 (INFRA-05 audit).

describe("0.5.0 component exports", () => {
	it("button.tsx exports Button and ButtonProps", async () => {
		const mod = await import("../components/button")
		expect(typeof mod.Button).toBe("function")
	})

	it("separator.tsx exports Separator and SeparatorProps", async () => {
		const mod = await import("../components/separator")
		expect(typeof mod.Separator).toBe("function")
	})

	it("avatar.tsx exports Avatar and AvatarProps", async () => {
		const mod = await import("../components/avatar")
		expect(typeof mod.Avatar).toBe("function")
	})

	it("progress.tsx exports Progress and ProgressProps", async () => {
		const mod = await import("../components/progress")
		expect(typeof mod.Progress).toBe("function")
	})

	it("meter.tsx exports Meter and MeterProps", async () => {
		const mod = await import("../components/meter")
		expect(typeof mod.Meter).toBe("function")
	})

	it("field.tsx exports Field", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"field"}`)
		expect(typeof mod.Field).toBe("function")
	})

	it("fieldset.tsx exports Fieldset", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"fieldset"}`)
		expect(typeof mod.Fieldset).toBe("function")
	})

	it("form.tsx exports Form", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"form"}`)
		expect(typeof mod.Form).toBe("function")
	})

	it("input.tsx exports Input", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"input"}`)
		expect(typeof mod.Input).toBe("function")
	})

	it("switch.tsx exports Switch", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"switch"}`)
		expect(typeof mod.Switch).toBe("function")
	})

	it("toggle.tsx exports Toggle", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"toggle"}`)
		expect(typeof mod.Toggle).toBe("function")
	})

	it("text-area.tsx exports TextArea", async () => {
		// biome-ignore lint: dynamic import used intentionally for Nyquist stub
		const mod = await import(/* @vite-ignore */ `../components/${"text-area"}`)
		expect(typeof mod.TextArea).toBe("function")
	})
})
