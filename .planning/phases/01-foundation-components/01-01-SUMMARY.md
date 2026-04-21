---
phase: 01-foundation-components
plan: "01"
subsystem: registry-scaffold
tags: [registry, css-animation, vitest, testing, scaffold]
dependency_graph:
  requires: []
  provides:
    - packages/ui/src/registry/versions/0.5.0/registry.json
    - packages/ui/src/registry/versions/0.5.0/components/
    - progress-indeterminate animation class in index.css
    - vitest configuration for packages/ui
    - Wave 0 test stubs (5 failing tests)
  affects:
    - packages/ui/src/assets/tokens/index.css
    - packages/ui/package.json
    - packages/ui/tsconfig.json
tech_stack:
  added:
    - vitest ^4.1.5
    - "@testing-library/react ^16.3.2"
    - "@testing-library/jest-dom ^6.9.1"
    - "@vitejs/plugin-react ^6.0.1"
    - jsdom ^29.0.2
  patterns:
    - Wave 0 stub tests (import-and-check-typeof pattern)
    - bct-* CSS animation class naming convention
key_files:
  created:
    - packages/ui/src/registry/versions/0.5.0/registry.json
    - packages/ui/src/registry/versions/0.5.0/components/.gitkeep
    - packages/ui/vitest.config.ts
    - packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
  modified:
    - packages/ui/src/assets/tokens/index.css
    - packages/ui/package.json
    - packages/ui/tsconfig.json
decisions:
  - "Progress indeterminate CSS class: .bct-progress-indeterminate[data-indeterminate] — indicator element gets the class, Base UI adds data-indeterminate attribute when value=null"
  - "tsconfig.json exclude changed from src/registry/**/* to src/registry/versions/*/components/**/* — allows __tests__ directory to be included in tsc compilation"
  - "Test stubs use dynamic import() and typeof check — avoids need for React render setup at this stage"
metrics:
  duration_minutes: 25
  completed_date: "2026-04-21"
  tasks_completed: 3
  tasks_total: 3
  files_created: 4
  files_modified: 3
---

# Phase 1 Plan 1: Registry Scaffold + CSS Animation + Vitest Setup Summary

**One-liner:** 0.5.0 registry scaffold with 5-entry registry.json, Progress indeterminate keyframe animation in index.css, and vitest configured with Wave 0 failing test stubs.

---

## What Was Accomplished

### Task 1: 0.5.0 Registry Directory Structure and registry.json (commit: 0dcf6f3)

Created the `packages/ui/src/registry/versions/0.5.0/` directory structure with:
- `components/.gitkeep` — placeholder to track the empty components directory in git
- `registry.json` — flat JSON object with exactly 5 entries following the 0.4.0 format

Registry entries authored:
| Component | Category | Lucide dep |
|-----------|----------|------------|
| button | form-inputs | no |
| separator | display | no |
| avatar | display | yes (lucide-react) |
| progress | feedback | no |
| meter | feedback | no |

All 5 entries have `"registryDeps": []` and `"files": [{ "src": "components/{slug}.tsx", "dst": "{slug}.tsx" }]`.

### Task 2: Progress Indeterminate Animation (commit: 52ff0a4)

Appended to the end of `packages/ui/src/assets/tokens/index.css`:

```css
@keyframes progress-indeterminate {
  0% { transform: translateX(-150%); }
  100% { transform: translateX(400%); }
}

.bct-progress-indeterminate[data-indeterminate] {
  animation: progress-indeterminate 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  width: 35%;
}
```

The selector targets the Progress Indicator element directly — the component (Plan 03) applies class `bct-progress-indeterminate` to the Indicator, and Base UI adds `[data-indeterminate]` when `value === null`. The `width: 35%` is set in CSS (not inline style) because Base UI returns an empty style object `{}` when indeterminate, meaning CSS classes can supply the width.

### Task 3: Vitest Setup and Test Stubs (commit: 186af10)

- Installed `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@vitejs/plugin-react` as devDeps
- Added `"test": "vitest run"` and `"test:watch": "vitest"` scripts to `packages/ui/package.json`
- Created `packages/ui/vitest.config.ts` with jsdom environment, includes `0.5.0/__tests__/` glob
- Updated `packages/ui/tsconfig.json` exclude from `src/registry/**/*` to `src/registry/versions/*/components/**/*` — this makes `__tests__/` directories visible to tsc while still excluding distributed component source
- Created `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` with 5 stub tests

Test status: **5 tests FAILING** — intentional. The component files do not yet exist. These stubs are the Wave 0 red baseline per 01-VALIDATION.md.

---

## Deviations from Plan

None — plan executed exactly as written.

Minor notes (not deviations):
- `@vitejs/plugin-react 6.0.1` has a peer dependency warning (`requires vite@^8.0.0`, found 6.4.1). This does not affect vitest functionality; the plugin is not used in the vitest config. Pre-existing project vitest setup can use `@vitejs/plugin-react` at a lower version or remove it — the test stubs in this plan do not use React rendering so this is non-blocking.
- Biome check on the `index.css` file reports a pre-existing formatting error (line-length wrapping of CSS animation variables added in Phase 0, lines 225-230). This error existed before this plan and is not caused by the appended Progress animation block. Out of scope per deviation rules.

---

## Known Stubs

The test stubs at `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` are intentional failing stubs. They will become green when Plans 02 and 03 create the component files. No component data is stubbed — the tests simply verify file existence and named exports.

---

## Threat Flags

None. All files created in this plan are static configuration and CSS. No new network endpoints, auth paths, file access patterns, or schema changes were introduced.

---

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| packages/ui/src/registry/versions/0.5.0/registry.json | FOUND |
| packages/ui/src/registry/versions/0.5.0/components/.gitkeep | FOUND |
| packages/ui/vitest.config.ts | FOUND |
| packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts | FOUND |
| packages/ui/src/assets/tokens/index.css (modified) | FOUND |
| packages/ui/package.json (modified) | FOUND |
| packages/ui/tsconfig.json (modified) | FOUND |
| Commit 0dcf6f3 (registry scaffold) | FOUND |
| Commit 52ff0a4 (CSS animation) | FOUND |
| Commit 186af10 (vitest setup) | FOUND |
