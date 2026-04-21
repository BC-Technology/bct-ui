# Code Conventions

**Analysis Date:** 2026-04-21

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

**Props interface naming:** Always `{ComponentName}Props` as a named `export interface`, placed directly above the component function.

**Extends pattern for wrapper components:**
```typescript
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: "primary" | "secondary" | ...
  size?: "sm" | "md" | "lg"
  className?: string
}
```

**Omit pattern when replacing upstream props:**
```typescript
export interface DialogProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseDialog.Root>, "disablePointerDismissal"> {
  dismissible?: boolean
}
```

**Variants and sizes** are typed as string union literals, not enums. Defaults are always declared in the destructured parameter list:
```typescript
export function Button({ variant = "primary", size = "md", ...props }: ButtonProps)
```

**Variant style maps** use `Record<string, string>` objects defined inside the component body (or as SCREAMING_SNAKE_CASE constants outside when static):
```typescript
const variantStyles: Record<string, string> = {
  primary: clsx("bg-primary text-primary-on ..."),
}
```

Static maps that don't change per render are hoisted to module scope as `const SCREAMING_SNAKE_CASE`:
```typescript
const MODAL_WIDTH: Record<string, string> = { sm: "max-w-sm", ... }
```

**Sub-component types** (data shapes like options or nav items) are exported as separate interfaces from the same file:
```typescript
export interface SelectOption { value: string; label: string; description?: string; disabled?: boolean }
```

**`classNames` escape hatch:** Every component exposes an optional `classNames` prop with keys for each internal region (e.g. `root`, `label`, `trigger`, `popup`, `error`). Always applied via `twMerge` after the base styles:
```typescript
classNames?: {
  root?: string
  label?: string
  trigger?: string
}
```

**Controlled/uncontrolled pattern** for form components (e.g. `Checkbox`): detect controlled mode by checking `checked !== undefined`, maintain internal state with `useState` for uncontrolled mode.

**Client components** add `"use client"` at the very top of the file when they use React hooks (`useState`, `useEffect`, `useRef`) or browser APIs. Components that are purely presentational omit the directive.

**`children` prop** is typed as `React.ReactNode` and always destructured explicitly — never taken from `...props`.

**Spreading `...props`** onto the underlying Base UI element is the standard pattern for forwarding all remaining native/Base UI props.

## Naming Conventions

**Files:** `kebab-case.tsx` for components (e.g. `text-input.tsx`, `date-range-picker.tsx`), `kebab-case.ts` for utilities

**Component functions:** PascalCase, matching the filename without extension (`TextInput` in `text-input.tsx`)

**Interfaces:** PascalCase with descriptive suffix — `ButtonProps`, `SelectOption`, `SidebarNavItem`, `SidebarUser`, `VariantPreview`

**Local variables:** camelCase — `variantStyles`, `sizeStyles`, `panelAnimationClass`, `resolvedChecked`

**Module-scope constants:** SCREAMING_SNAKE_CASE — `MODAL_WIDTH`, `PANEL_WIDTH`, `PREVIEW_REGISTRY`, `REGISTRY_BASE`, `VALID_VERSIONS`

**Event handler props:** `on` prefix — `onNavItemClick`, `onSettings`, `onLogout`, `onIconClick`, `onCheckedChange`

**CSS class helper variables:** descriptive camelCase — `baseStyles`, `variantStyles`, `sizeStyles`, `triggerStyles`, `popupStyles`, `optionStyles`

**Async functions inside `useEffect`:** defined as named `async function` inside the effect body (`async function loadVariants()`) and called immediately

## File Organization

```
packages/ui/src/
  registry/
    versions/
      {semver}/
        components/       # One .tsx file per component
        registry.json     # Component metadata manifest
  lib/                    # CLI utilities (fetcher, cache, args, etc.)
  commands/               # CLI command implementations (add.ts, init.ts, doctor.ts)
  cli.ts                  # CLI entry point
  index.ts                # Package public API

apps/docs/
  app/                    # Next.js App Router pages
    components/[version]/[component]/page.tsx
  components/
    docs/                 # Documentation UI (code-block, component-preview)
    layout/               # Layout components (header, sidebar, docs-layout, mobile-nav)
    ui/                   # Utility UI (theme-toggle, version-switcher)
    providers/            # Context providers (theme-provider)
  previews/
    {semver}/             # One .tsx file per component preview, mirrors registry versions
    registry.ts           # Lazy import map for all preview files
    types.ts              # Shared VariantPreview type
  lib/                    # Server-side utilities (registry.ts, versions.ts, categories.ts)
```

