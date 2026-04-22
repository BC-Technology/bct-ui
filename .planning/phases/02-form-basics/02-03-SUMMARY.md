---
phase: 02-form-basics
plan: "03"
subsystem: packages/ui
tags: [components, form-inputs, switch, toggle, base-ui, forwardRef]
dependency_graph:
  requires: [02-01]
  provides: [switch.tsx, toggle.tsx]
  affects: [registry.json, components.test.ts]
tech_stack:
  added: []
  patterns: [forwardRef-with-displayName, data-attribute-variant-styling, Record-variant-size-maps]
key_files:
  created:
    - packages/ui/src/registry/versions/0.5.0/components/switch.tsx
    - packages/ui/src/registry/versions/0.5.0/components/toggle.tsx
  modified:
    - packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
key_decisions:
  - forwardRef<HTMLElement> for Switch (SwitchRoot renders <span>, not <button> — per Base UI SwitchRoot.d.ts)
  - forwardRef<HTMLButtonElement> for Toggle (Toggle renders <button>)
  - Test assertions use toBeDefined/not.toBeNull for forwardRef components (ForwardRefExoticComponent is object not function)
  - data-pressed modifier classes for Toggle pressed state (no useState needed — Base UI manages state)
  - data-checked modifier classes for Switch checked state (no onChange — onCheckedChange passes through)
metrics:
  duration_minutes: 4
  completed_date: "2026-04-22"
  tasks_completed: 2
  files_changed: 3
requirements:
  - FORM-05
  - FORM-06
---

# Phase 02 Plan 03: Switch and Toggle Summary

Switch and Toggle components implemented as `forwardRef` wrappers around Base UI primitives — Switch animates its thumb via `transition-transform duration-200` using `data-checked:translate-x-5`, Toggle uses `VARIANT_STYLES` / `SIZE_STYLES` Record maps with `data-pressed:` modifier classes matching Button's visual language.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| RED | Add failing tests for switch/toggle exports | 9a355a1 | `__tests__/components.test.ts` |
| Task 1 | Implement switch.tsx (FORM-05) | c85f831 | `components/switch.tsx` |
| Task 2 | Implement toggle.tsx (FORM-06) | 0544382 | `components/toggle.tsx`, `__tests__/components.test.ts` |

## Verification Results

- `pnpm --filter @bctechnology/ui test` — 7 tests passing (5 Phase 1 + switch + toggle)
- `grep "forwardRef<HTMLElement"` returns match in switch.tsx (correct — not HTMLButtonElement)
- `grep "data-checked:translate-x-5"` returns match in switch.tsx
- `grep "data-pressed:bg-primary"` returns match in toggle.tsx (default + outline variants)
- `grep "data-pressed:bg-surface-2"` returns match in toggle.tsx (ghost variant)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed test assertions incompatible with forwardRef components**
- **Found during:** Task 2 GREEN phase — both switch and toggle tests failed with `expected 'object' to be 'function'`
- **Issue:** `forwardRef()` returns a `ForwardRefExoticComponent` (an object), but the test stubs checked `typeof mod.Switch).toBe("function")`. This is correct for `export function` components (Phase 1 pattern) but wrong for `forwardRef` components.
- **Fix:** Updated switch and toggle test assertions to use `toBeDefined()` and `not.toBeNull()` — semantically equivalent but compatible with the ForwardRefExoticComponent shape.
- **Files modified:** `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts`
- **Commit:** 0544382

## Known Stubs

None — both components are fully wired with real Base UI primitives. Switch renders BaseSwitch.Root + BaseSwitch.Thumb; Toggle renders BaseToggle directly. No placeholder data or hardcoded empty values.

## Threat Flags

None — threat model for this plan has 3 accepted threats (T-02-06, T-02-07, T-02-08). All accepted with no mitigations needed:
- Switch hidden input: boolean state, not user-supplied string — no injection risk
- Toggle pressed state: purely visual UI state — no sensitive data
- Switch label: React-escaped string children — no XSS risk

## Self-Check: PASSED

Files created:
- packages/ui/src/registry/versions/0.5.0/components/switch.tsx — FOUND
- packages/ui/src/registry/versions/0.5.0/components/toggle.tsx — FOUND

Commits verified:
- 9a355a1 (RED tests) — FOUND
- c85f831 (switch.tsx) — FOUND
- 0544382 (toggle.tsx + test fix) — FOUND
