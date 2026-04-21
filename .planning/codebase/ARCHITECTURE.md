# Architecture

**Analysis Date:** 2026-04-21

## System Type

pnpm monorepo containing two workspaces:

- `packages/ui` — the publishable npm package `@bctechnology/ui`. Ships a CLI tool (`bct`) and a registry of versioned component source files. Components are NOT imported as a library at runtime — they are **copied into consumer projects** (shadcn/ui-style).
- `apps/docs` — a Next.js 15 documentation site. Reads component source from `packages/ui` at build time to render live previews and syntax-highlighted source.

## Key Patterns

**Copy-to-own component distribution:**
Components live in `packages/ui/src/registry/versions/<semver>/components/`. When a consumer runs `npx @bctechnology/ui add button`, the CLI fetches the raw `.tsx` source from the GitHub release tag and writes it into the consumer's `src/components/` folder. There is no runtime import of the package for components.

**Versioned registry:**
Each released version has its own complete snapshot of all component files under `packages/ui/src/registry/versions/<semver>/components/` and a `registry.json` manifest. The manifest describes each component's title, description, category, peer `deps`, `registryDeps` (other components that must also be copied), and the `src`/`dst` file mapping. Current versions: `0.2.0`, `0.3.0`, `0.4.0`.

**Registry manifest structure** (`packages/ui/src/registry/versions/0.4.0/registry.json`):
```json
{
  "button": {
    "title": "Button",
    "category": "form-inputs",
    "files": [{ "src": "components/button.tsx", "dst": "button.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  }
}
```

**CLI commands** (entry: `packages/ui/src/cli.ts`):
- `bct init` — detects Vite or Next.js project, installs Tailwind v4, Biome, copies design-system tokens CSS, writes `biome.json` and `.vscode/settings.json`.
- `bct add <component>` — fetches component source from GitHub raw at the tag matching the installed package version, writes to `src/components/`.
- `bct doctor` — validates project health against BCT requirements.

**Component implementation pattern** (`packages/ui/src/registry/versions/0.4.0/components/button.tsx`):
- Named function export (e.g., `export function Button`)
- Props interface exported as `export interface ButtonProps extends React.ComponentPropsWithoutRef<...>`
- Styling via `clsx` + `tailwind-merge` over Tailwind CSS v4 with design token CSS variables
- Base behavior from `@base-ui/react` primitives where applicable (forms, dialogs, popovers, etc.)

**Docs site architecture** (`apps/docs`):
- Next.js 15 App Router with static site generation
- Version-parameterized routing: `/components/[version]/[component]`
- Registry data read from filesystem at build/request time via `apps/docs/lib/registry.ts`, which reads `packages/ui/src/registry/versions/<version>/registry.json` directly (no network call in the docs site)
- Component previews loaded lazily via `PREVIEW_REGISTRY` (`apps/docs/previews/registry.ts`), which maps `version → component → dynamic import`

## Data Flow

**CLI "add" flow:**
1. `bct add <component>` invoked
2. `packages/ui/src/commands/add.ts` calls `loadRegistry(version)` — fetches `registry.json` from GitHub raw at tag `v{version}`, caches to `~/.cache/bct-ui/`
3. For each file in the entry's `files` array, fetches raw `.tsx` from the same GitHub tag and caches it
4. Writes file to consumer's `src/components/<dst>`
5. Checks consumer `package.json` for missing `deps`, runs `pnpm add` if needed

**Docs site component page flow:**
1. `generateStaticParams()` in `apps/docs/app/components/[version]/[component]/page.tsx` iterates `VALID_VERSIONS × getAllComponentNames(version)`
2. `getComponentSource(version, name)` reads `.tsx` source from filesystem (`packages/ui/src/registry/versions/...`)
3. Page renders server-side with source code passed as prop to `<ComponentPreview>` client component
4. `ComponentPreview` lazily imports preview module from `PREVIEW_REGISTRY[version][component]` in a `useEffect`
5. Preview module exports `variants: VariantPreview[]` — each with a `render()` function and a `code` string

