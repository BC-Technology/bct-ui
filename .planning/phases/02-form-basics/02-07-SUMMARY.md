---
phase: 02-form-basics
plan: "07"
subsystem: form-components
tags: [accessibility, bug-fix, gap-closure, switch, text-area, input]
dependency_graph:
  requires: [02-06]
  provides: [switch-accessible-label, textarea-initial-charcount, input-icon-a11y]
  affects: [switch.tsx, text-area.tsx, input.tsx]
tech_stack:
  added: []
  patterns:
    - BaseField.Root wrapping Switch for LabelableContext population
    - lazy useState initializer for pre-populated form values
    - focus-visible ring on interactive icon spans
key_files:
  created: []
  modified:
    - packages/ui/src/registry/versions/0.5.0/components/switch.tsx
    - packages/ui/src/registry/versions/0.5.0/components/text-area.tsx
    - packages/ui/src/registry/versions/0.5.0/components/input.tsx
decisions:
  - Switch accessible name is wired via BaseField.Root + BaseField.Label (not aria-labelledby) to follow the same Field composition pattern used by Input and TextArea
  - TextArea lazy initializer reads props.defaultValue ?? props.value from the rest object rather than requiring explicit re-destructuring
  - Input icon focus ring uses focus-visible (not focus) to match keyboard-only UX convention
metrics:
  duration: "~10 minutes"
  completed: "2026-04-22T07:36:23Z"
  tasks_completed: 2
  files_modified: 3
---

# Phase 02 Plan 07: Accessibility Gap Closure (CR-02, WR-01, WR-02) Summary

Three accessibility and UX correctness fixes applied to Switch, TextArea, and Input components.

## What Was Built

**Task 1 — Switch accessible label via BaseField.Root (CR-02)** `fc12391`

Switch was rendering its label as a plain `<span>` outside any `Field.Root`, so `LabelableContext` was never populated and `BaseSwitch.Root` had no accessible name. The entire component body was wrapped in `BaseField.Root` (with `invalid={!!errorText}`), the label `<span>` replaced with `BaseField.Label`, the errorText `<span>` with `BaseField.Error match={true}`, and the description `<span>` with `BaseField.Description`. Screen readers can now announce the switch label correctly.

**Task 2 — TextArea initial char count + Input icon a11y (WR-01, WR-02)** `5d39131`

- **WR-01 (TextArea):** `useState(0)` replaced with a lazy initializer `useState(() => { const initial = props.defaultValue ?? props.value ?? ""; return typeof initial === "string" ? initial.length : 0 })`. Pre-populated forms now show the correct initial character count. `aria-live="polite"` added to the counter span.
- **WR-02 (Input):** `iconLabel?: string` added to `InputProps`. The icon span aria-label now uses `iconLabel ?? "Icon action"` instead of the hardcoded string. Focus-visible ring classes (`rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus`) added to the icon span for keyboard discoverability.

## Commits

| Task | Hash | Message |
|------|------|---------|
| 1 | fc12391 | fix(02-07): wrap Switch in BaseField.Root for accessible label via LabelableContext (CR-02) |
| 2 | 5d39131 | fix(02-07): fix TextArea initial char count and Input icon a11y/focus ring (WR-01, WR-02) |

## Verification

All plan verification checks pass:
- `BaseField.Root` in switch.tsx: 2 matches (opening + closing)
- `BaseField.Label` in switch.tsx: 2 matches
- `match={true}` in switch.tsx: 1 match
- `useState(() =>` in text-area.tsx: 1 match
- `iconLabel` in input.tsx: 3 matches (interface, destructuring, aria-label usage)
- `focus-visible:ring-2` in input.tsx: 1 match
- `pnpm --filter @bctechnology/ui test`: 12/12 tests pass, no regressions

Plan 06 `match={true}` fixes are fully preserved in both input.tsx and text-area.tsx.

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all three fixes are fully implemented with live data sources. No placeholder text, hardcoded empty values, or unconnected props remain.

## Threat Flags

No new security-relevant surface introduced. All three fixes operate on string props rendered as React children or HTML attribute values — React escapes both. Threat register entries T-02-18, T-02-19, T-02-20 remain accepted per plan.
