<!-- GSD:project-start source:PROJECT.md -->
## Project

**bct-ui 0.5.0**

bct-ui is a registry-distributed React component library built on Base UI primitives. Consumers run `bct add <component>` to copy component source into their project. Version 0.5.0 is a comprehensive rewrite that covers all 36 Base UI components as neutral, props-driven wrappers — more complete and adaptable than 0.4.0 while maintaining the same BCT token system and Tailwind-based styling.

**Core Value:** Every Base UI component has a working, styled, props-driven bct-ui wrapper that a developer can drop in and immediately customize without reading Base UI docs.

### Constraints

- **Compatibility**: All 0.5.0 components must work with the existing `index.css` token system — no new token names unless added to index.css
- **Distribution**: Components must be single-file `.tsx` (the registry copies individual files — no multi-file components)
- **Dependencies**: Only `@base-ui/react`, `clsx`, `tailwind-merge`, and `lucide-react` as deps — no new peer deps
- **Styling**: No inline SVG in component source — Lucide only
- **Registry**: Must include `registry.json` entries with correct `deps` and `registryDeps` for all components
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Runtime & Language
- **Node.js** >=20 (enforced via `engines.node` in root `package.json`)
- **TypeScript** ^5.7.3 — used across all packages and apps
- **JavaScript (ESM)** — all packages use `"type": "module"`
## Frameworks
- **Next.js** ^15.3.1 — powers `apps/docs` (the documentation site)
- **React** 18.3.1 — UI rendering for both `apps/docs` and all components in `packages/ui`
- **Vite** — supported as a target framework for consumer projects (CLI `bct init` patches Vite configs via `@tailwindcss/vite`)
## Build & Tooling
- **tsup** ^8.0.1 — bundles `packages/ui` (library build)
- **Biome** ^2.3.12 — unified linter + formatter for the entire monorepo
- **tsx** ^4.19.2 — runs TypeScript scripts directly (used for `scripts/add-component.ts` in docs)
## Package Management
- **pnpm** 9.15.0 (locked via `packageManager` field)
- **Lockfile:** `pnpm-lock.yaml` present
- **Workspace layout** (`pnpm-workspace.yaml`):
## Styling
- **Tailwind CSS v4** ^4.1.0
- **CSS custom properties (design tokens)** — all colors, spacing, typography, shadows, z-indices, and animations defined as CSS variables in `packages/ui/src/assets/tokens/index.css`
- **clsx** ^2.1.1 — conditional class composition
- **tailwind-merge** ^2.5.0 — merges Tailwind classes without conflicts (`twMerge`)
## Configuration Files
| File | Purpose |
|------|---------|
| `biome.json` | Linting, formatting, import sorting |
| `tsconfig.base.json` | Shared TypeScript compiler options |
| `apps/docs/tsconfig.json` | Docs-specific TS config (extends base, adds `@/*` path alias) |
| `apps/docs/next.config.ts` | Next.js config (transpilePackages) |
| `apps/docs/postcss.config.mjs` | PostCSS with `@tailwindcss/postcss` |
| `pnpm-workspace.yaml` | pnpm monorepo workspace definition |
| `packages/ui/src/assets/tokens/index.css` | Full design token sheet (colors, type, spacing, motion) |
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## TypeScript Usage
- **Strict mode enabled** via `tsconfig.base.json`: `"strict": true`, `"forceConsistentCasingInFileNames": true`, `"skipLibCheck": true`
- **Target:** ES2022 with `"module": "ESNext"` and `"moduleResolution": "Bundler"`
- **No barrel re-exports** at the component level — each file exports its own named exports directly
- **Type imports use `import type`** for React and interface-only imports: `import type * as React from "react"`
- **Non-null assertion** is used sparingly; Biome's `noExplicitAny` is **off** (any is allowed)
- **Custom types** like `PkgJson`, `ParsedArgs`, and `RegistryEntry` are defined inline near their usage, not in a shared types file
- Component props interfaces extend `React.ComponentPropsWithoutRef<T>` (not `React.HTMLAttributes`) to get proper native element typing; `Omit<>` is used to intentionally hide props that are replaced by friendlier wrappers
- Return types are not explicitly annotated on components — TypeScript infers them
## Component Patterns
## Naming Conventions
## File Organization
## Styling Patterns
- `noUnusedImports`: error
- `noExplicitAny`: off
- `noConsole`: warn (allows `console.assert`, `.error`, `.info`, `.warn`)
- `useSortedClasses`: error with safe autofix
- Import organization via Biome assist (`organizeImports: "on"`)
## Import Organization
## Comments
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## System Type
- `packages/ui` — the publishable npm package `@bctechnology/ui`. Ships a CLI tool (`bct`) and a registry of versioned component source files. Components are NOT imported as a library at runtime — they are **copied into consumer projects** (shadcn/ui-style).
- `apps/docs` — a Next.js 15 documentation site. Reads component source from `packages/ui` at build time to render live previews and syntax-highlighted source.
## Key Patterns
```json
```
- `bct init` — detects Vite or Next.js project, installs Tailwind v4, Biome, copies design-system tokens CSS, writes `biome.json` and `.vscode/settings.json`.
- `bct add <component>` — fetches component source from GitHub raw at the tag matching the installed package version, writes to `src/components/`.
- `bct doctor` — validates project health against BCT requirements.
- Named function export (e.g., `export function Button`)
- Props interface exported as `export interface ButtonProps extends React.ComponentPropsWithoutRef<...>`
- Styling via `clsx` + `tailwind-merge` over Tailwind CSS v4 with design token CSS variables
- Base behavior from `@base-ui/react` primitives where applicable (forms, dialogs, popovers, etc.)
- Next.js 15 App Router with static site generation
- Version-parameterized routing: `/components/[version]/[component]`
- Registry data read from filesystem at build/request time via `apps/docs/lib/registry.ts`, which reads `packages/ui/src/registry/versions/<version>/registry.json` directly (no network call in the docs site)
- Component previews loaded lazily via `PREVIEW_REGISTRY` (`apps/docs/previews/registry.ts`), which maps `version → component → dynamic import`
## Data Flow
## Component Hierarchy
```
```
- `form-inputs` (order 0): button, text-input, text-area, checkbox, radio, radio-group, select, switch, number-input, slider, color-picker, date-picker, date-range-picker, file-upload, rich-text-input
- `feedback` (order 1): dialog, alert-dialog, alert, tooltip, spinner, progress, skeleton
- `display` (order 2): badge, avatar, card, breadcrumbs, pagination, divider
- `navigation` (order 3): accordion, tabs, dropdown-menu, popover
- `layout` (order 4): sidebar, header, portal
- `advanced` (order 5): file-icon, image-preview-dialog, file-details-dialog, file-upload-input
## Versioning Strategy
## Error Handling
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
