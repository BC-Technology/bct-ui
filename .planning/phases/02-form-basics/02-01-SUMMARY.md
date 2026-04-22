---
phase: 02-form-basics
plan: 01
subsystem: test-infrastructure
tags: [testing, nyquist, vitest, stubs, wave-0]
dependency_graph:
  requires: []
  provides: [FORM-01-stub, FORM-02-stub, FORM-03-stub, FORM-04-stub, FORM-05-stub, FORM-06-stub, FORM-07-stub]
  affects: [packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts]
tech_stack:
  added: []
  patterns: [vite-ignore template literal dynamic import, Nyquist stub pattern]
key_files:
  created: []
  modified:
    - packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
decisions:
  - "Used template literal `../components/${name}` + /* @vite-ignore */ to bypass Vite 6 static import analysis for non-existent stubs — literal string dynamic imports in Vite 6 are resolved at transform time regardless of @vite-ignore"
metrics:
  duration_seconds: 297
  completed_date: "2026-04-22"
  tasks_completed: 1
  tasks_total: 1
  files_modified: 1
requirements:
  - FORM-01
  - FORM-02
  - FORM-03
  - FORM-04
  - FORM-05
  - FORM-06
  - FORM-07
---

# Phase 02 Plan 01: Nyquist Test Stubs Summary

**One-liner:** 7 Phase 2 export stubs added to components.test.ts using template literal dynamic imports to bypass Vite 6 static resolution of non-existent component paths.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add 7 Phase 2 export stubs to components.test.ts | 9e77217 | packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts |

## Verification Results

- `grep -c "it("` → 12 (5 Phase 1 + 7 Phase 2)
- `grep "mod.TextArea"` → match found
- `grep "mod.Button"`, `mod.Separator`, `mod.Avatar`, `mod.Progress`, `mod.Meter` → all present (Phase 1 unchanged)
- Test run: 5 passing (Phase 1), 7 failing with "Cannot find module" (Phase 2 — expected until Wave 1 components ship)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Vite 6 static import analysis blocks literal-string dynamic imports to non-existent files**

- **Found during:** Task 1 verification
- **Issue:** Vite 6's `vite:import-analysis` plugin resolves ALL dynamic imports with literal string paths at transform time. For non-existent files, this produces a hard `this.error()` (transform-time failure) before any test runs, causing the entire test file to fail to load. The `/* @vite-ignore */` comment only suppresses the "dynamic import cannot be analyzed" warning for non-string (template literal) expressions — it does NOT skip resolution for literal strings.
- **Fix:** Rewrote the 7 Phase 2 stubs to use template literal expressions `../components/${"field"}` combined with `/* @vite-ignore */`. Template literals trigger the non-analyzable branch in Vite's import-analysis plugin, where `@vite-ignore` correctly suppresses processing and defers resolution to runtime (per-test failure instead of whole-file failure).
- **Files modified:** packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
- **Commit:** 9e77217

## Known Stubs

The 7 Phase 2 test stubs intentionally reference non-existent component files. These are by design — they are the Nyquist feedback contract. Each stub will turn green when its corresponding component is implemented in Wave 1 (plans 02-02 through 02-05).

| Stub | File | Reason |
|------|------|--------|
| field stub | components.test.ts:32 | component not yet implemented |
| fieldset stub | components.test.ts:37 | component not yet implemented |
| form stub | components.test.ts:42 | component not yet implemented |
| input stub | components.test.ts:47 | component not yet implemented |
| switch stub | components.test.ts:52 | component not yet implemented |
| toggle stub | components.test.ts:57 | component not yet implemented |
| text-area stub | components.test.ts:62 | component not yet implemented |

## Threat Flags

None — test file only, no network endpoints, auth paths, or schema changes introduced.

## Self-Check: PASSED

- [x] `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` — FOUND
- [x] Commit `9e77217` — FOUND (`git log --oneline` confirms)
- [x] 12 `it()` calls — confirmed
- [x] 5 passing / 7 failing test run — confirmed
