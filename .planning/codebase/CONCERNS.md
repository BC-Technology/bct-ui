# Codebase Concerns & Technical Debt

**Analysis Date:** 2026-04-21

---

## High Priority

### Package version out of sync with latest registry folder
- **Files:** `packages/ui/package.json`
- **Issue:** `package.json` declares `"version": "0.3.0"` but the active registry folder being worked on is `packages/ui/src/registry/versions/0.4.0/`. The `prepublishOnly` script (`verify-registry-version.mjs`) checks that a registry folder matching the package version exists — so publishing will look for `0.3.0/` (which does exist), meaning `0.4.0` changes would never be published under the correct version.
- **Impact:** CLI consumers running `bct add <component>` would fetch component files from the GitHub tag for whichever version is installed. If the package is published as `0.3.0`, the `0.4.0` folder and its updated components are invisible to end-users.
- **Fix:** Bump `packages/ui/package.json` version to `0.4.0` before publishing.

### Missing `registryDeps` in several components that import sibling components
- **Files:** `packages/ui/src/registry/versions/0.4.0/registry.json`
- **Issue:** Several components import siblings via relative paths but their registry entries omit `registryDeps`, so `bct add` will not automatically install the dependent component alongside them:
  - `header` imports `Avatar` from `./avatar` and types from `./sidebar` — no `registryDeps`
  - `sidebar` imports `Avatar` from `./avatar` — no `registryDeps`
  - `image-preview-dialog` imports `Dialog` from `./dialog` — no `registryDeps`
  - `file-details-dialog` lists `["file-icon"]` but also imports `Dialog` and `Spinner` — those two are missing from `registryDeps`
- **Impact:** Users who `bct add header` or `bct add sidebar` will get broken component files that import modules they do not have. Same for `image-preview-dialog`.
- **Fix:** Add the missing entries to each component's `registryDeps` array in the registry JSON.

### `require()` inside an ESM module in CLI init command
- **File:** `packages/ui/src/commands/init.ts` line 56
- **Issue:** `const { spawnSync } = require("node:child_process")` is a CommonJS `require` call inside a file that is part of an ESM package (`"type": "module"` in `package.json`). This works at runtime only because tsup transpiles it during build, but it is semantically wrong and may break depending on the bundler or Node.js version.
- **Impact:** Could cause `ReferenceError: require is not defined` in strict ESM contexts or if the build pipeline changes.
- **Fix:** Replace with `import { spawnSync } from "node:child_process"` at the top of the file.

---

## Medium Priority

### Double-prefix animation class naming (`animate-animate-*`)
- **Files:** `apps/docs/app/globals.css`, multiple components in `packages/ui/src/registry/versions/0.3.0/components/` and `0.4.0/`
- **Issue:** Tailwind CSS v4 maps the utility class `animate-foo` to CSS variable `--animate-foo`. Components use class names like `data-open:animate-animate-fade-in`, which requires a matching `--animate-animate-fade-in` token. The docs `globals.css` works around this by re-declaring all animations with the double-prefix form. This is not documented in any of the component files and would confuse anyone trying to use BCT UI outside the docs app without knowing to add the bridge aliases.
- **Impact:** Components will have no open/close animations in any consumer app that imports the token file directly without the workaround aliases. This includes all Base UI dialog, popover, tooltip, and dropdown animations.
- **Fix options:**
  - Rename class usages from `animate-animate-*` to `animate-*` to match the existing token names, OR
  - Rename tokens in `index.css` from `--animate-*` to `--animate-animate-*` for consistency.
  - Either way: document the workaround or eliminate the need for it.

