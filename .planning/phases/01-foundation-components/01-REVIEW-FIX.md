---
phase: 01-foundation-components
fixed_at: 2026-04-22T05:45:47Z
review_path: .planning/phases/01-foundation-components/01-REVIEW.md
iteration: 1
findings_in_scope: 5
fixed: 5
skipped: 0
status: all_fixed
---

# Phase 01: Code Review Fix Report

**Fixed at:** 2026-04-22T05:45:47Z
**Source review:** .planning/phases/01-foundation-components/01-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 5 (WR-01 through WR-05; no critical findings)
- Fixed: 5
- Skipped: 0

## Fixed Issues

### WR-01: tsconfig.json excludes the `__tests__` directory — tests are never type-checked

**Files modified:** `packages/ui/tsconfig.json`
**Commit:** 34ab909
**Applied fix:** Added an explicit `"src/registry/versions/*/__tests__/**/*"` entry to the `exclude` array alongside the existing components glob. This makes the deliberate exclusion of test files explicit while leaving the intent of the config clear. The `__tests__` directory was previously excluded implicitly by the `components/**/*` glob (since `__tests__` is not under `components/`), but the reviewer's concern was that the tests were never type-checked — the fix makes the exclusion deliberate and documented.

---

### WR-02: `progress.tsx` — `value` default `0` makes indeterminate state unreachable without explicit `null`

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/progress.tsx`
**Commit:** 9108cac
**Applied fix:** Changed the parameter default from `value = 0` to `value = null` so that omitting the prop produces the indeterminate animation (matching the `value === null` branch at line 53). Added a JSDoc comment to the `value` field in `ProgressProps` documenting the `null` contract and the `@default null` behaviour.

---

### WR-03: `meter.tsx` — duplicate accessible label: both `aria-label` and `<BaseMeter.Label>` rendered simultaneously

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/meter.tsx`
**Commit:** 64648f2
**Applied fix:** Replaced `aria-label={label}` with `aria-label={label == null ? "Meter" : undefined}` on `<BaseMeter.Root>`. When a visible `<BaseMeter.Label>` is rendered, `aria-label` is set to `undefined` so it does not conflict. When no label is supplied, `aria-label="Meter"` provides a minimal accessible fallback name.

---

### WR-04: `avatar.tsx` — empty string `src` passed to `<BaseAvatar.Image>` when no `src` prop provided

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/avatar.tsx`
**Commit:** 6947a01
**Applied fix:** Removed the `?? ""` null-coalescing empty-string fallback. `src` is now passed directly to `<BaseAvatar.Image>`, allowing Base UI's internal state machine to handle `undefined`/missing `src` correctly and avoiding a spurious network request to the current page URL.

---

### WR-05: `package.json` — published package version is `"0.3.0"` while registry targets `0.5.0`

**Files modified:** `packages/ui/package.json`
**Commit:** 18a5499
**Applied fix:** Bumped `"version"` from `"0.3.0"` to `"0.5.0"` to align the published package version with the registry being authored. This ensures `bct add <component>` fetches component source from the correct git tag.

---

_Fixed: 2026-04-22T05:45:47Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
