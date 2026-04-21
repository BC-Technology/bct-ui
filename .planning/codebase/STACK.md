# Technology Stack

**Analysis Date:** 2026-04-21

## Runtime & Language

- **Node.js** >=20 (enforced via `engines.node` in root `package.json`)
- **TypeScript** ^5.7.3 — used across all packages and apps
  - Target: ES2022
  - Module: ESNext, moduleResolution: Bundler
  - Strict mode enabled
- **JavaScript (ESM)** — all packages use `"type": "module"`

## Frameworks

- **Next.js** ^15.3.1 — powers `apps/docs` (the documentation site)
  - App Router (pages live under `apps/docs/app/`)
  - `transpilePackages: ["@bctechnology/ui"]` set in `apps/docs/next.config.ts`
  - PostCSS-based Tailwind integration (`@tailwindcss/postcss`)
- **React** 18.3.1 — UI rendering for both `apps/docs` and all components in `packages/ui`
- **Vite** — supported as a target framework for consumer projects (CLI `bct init` patches Vite configs via `@tailwindcss/vite`)

## Build & Tooling

- **tsup** ^8.0.1 — bundles `packages/ui` (library build)
  - Outputs ESM format with `.d.ts` declarations
  - Entry points: `src/index.ts` and `src/cli.ts`
  - Command: `tsup src/index.ts src/cli.ts --format esm --dts --splitting`
- **Biome** ^2.3.12 — unified linter + formatter for the entire monorepo
  - Config: `biome.json` at repo root
  - Indent style: tabs
  - Quote style: double
  - Trailing commas: all
  - Semicolons: as-needed
  - Enforces sorted Tailwind classes via `useSortedClasses` (nursery rule)
  - Replaces ESLint and Prettier (CLI `bct init` removes competing linters)
- **tsx** ^4.19.2 — runs TypeScript scripts directly (used for `scripts/add-component.ts` in docs)

## Package Management

- **pnpm** 9.15.0 (locked via `packageManager` field)
- **Lockfile:** `pnpm-lock.yaml` present
- **Workspace layout** (`pnpm-workspace.yaml`):
  - `packages/*` — publishable packages (`@bctechnology/ui`)
  - `apps/*` — internal applications (`@bctechnology/docs`)

## Styling

- **Tailwind CSS v4** ^4.1.0
  - Uses `@import "tailwindcss"` CSS-first config (no `tailwind.config.*` file)
  - Token system defined entirely in `packages/ui/src/assets/tokens/index.css`
  - Docs app sources component classes via `@source "../../packages/ui/src"`
  - PostCSS plugin (`@tailwindcss/postcss`) used in Next.js; Vite plugin (`@tailwindcss/vite`) used in Vite projects
- **CSS custom properties (design tokens)** — all colors, spacing, typography, shadows, z-indices, and animations defined as CSS variables in `packages/ui/src/assets/tokens/index.css`
  - Light and dark themes via `[data-theme="light"]` / `.dark` / `[data-theme="dark"]`
  - Fonts: Quicksand (sans), League Spartan (serif) — loaded from Google Fonts in docs
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

---

*Stack analysis: 2026-04-21*