### `@base-ui/react` missing from `deps` in several registry entries that use it
- **Files:** `packages/ui/src/registry/versions/0.4.0/registry.json`
- **Issue:** `sidebar` and `header` both import `@base-ui/react/popover` at the top of their source files, but their registry `deps` arrays do not include `@base-ui/react`. Same applies to `image-preview-dialog` (uses `Dialog` which wraps Base UI). The CLI `add` command installs only the `deps` listed in the registry; consumers will get build errors if `@base-ui/react` is not already installed.
- **Affected components:** `header`, `sidebar`, `image-preview-dialog`, `file-upload-input` (transitively through `image-preview-dialog`).
- **Fix:** Add `"@base-ui/react"` to the `deps` array for `header` and `sidebar` in `registry.json`.

### Hard-coded relative paths in preview imports
- **Files:** All files under `apps/docs/previews/0.2.0/`, `0.3.0/`, `0.4.0/`
- **Issue:** Preview files import components via four-level relative paths, e.g. `../../../../packages/ui/src/registry/versions/0.4.0/components/button`. If the monorepo directory layout changes, every single preview file will need manual path updates. There is no path alias (`@bctechnology/ui` or similar) used inside the preview files.
- **Impact:** Fragile coupling between docs and packages. Currently not breaking, but risky during refactors.
- **Fix:** Consider importing from the package name (`@bctechnology/ui`) or a workspace path alias instead.

### `bct doctor` command is extremely minimal
- **File:** `packages/ui/src/commands/doctor.ts`
- **Issue:** The doctor command only checks for the presence and non-emptiness of `src/index.css` (the tokens file). It does not verify: presence of required npm dependencies, Tailwind CSS configuration, animation bridge aliases, component file integrity, or compatibility with the installed version. Most real setup problems would not be detected.
- **Impact:** Users who have an incomplete setup get a misleading "OK" message.
- **Fix:** Expand checks to verify at minimum: `@base-ui/react` in `package.json`, `tailwindcss` installed, and the animation aliases present in the CSS file.

---

## Low Priority / Nice to Have

### `clsx` and `twMerge` used together but with inconsistent merge ordering
- **Files:** Multiple components in `packages/ui/src/registry/versions/0.4.0/components/`
- **Issue:** Some components wrap `clsx(...)` inside `twMerge(...)` (e.g. `header.tsx`, `popover.tsx`, `select.tsx`), others pass `clsx(...)` result directly without `twMerge`, and the `dialog.tsx` (0.4.0) only uses `twMerge` without `clsx`. This inconsistency makes it harder to understand which utility is responsible for what. The two utilities serve different purposes (`clsx` for conditional class assembly, `twMerge` for conflict resolution), and the pattern for using them together varies per file.
- **Fix:** Adopt a consistent pattern across all components. The recommended pattern is `twMerge(clsx(...))`.

### `NEW_IN_030` list in `versions.ts` is a hard-coded maintenance burden
- **File:** `apps/docs/lib/versions.ts`
- **Issue:** A static array `NEW_IN_030` lists components added in v0.3.0. There is no equivalent for v0.4.0. This "new in version" feature will require manual maintenance every time a new version is introduced, and any omissions or additions would silently show incorrect version labels in the docs.
- **Fix:** Derive the "new in version" information by diffing registry keys between versions at runtime, rather than maintaining a static list.

### Preview files use raw `<input>` and inline form elements without BCT components
- **Files:** `apps/docs/previews/0.4.0/dialog.tsx` and similar preview files
- **Issue:** Dialog and other previews contain inline `<input>` elements with manually written Tailwind classes instead of using the `TextInput` BCT component. This means the docs demonstrate an inconsistent style and don't show best-practice usage of the library in context.
- **Fix:** Replace raw HTML form elements in previews with the actual BCT input components.

### `portal` component has no `registryDeps` and no npm `deps`
- **File:** `packages/ui/src/registry/versions/0.4.0/registry.json`
- **Issue:** `portal`'s registry entry lists an empty `deps: []`. Looking at the component, it is a thin wrapper that presumably renders children into a DOM portal. If it depends on `@base-ui/react` or React itself in a non-trivial way, this might be fine, but it should at minimum be verified that the component works standalone without additional deps.

