# BCT UI — Docs Site

The `apps/docs` package is a Next.js 15 documentation site for BCT UI. It serves as the living reference for every component across all published versions: live interactive previews, source code, install commands, design tokens, and usage guides — all built using BCT UI itself.

---

## Running locally

From the monorepo root:

```bash
pnpm docs:dev
```

Or from inside `apps/docs`:

```bash
pnpm dev
```

The site starts at `http://localhost:3000` with Turbopack for fast rebuilds.

---

## Site structure

```md
apps/docs/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage — hero, quickstart, feature grid
│   ├── getting-started/          # Install guide (bct init, bct add, frameworks)
│   ├── design-system/            # Token reference (colors, typography, spacing)
│   ├── contributing/             # How to add components and write previews
│   ├── changelog/                # Version history
│   ├── globals.css               # Tailwind v4 + BCT token imports + animation bridges
│   └── components/[version]/[component]/
│                                 # Per-component page: preview, source, install command
├── components/
│   ├── layout/                   # Header, sidebar, mobile nav, docs layout wrapper
│   ├── docs/                     # CodeBlock (Shiki), ComponentPreview (Preview/Code tabs)
│   ├── providers/                # ThemeProvider (next-themes wrapper)
│   └── ui/                       # ThemeToggle, VersionSwitcher
├── previews/
│   ├── types.ts                  # VariantPreview interface
│   ├── registry.ts               # Static import map (version → component → lazy import)
│   ├── 0.4.0/                    # One preview wrapper per component for v0.4.0
│   ├── 0.3.0/                    # Same for v0.3.0
│   └── 0.2.0/                    # Same for v0.2.0
├── lib/
│   ├── registry.ts               # FS-based reader: getRegistry, getComponent, getComponentSource
│   └── versions.ts               # VALID_VERSIONS, DEFAULT_VERSION, version utilities
└── scripts/
    └── add-component.ts          # CLI: scaffolds a new preview wrapper from component source
```

---

## How previews work

Each component page dynamically loads a **preview wrapper** file that exports a `variants` array. The preview wrapper imports the actual component from `packages/ui` and defines one or more named variants to demonstrate (e.g. sizes, states, configurations).

```md
Component page (server)
  → reads registry.json + raw source from packages/ui (filesystem at build time)
  → passes component name + version to <ComponentPreview> (client component)

ComponentPreview (client)
  → looks up the lazy import in PREVIEW_REGISTRY
  → dynamically imports the preview wrapper
  → renders the Preview tab (live component) and Code tab (JSX string)
```

The **preview frame** has its own independent dark/light toggle, so you can see a component in both themes without switching the whole page.

### VariantPreview interface

```typescript
// apps/docs/previews/types.ts
export interface VariantPreview {
  name: string          // Shown in the variant selector tab
  description?: string  // Shown as subtitle
  code: string          // JSX string displayed in the Code tab
  render: () => React.ReactNode  // The live rendered preview
}
```

---

## Adding a new component preview

### Option A — Script (recommended for first pass)

From the monorepo root:

```bash
pnpm docs:add-component -- --component <name> --version <version>
```

Examples:

```bash
# Scaffold a single component for v0.4.0 (default version)
pnpm docs:add-component -- --component accordion

# Scaffold for a specific version
pnpm docs:add-component -- --component accordion --version 0.3.0

# Scaffold all components in v0.4.0 that don't already have a preview
pnpm docs:add-component -- --all --version 0.4.0

# Overwrite an existing preview
pnpm docs:add-component -- --component accordion --force
```

The script:

1. Reads `packages/ui/src/registry/versions/<version>/registry.json` for metadata
2. Reads the component source file and extracts the exported function name and props interface
3. Infers `variant` and `size` enums from the props interface to generate placeholder examples
4. Writes `apps/docs/previews/<version>/<component>.tsx` with a working but placeholder `variants` array
5. Adds the lazy import entry to `apps/docs/previews/registry.ts`

After running the script, open the generated file and:

- Replace the placeholder `render()` with real component usage
- Add additional variant entries to showcase different prop combinations
- Fill in the `code` strings with clean, copy-paste-ready JSX

### Option B — Manually

1. Create `apps/docs/previews/<version>/<component>.tsx`:

```typescript
"use client"

import { MyComponent } from "../../../../packages/ui/src/registry/versions/0.4.0/components/my-component"
import type { VariantPreview } from "../types"

export const variants: VariantPreview[] = [
  {
    name: "Default",
    description: "Standard usage",
    code: `<MyComponent label="Hello" />`,
    render: () => <MyComponent label="Hello" />,
  },
  {
    name: "Disabled",
    description: "Non-interactive state",
    code: `<MyComponent label="Hello" disabled />`,
    render: () => <MyComponent label="Hello" disabled />,
  },
]
```

1. Add the lazy import to `apps/docs/previews/registry.ts` under the correct version:

```typescript
"0.4.0": {
  // ... existing entries
  "my-component": () => import("./0.4.0/my-component"),
}
```

---

## Making a new release

