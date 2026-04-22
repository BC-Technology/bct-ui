---
phase: 02-form-basics
fixed_at: 2026-04-22T00:00:00Z
review_path: .planning/phases/02-form-basics/02-REVIEW.md
fix_scope: critical_warning
findings_in_scope: 4
fixed: 4
skipped: 0
iteration: 1
status: all_fixed
---

# Phase 02: Code Review Fix Report

**Fixed at:** 2026-04-22T00:00:00Z
**Source review:** .planning/phases/02-form-basics/02-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 4
- Fixed: 4
- Skipped: 0

## Fixed Issues

### CR-01: `Meter.Label` rendered outside `Meter.Root` — context error at runtime

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/meter.tsx`
**Commit:** 49ff37c
**Applied fix:** Moved `BaseMeter.Label` from its position as a sibling above `BaseMeter.Root` to inside `BaseMeter.Root` (before the `BaseMeter.Track`). Also removed the redundant `aria-label={label}` prop from `BaseMeter.Root` — Base UI now wires `aria-labelledby` automatically once the label is inside the root. The outer `<div className="flex flex-col gap-1">` wrapper and the `classNames?.label` override were preserved.

### WR-01: `TextArea` char-count does not track controlled `value` prop changes

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/text-area.tsx`
**Commit:** dd7e500
**Applied fix:** Added `isControlled` check (`props.value !== undefined`) and derived `displayCount` from `props.value.length` when controlled, falling back to internal `charCount` state for uncontrolled usage. Replaced both `charCount` references in the char-count `<span>` with `displayCount`. The internal `charCount` state and `handleChange` are retained unchanged for the uncontrolled path.

### WR-02: `Input` manual `aria-describedby` overwrites Base UI's auto-wired value

**Files modified:** `packages/ui/src/registry/versions/0.5.0/components/input.tsx`
**Commit:** baa44af
**Applied fix:** Removed `aria-invalid={!!errorText || undefined}` and `aria-describedby={errorText ? errorId : helperText ? helperId : undefined}` from the `BaseInput` JSX spread. `Field.Root invalid={!!errorText}` already drives `aria-invalid` through `Field.Control`'s `getValidationProps`, and `Field.Error`/`Field.Description` register their IDs via `setMessageIds` which Base UI wires into `aria-describedby` automatically. The explicit `id` props on `Field.Error` and `Field.Description` were left intact.

### WR-03: `package.json` version is `0.3.0` but all registry paths target `0.5.0`

**Files modified:** `packages/ui/package.json`
**Commit:** 800475f
**Applied fix:** Updated `"version"` field from `"0.3.0"` to `"0.5.0"` so the published npm tag matches the registry path at `src/registry/versions/0.5.0/` and the `prepublishOnly` version verification script will pass.

---

_Fixed: 2026-04-22T00:00:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