### `getNewInVersion` always returns `null` for anything not in `NEW_IN_030`
- **File:** `apps/docs/lib/versions.ts`
- **Issue:** `getNewInVersion` is declared but the logic only handles components in `NEW_IN_030`. Components added in v0.4.0 (e.g. there may be none, since the component lists across 0.3.0 and 0.4.0 appear identical) would silently return `null`.

---

## Missing Coverage

### Zero automated tests
- There are no test files anywhere in the repository (no `*.test.ts`, `*.spec.ts`, `*.test.tsx`, or `*.spec.tsx` files found outside `node_modules`). No `jest.config.*`, `vitest.config.*`, or equivalent test runner config exists.
- **Risk areas without testing:**
  - CLI commands `init`, `add`, `doctor` — these make filesystem mutations and shell invocations. Regressions are not caught.
  - Registry integrity — no automated check that every component in `registry.json` has a corresponding `.tsx` file, or that `registryDeps` are valid keys in the same registry.
  - Token CSS completeness — no check that all design tokens referenced in components actually exist in `index.css`.
- **Fix:** Add at minimum integration tests for the CLI `add` command, and a registry validation script run as part of CI.

### No CI/CD pipeline configuration found
- No `.github/workflows/`, `.circleci/`, or equivalent CI config files are present in the repository.
- **Risk:** Broken builds, type errors, and registry inconsistencies are not caught automatically before merging or publishing.

### Docs previews for some components missing in v0.4.0
- The 0.4.0 preview registry in `apps/docs/previews/registry.ts` references `./0.4.0/breadcrumbs`, `./0.4.0/divider`, `./0.4.0/radio`, `./0.4.0/rich-text-input`, `./0.4.0/select`, `./0.4.0/tabs`, `./0.4.0/text-area`, `./0.4.0/file-upload`, and `./0.4.0/header` — these files exist now. However, the preview for `dialog` in 0.4.0 was only recently added (it appears in the git diff as a new file). Other previews may be incomplete or thin (single-variant only).

---

## Observations

### `init.ts` always hard-codes `pnpm add` for component dependency installation in `add.ts`
- **File:** `packages/ui/src/commands/add.ts` line 107
- The `add` command always uses `pnpm` to install missing dependencies, regardless of the project's package manager. By contrast, `init.ts` has a `detectPackageManager()` function for this purpose. The two commands are inconsistent — `add` should call the same detection logic.

### Dialog component `0.4.0` uses custom CSS classes for animations instead of Tailwind utilities
- **File:** `packages/ui/src/registry/versions/0.4.0/components/dialog.tsx`
- The refactored 0.4.0 dialog now uses custom CSS classes (`bct-dialog-backdrop`, `bct-dialog-modal`, `bct-dialog-panel-right`, `bct-dialog-panel-left`) defined in `index.css`, while other components (popover, tooltip, etc.) still use `data-open:animate-animate-*` Tailwind utilities. This inconsistency means animation behavior and maintenance paths differ across similar overlay components.

### `tokens/index.css` self-referencing token declarations are a no-op in the `@theme` block
- **File:** `packages/ui/src/assets/tokens/index.css` lines 18–61
- Declarations like `--color-primary: var(--color-primary)` inside `@theme {}` are circular and will resolve to empty/initial. This is intentional as a "slot" pattern (consumers override via `[data-theme]` in `@layer base`), but it is unusual and could confuse contributors or static analysis tools. It is not documented inline beyond the section comments.

### `pnpm-store` is checked into the repository
- **Path:** `.pnpm-store/v3/`
- The local pnpm content-addressable store directory is inside the project root and not excluded from source control (not confirmed gitignored — the root `.gitignore` was not checked, but the directory shows up in filesystem traversal). If committed, this would add significant binary data to git history.
- **Fix:** Verify `.gitignore` includes `.pnpm-store/` and configure pnpm to store outside the project (`store-dir` in `.npmrc`).

---

*Concerns audit: 2026-04-21*