A "release" means publishing a new version of the `@bctechnology/ui` package **and** adding full docs coverage for it. The checklist:

### 1. Add the new version to the component registry

Create a new version directory under `packages/ui/src/registry/versions/`:

```md
packages/ui/src/registry/versions/
└── 0.5.0/
    ├── registry.json     # Component manifest for this version
    └── components/       # Component source files
```

`registry.json` follows this structure:

```json
{
  "button": {
    "title": "Button",
    "description": "...",
    "category": "form-inputs",
    "files": [{ "src": "components/button.tsx", "dst": "button.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"]
  }
}
```

Valid categories: `form-inputs`, `feedback`, `display`, `navigation`, `layout`, `advanced`.

### 2. Add the version to the docs site

**`apps/docs/lib/versions.ts`** — add the new version string:

```typescript
export const VALID_VERSIONS = ["0.5.0", "0.4.0", "0.3.0", "0.2.0"] as const
export const DEFAULT_VERSION = "0.5.0"
```

The version in position 0 becomes the default shown to new visitors. Keep newest first.

### 3. Scaffold preview wrappers

```bash
pnpm docs:add-component -- --all --version 0.5.0
```

This generates a placeholder preview file for every component in the new version. Then go through each generated file and fill in real examples — the script leaves `// TODO: Add more variant examples` comments as markers.

### 4. Add the version to the preview registry

The script in step 3 handles this automatically. If doing it manually, add a new version block to `apps/docs/previews/registry.ts`:

```typescript
export const PREVIEW_REGISTRY = {
  "0.5.0": {
    button: () => import("./0.5.0/button"),
    // ... one entry per component
  },
  "0.4.0": { /* ... */ },
}
```

### 5. Update the changelog page

Add a new entry at the top of `apps/docs/app/changelog/page.tsx` describing what changed in this version — new components, breaking changes, behaviour changes, token additions.

### 6. Typecheck and lint

```bash
# From apps/docs
pnpm typecheck

# From monorepo root
pnpm biome check apps/docs
```

### 7. Build and verify

```bash
pnpm docs:build
```

Check the output for any broken imports, missing preview registrations, or TypeScript errors before deploying.

---

## Design system tokens

The docs site imports BCT's own token CSS directly:

```css
/* apps/docs/app/globals.css */
@import "@bctechnology/ui/assets/tokens/index.css";
@import "tailwindcss";
@source "../../packages/ui/src";
```

The `@source` directive tells Tailwind v4 to scan `packages/ui/src` so all utility classes used inside component source files are included in the generated CSS — this is required for classes that only appear inside component files (e.g. `grid-cols-7` in the date picker).

The site uses BCT's semantic colour tokens throughout (`bg-surface-1`, `text-typography-primary`, `border-border`, etc.), making it a live demonstration of the design system in use.

### Animation bridge

BCT component source files use classes like `animate-animate-fade-in`. In Tailwind v4, `animate-X` maps to `animation: var(--animate-X)`. The tokens CSS defines `--animate-fade-in` (no double prefix), so `globals.css` bridges the gap:

```css
@theme {
  --animate-animate-fade-in: fade-in 150ms ease-out;
  --animate-animate-fade-out: fade-out 150ms ease-out;
  --animate-animate-slide-up: slide-up 150ms ease-out;
  --animate-animate-spin: spin 1s linear infinite;
  --animate-animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  /* ... */
}
```

If a new animation is added to a component (`animate-animate-bounce`, for example), add a corresponding `--animate-animate-bounce` variable here pointing to the matching keyframe from `tokens/index.css`.

---

## Key technical notes

### Base UI data attributes (v1.1.0+)

BCT components use `@base-ui/react` v1.x which uses **presence-based** data attributes — not `data-state="open"`. The correct Tailwind selectors are:

| State | Correct | Wrong |
| ------- | --------- | ------- |
| Open | `data-open:` | `data-[state=open]:` |
| Closed | `data-closed:` | `data-[state=closed]:` |
| Checked | `data-checked:` | `data-[state=checked]:` |

This matters for animations and visibility — Base UI uses `animationend` events to manage lifecycle for popovers and tooltips, so if the animation selectors don't match, popups may never open or close.

### Tailwind v4 combined translate

Tailwind v4's individual axis translate utilities (`translate-x-*`, `translate-y-*`) each reset **both** CSS custom properties before setting their own axis. Using both on the same element causes the second to silently override the first.

**Wrong** — only vertical centering applied:

```css
-translate-x-1/2 -translate-y-1/2
```

**Correct** — both axes set atomically:

```css
-translate-1/2
```

This applies anywhere a component needs to be centered with both translate axes.

### Fixed header in previews

Components that use `position: fixed` (like the `Header` component) cannot be previewed inside a normal div because fixed elements escape the layout flow. The preview wrapper applies `translate-x-0` to the outer container, which creates a CSS **containing block** that traps fixed-positioned descendants within the preview frame:

```tsx
// apps/docs/previews/0.4.0/header.tsx
<div className="relative min-h-16 w-full translate-x-0 overflow-hidden rounded-xl border border-border">
  <Header ... />
</div>
```
