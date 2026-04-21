# Codebase Structure

**Analysis Date:** 2026-04-21

## Root Layout

```
bct-ui/                         # Monorepo root
├── apps/
│   └── docs/                   # Next.js 15 documentation site
├── packages/
│   └── ui/                     # Publishable CLI + registry package
├── .planning/                  # GSD planning documents
├── biome.json                  # Monorepo-wide Biome config
├── package.json                # Root workspace package (build/dev scripts)
├── pnpm-workspace.yaml         # pnpm workspace definition
└── tsconfig.base.json          # Shared TS compiler options
```

## Key Directories

**`packages/ui/src/`** — Core of the publishable `@bctechnology/ui` package:
- `cli.ts` — CLI entry point, `bin.bct`
- `index.ts` — Package main export (BCT_UI_VERSION, registry types)
- `commands/` — CLI command implementations: `add.ts`, `init.ts`, `doctor.ts`
- `lib/` — CLI utilities: `args.ts`, `cache.ts`, `cli-ui.ts`, `fetcher.ts`, `package-root.ts`, `ui-version.ts`
- `registry/registry.ts` — `loadRegistry(version)` function and `RegistryEntry` type
- `registry/versions/` — Versioned component snapshots (see below)
- `assets/tokens/index.css` — Design-system CSS token file, copied into consumer projects by `bct init`

**`packages/ui/src/registry/versions/<semver>/`** — One directory per released version:
- `components/` — All component `.tsx` files for that version
- `registry.json` — Manifest mapping component names to metadata (title, category, files, deps, registryDeps)

Current versions: `0.2.0`, `0.3.0`, `0.4.0`

**`apps/docs/app/`** — Next.js App Router pages:
- `layout.tsx` — Root layout with `ThemeProvider`
- `page.tsx` — Marketing landing page
- `components/[version]/page.tsx` — Component catalogue index (static params from VALID_VERSIONS)
- `components/[version]/[component]/page.tsx` — Individual component detail page
- `getting-started/page.tsx` — Getting started docs
- `design-system/page.tsx` — Design system docs
- `contributing/page.tsx` — Contributing guide
- `changelog/page.tsx` — Changelog
- `globals.css` — Global styles with Tailwind v4 import

**`apps/docs/components/`** — Docs site React components:
- `layout/` — `header.tsx`, `sidebar.tsx`, `docs-layout.tsx`, `mobile-nav.tsx`
- `docs/` — `component-preview.tsx` (Preview/Code/Source tabs), `code-block.tsx` (Shiki syntax highlighting)
- `providers/` — `theme-provider.tsx` (next-themes)
- `ui/` — `theme-toggle.tsx`, `version-switcher.tsx`

**`apps/docs/lib/`** — Server-side data access:
- `registry.ts` — Reads `registry.json` from filesystem, exposes `getRegistry()`, `getComponent()`, `getAllComponents()`, `getComponentsByCategory()`, `getComponentSource()`, `componentExistsInVersion()`
- `categories.ts` — `CATEGORY_META` ordering/label map and `RegistryEntry` type
- `versions.ts` — `VALID_VERSIONS`, `DEFAULT_VERSION`, `isValidVersion()`, `getNewInVersion()`

**`apps/docs/previews/`** — Live preview modules for the docs site:
- `registry.ts` — `PREVIEW_REGISTRY`: nested `Record<version, Record<componentName, () => Promise<module>>>` with static dynamic imports for Next.js bundling
- `types.ts` — `VariantPreview` interface (`name`, `description`, `code`, `render`)
- `<version>/<component>.tsx` — One file per component per version, exports `variants: VariantPreview[]`

**`apps/docs/scripts/`** — Tooling:
- `add-component.ts` — Scaffolds preview wrapper files and updates `previews/registry.ts`. Run via `pnpm docs:add-component -- --component <name> --version <version>`

## Key Files

