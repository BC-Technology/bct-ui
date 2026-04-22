---
phase: 02-form-basics
plan: 06
subsystem: form-components
tags: [bug-fix, field, input, text-area, registry]
dependency_graph:
  requires: [02-05]
  provides: [working-error-display-field, working-error-display-input, working-error-display-text-area]
  affects: [field.tsx, input.tsx, text-area.tsx, registry.json]
tech_stack:
  added: []
  patterns: [match={true} on Base UI Field.Error to bypass ValidityState check]
key_files:
  modified:
    - packages/ui/src/registry/versions/0.5.0/components/field.tsx
    - packages/ui/src/registry/versions/0.5.0/components/input.tsx
    - packages/ui/src/registry/versions/0.5.0/components/text-area.tsx
    - packages/ui/src/registry/versions/0.5.0/registry.json
  created: []
decisions:
  - "match={true} on Field.Error/BaseField.Error bypasses ValidityState check so errorText renders without HTML5 constraints"
  - "input.tsx icon prop is React.ReactNode — no lucide-react import in component; dep removed from registry"
metrics:
  duration: ~3 minutes
  completed: "2026-04-22T07:32:15Z"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 4
requirements:
  - FORM-01
  - FORM-04
---

# Phase 02 Plan 06: Field.Error match prop and registry dep fix Summary

**One-liner:** Added `match={true}` to `BaseField.Error`/`Field.Error` in three form components so `errorText` renders correctly; removed erroneous `lucide-react` dep from input registry entry.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add match={true} to Field.Error in field.tsx, input.tsx, text-area.tsx | f2ca770 | field.tsx, input.tsx, text-area.tsx |
| 2 | Remove lucide-react from input registry entry | 87c8862 | registry.json |

## What Was Built

### Task 1: match={true} fix

Base UI's `Field.Error` (and `BaseField.Error`) only renders when `validityData.state.valid === false`. Setting `invalid={!!errorText}` on `Field.Root` changes visual invalid state but does NOT flip `validityData.state.valid` from `null` to `false` — that only happens via native HTML5 constraint validation (`required`, `pattern`, etc.).

The fix: `match={true}` instructs Base UI to always render the error element when the parent `Field.Root` is in the `invalid` state, bypassing the `ValidityState` check entirely.

Three surgical changes — one `match={true}` prop addition per file:
- `field.tsx` line 56: `<BaseField.Error match={true} ...>`
- `input.tsx` line 139: `<Field.Error id={errorId} match={true} ...>`
- `text-area.tsx` line 131: `<Field.Error id={errorId} match={true} ...>`

### Task 2: registry.json input deps

`input.tsx` accepts `icon?: React.ReactNode` — consumers instantiate their own icon JSX. The component has no `import ... from "lucide-react"`. The previous registry entry incorrectly listed `lucide-react` as a dep, causing unnecessary installation for consumers who don't need it.

Changed `input` deps from:
```json
["@base-ui/react", "clsx", "lucide-react", "tailwind-merge"]
```
to:
```json
["@base-ui/react", "clsx", "tailwind-merge"]
```

## Verification Results

All acceptance criteria passed:

```
packages/ui/src/registry/versions/0.5.0/components/field.tsx:1
packages/ui/src/registry/versions/0.5.0/components/input.tsx:1
packages/ui/src/registry/versions/0.5.0/components/text-area.tsx:1
```

```
lucide-react in input deps: false
input deps: @base-ui/react,clsx,tailwind-merge
entry count: 12
lucide-react in avatar deps: true
```

Tests: 12/12 passed (both before and after registry change).

## Decisions Made

- `match={true}` is the correct Base UI API to render Field.Error unconditionally when `invalid={true}` is set on the parent Field.Root — no other approach is needed
- The `icon` prop pattern (`React.ReactNode`) means input.tsx never imports lucide-react directly; the dep was always incorrect

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — changes are static prop additions and a dep array removal. No new network endpoints, auth paths, or schema changes introduced.

## Self-Check: PASSED

- field.tsx modified: FOUND
- input.tsx modified: FOUND
- text-area.tsx modified: FOUND
- registry.json modified: FOUND
- Commit f2ca770: FOUND
- Commit 87c8862: FOUND