New components belong in `packages/ui/src/registry/versions/{version}/components/`. A corresponding preview file belongs in `apps/docs/previews/{version}/`. The preview must be registered in `apps/docs/previews/registry.ts`.

## Styling Patterns

**Class composition stack:** `clsx` for conditional logic → `twMerge` for consumer override merging. The pattern is always `twMerge(clsx(...), classNames?.part, className)`.

```typescript
// Standard pattern for outermost element
className={twMerge(
  clsx("base-classes", { "conditional-class": condition }),
  classNames?.root,
  className,
)}

// Standard pattern for internal elements
className={twMerge("internal-base-classes", classNames?.label)}
```

**Tailwind utility classes** are the only styling mechanism — no CSS Modules, no styled-components, no inline `style` objects (except for CSS variable references like `style={{ backgroundColor: "var(--color-background)" }}`).

**Design token classes** use the project's semantic token system: `bg-primary`, `text-typography-primary`, `text-typography-muted`, `border-border`, `bg-surface-1`, `bg-surface-2`, `bg-surface-3`, `bg-overlay`, `text-error`, `ring-primary-focus`, etc. These are the canonical class names — do not use raw Tailwind color classes like `bg-blue-500`.

**Responsive/state modifiers:** `hover:`, `focus-visible:`, `disabled:`, `active:`, `data-checked:`, `data-selected:`, `data-open:`, `data-closed:` — always use `focus-visible:` not `focus:` for keyboard accessibility ring styles.

**Biome enforces sorted class names** (`useSortedClasses` at error level) for `className`, `classList`, `clsx`, and `cva` arguments. Classes must be in Biome/Tailwind's canonical sort order.

**Tailwind class grouping** within `clsx` calls uses multiple string arguments to logically group by concern (base styles, hover, focus, disabled, etc.):
```typescript
clsx(
  "base layout classes",
  "hover:... active:...",
  "focus-visible:... outline-none",
  "disabled:...",
)
```

**Formatting:** Biome is the formatter (not Prettier). Settings: `indentStyle: "tab"`, double quotes, no semicolons, trailing commas everywhere. The `.editorconfig` sets `indent_size = 2` and LF line endings (used as fallback for editors).

**Linting:** Biome recommended rules plus:
- `noUnusedImports`: error
- `noExplicitAny`: off
- `noConsole`: warn (allows `console.assert`, `.error`, `.info`, `.warn`)
- `useSortedClasses`: error with safe autofix
- Import organization via Biome assist (`organizeImports: "on"`)

## Import Organization

Biome's `organizeImports` is enabled. Observed order in component files:
1. External library imports (`@base-ui/react/...`, `clsx`, `lucide-react`, `tailwind-merge`)
2. React type import (`import type * as React from "react"`)
3. React hook imports (`import { useState, useEffect } from "react"`) — separate from the type import
4. Internal relative imports (`./avatar`, `./sidebar`)

The `apps/docs` package uses the `@/*` alias mapped to the app root, so imports from within `apps/docs` use `@/components/...`, `@/lib/...`, `@/previews/...`.

## Comments

**Section separators** use box-drawing ASCII dividers for logical groupings inside long files:
```typescript
// ─── Size maps ────────────────────────────────────────────────────────────────
// ─── Props ────────────────────────────────────────────────────────────────────
// ─── Component ────────────────────────────────────────────────────────────────
// ── Modal mode ─────────────────────────────────────────────────────────────────
```

**JSDoc** is used for non-obvious props in the interface definition:
```typescript
/**
 * Display mode of the dialog.
 * - `"panel"` — slides in from the side (default)
 * - `"modal"` — centered overlay
 */
mode?: "panel" | "modal"
```

**Inline comments** explain non-obvious Tailwind workarounds or Base UI quirks:
```typescript
// Widths use two separate classes instead of CSS min() inside a single
// arbitrary value — Tailwind's scanner stops at commas inside brackets.
```

**Biome suppression comments** are used for known false positives:
```typescript
// biome-ignore lint/style/noNonNullAssertion: This is safe, since we check that it's not null
```