**Entry Points:**
- `packages/ui/src/cli.ts` — `bct` CLI entry, dispatches to `add`/`init`/`doctor`
- `packages/ui/src/index.ts` — Package public API (exports `BCT_UI_VERSION`, `registry`, `RegistryEntry`)
- `apps/docs/app/layout.tsx` — Next.js root layout
- `apps/docs/app/page.tsx` — Landing page

**Configuration:**
- `packages/ui/package.json` — npm package config, `exports`, `bin`, `files`, `prepublishOnly`
- `apps/docs/next.config.ts` — Next.js config (`transpilePackages: ["@bctechnology/ui"]`)
- `apps/docs/tsconfig.json` — extends `tsconfig.base.json`, adds `@/*` path alias resolving to `apps/docs/*`
- `biome.json` (root) — Biome lint/format config for the whole monorepo

**Registry Data:**
- `packages/ui/src/registry/versions/0.4.0/registry.json` — Current version manifest (authoritative source)
- `apps/docs/lib/registry.ts` — Runtime reader used by docs pages
- `apps/docs/previews/registry.ts` — Static import map for docs preview loader

**Design Tokens:**
- `packages/ui/src/assets/tokens/index.css` — CSS custom properties for the design system (copied into consumer projects)

## Naming Conventions

**Files:**
- Component files: `kebab-case.tsx` (e.g., `date-range-picker.tsx`, `file-upload-input.tsx`)
- Utility/lib files: `kebab-case.ts` (e.g., `ui-version.ts`, `package-root.ts`)
- Page files: Next.js convention `page.tsx`, `layout.tsx`

**Exports from component files:**
- Named function export: `export function Button(...)` — matches PascalCase of the component
- Props interface: `export interface ButtonProps extends ...` — always `<ComponentName>Props`

**Registry keys:**
- Lowercase kebab-case matching the component filename without `.tsx` (e.g., `"button"`, `"date-range-picker"`, `"file-upload-input"`)

**Directories:**
- Version directories: semver string (e.g., `0.4.0`)
- Category keys: lowercase kebab-case matching `CATEGORY_META` keys (`form-inputs`, `feedback`, `display`, `navigation`, `layout`, `advanced`)

## Where to Add New Code

**New component (in existing version):**
- Implementation: `packages/ui/src/registry/versions/<version>/components/<name>.tsx`
- Registry entry: add to `packages/ui/src/registry/versions/<version>/registry.json`
- Preview scaffold: run `pnpm docs:add-component -- --component <name> --version <version>`
- Preview file (edit after scaffold): `apps/docs/previews/<version>/<name>.tsx`

**New component (new version — full version snapshot):**
- Create directory: `packages/ui/src/registry/versions/<new-version>/components/`
- Copy all existing components from previous version, add new ones
- Create `packages/ui/src/registry/versions/<new-version>/registry.json`
- Add version to `apps/docs/lib/versions.ts` `VALID_VERSIONS` array and update `DEFAULT_VERSION`
- Create preview directory `apps/docs/previews/<new-version>/` and add version block to `apps/docs/previews/registry.ts`
- Scaffold previews: `pnpm docs:add-component -- --all --version <new-version>`

**New docs page:**
- Add `apps/docs/app/<slug>/page.tsx`
- Add link to `DOC_LINKS` array in `apps/docs/components/layout/sidebar.tsx`

**New CLI utility:**
- Add to `packages/ui/src/lib/<name>.ts`
- Import in relevant command file under `packages/ui/src/commands/`

**New CLI command:**
- Add `packages/ui/src/commands/<name>.ts` with `export async function run<Name>(...)`
- Register in `packages/ui/src/cli.ts` dispatch block

## Special Directories

**`packages/ui/dist/`:**
- Purpose: Built CLI and type declarations, generated by `tsup`
- Generated: Yes
- Committed: No

**`packages/ui/src/assets/`:**
- Purpose: Static assets shipped with the package (currently only `tokens/index.css`)
- Listed in `packages/ui/package.json` `files` array so it is included in the npm publish

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents
- Generated: Yes (by GSD mapper)
- Committed: Yes

**`apps/docs/.next/`:**
- Purpose: Next.js build output
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-04-21*