**Token / design system flow:**
1. `bct init` copies `packages/ui/src/assets/tokens/index.css` into the consumer project as `src/index.css`
2. For Next.js projects, it prepends `@import "./index.css"` to `app/globals.css`
3. All component CSS classes reference `var(--color-*)`, `var(--bct-*)` tokens defined in that file

## Component Hierarchy

**Docs site layout tree:**
```
RootLayout (apps/docs/app/layout.tsx)
  ThemeProvider (apps/docs/components/providers/theme-provider.tsx)
    Header (apps/docs/components/layout/header.tsx)
      VersionSwitcher (apps/docs/components/ui/version-switcher.tsx)
      ThemeToggle (apps/docs/components/ui/theme-toggle.tsx)
      MobileNav (apps/docs/components/layout/mobile-nav.tsx)
    DocsLayout (apps/docs/components/layout/docs-layout.tsx)
      Sidebar (apps/docs/components/layout/sidebar.tsx)
      <page content>
        ComponentPreview (apps/docs/components/docs/component-preview.tsx)
          CodeBlock (apps/docs/components/docs/code-block.tsx)
```

**Component categories** (defined in `apps/docs/lib/categories.ts`):
- `form-inputs` (order 0): button, text-input, text-area, checkbox, radio, radio-group, select, switch, number-input, slider, color-picker, date-picker, date-range-picker, file-upload, rich-text-input
- `feedback` (order 1): dialog, alert-dialog, alert, tooltip, spinner, progress, skeleton
- `display` (order 2): badge, avatar, card, breadcrumbs, pagination, divider
- `navigation` (order 3): accordion, tabs, dropdown-menu, popover
- `layout` (order 4): sidebar, header, portal
- `advanced` (order 5): file-icon, image-preview-dialog, file-details-dialog, file-upload-input

## Versioning Strategy

**Package versioning:** `packages/ui` is published to npm as `@bctechnology/ui`. Each npm version corresponds to a GitHub tag `v{version}`.

**Component versioning:** When a new version is released, the entire component set is snapshotted into `packages/ui/src/registry/versions/<new-version>/components/`. The docs site tracks all versions in `apps/docs/lib/versions.ts` via `VALID_VERSIONS = ["0.4.0", "0.3.0", "0.2.0"]`. The default is always the latest.

**Consumer version pinning:** The CLI reads the installed `@bctechnology/ui` package version at runtime (via `packages/ui/src/lib/ui-version.ts`) and fetches components from the matching GitHub tag. Consumers stay on whatever version they installed.

**Registry validation:** `packages/ui/scripts/verify-registry-version.mjs` runs as part of `prepublishOnly` to ensure the npm package version matches the registry version before publishing.

**New component addition workflow:**
1. Add component source under `packages/ui/src/registry/versions/<version>/components/<name>.tsx`
2. Add entry to `packages/ui/src/registry/versions/<version>/registry.json`
3. Run `pnpm docs:add-component -- --component <name>` to scaffold a preview wrapper at `apps/docs/previews/<version>/<name>.tsx` and register it in `apps/docs/previews/registry.ts`
4. Fill in actual render examples in the generated preview file

## Error Handling

**CLI errors:** Top-level `main()` in `packages/ui/src/cli.ts` catches all errors and writes `err.message` to stderr, setting `process.exitCode = 1`. Individual commands throw `Error` with descriptive messages including expected URLs/paths when fetching fails.

**Docs registry reads:** `getRegistry()` in `apps/docs/lib/registry.ts` returns `{}` silently on filesystem read errors, causing pages to show empty component lists rather than crashing.

**Preview loading:** `ComponentPreview` catches loader errors and sets `variants = []`, displaying "Preview not available" without throwing.

---

*Architecture analysis: 2026-04-21*
