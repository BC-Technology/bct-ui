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

	it("switch.tsx exports Switch", async () => {
		const mod = await import(/* @vite-ignore */ "../components/switch")
		// forwardRef returns an object (ForwardRefExoticComponent), not a plain function
		expect(mod.Switch).toBeDefined()
		expect(mod.Switch).not.toBeNull()
	})

	it("toggle.tsx exports Toggle", async () => {
		const mod = await import(/* @vite-ignore */ "../components/toggle")
		// forwardRef returns an object (ForwardRefExoticComponent), not a plain function
		expect(mod.Toggle).toBeDefined()
		expect(mod.Toggle).not.toBeNull()
	})
})
