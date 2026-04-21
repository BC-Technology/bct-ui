# Technology Stack

**Project:** bct-ui 0.5.0 — comprehensive Base UI component coverage via props-driven wrappers
**Researched:** 2026-04-21
**Mode:** Ecosystem (stack dimension)
**Overall confidence:** HIGH for locked/pinned deps (verified from repo lockfile); MEDIUM for pattern conventions (verified against 0.4.0 code + public Base UI API shape)

---

## TL;DR

0.5.0 should reuse the **exact stack already locked in this repo** and the **wrapper pattern already proven in 0.4.0** — there is no strategic reason to introduce new runtime deps for a version whose goal is *breadth of Base UI coverage*, not technology turnover. The non-negotiable constraints in `PROJECT.md` (`@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react`; single-file `.tsx`; BCT CSS variables) already narrow the stack down to one correct answer. This document captures what that answer is, pins versions, and — most importantly — codifies the **props-driven wrapper pattern** for Base UI's compound-component primitives so every one of the 36 components is written the same way.

---

## Recommended Stack

### Core runtime (peer deps on the consumer)

| Technology | Version (from repo lockfile) | Purpose | Why | Confidence |
|---|---|---|---|---|
| `react` | `18.3.1` | Component runtime | Matches `@types/react` `18.3.27`, already the project's peer. React 19 upgrade is out of scope for 0.5.0 — bumping React forces consumers to upgrade too. | HIGH |
| `react-dom` | `18.3.1` | Portal/DOM rendering (Dialog, Popover, Menu, Tooltip, etc. all use portals) | Pair with React 18.3. | HIGH |
| `@base-ui/react` | `^1.1.0` (installed: `1.1.0`) | Headless, a11y-correct primitives for all 36 components | Base UI 1.x is the stable, post-rename line (previously `@base-ui-components/react`). The `@base-ui/react/<component>` subpath imports used in 0.4.0 are the documented entry points. 0.5.0 is defined as "wrap *all 36 Base UI components*" — changing this primitive would invalidate the milestone. | HIGH |

> Note on the package name: 0.4.0 imports from `@base-ui/react/<component>` (confirmed in every 0.4.0 component file and in `pnpm-lock.yaml` — `@base-ui/react@1.1.0`). Any blog post or third-party doc referencing `@base-ui-components/react` is referring to the older pre-1.0 package name. **Do not switch.** 0.5.0 stays on `@base-ui/react`.

### Styling dependencies (installed in the registry package; consumer installs them when running `bct add`)

| Technology | Version (from repo lockfile) | Purpose | Why | Confidence |
|---|---|---|---|---|
| `tailwindcss` | `^4.1.0` (installed: `4.1.18`, transitive `4.2.1` also present) | Utility-class styling, `@theme` bridge to BCT CSS variables | Tailwind v4's `@theme` directive is what powers the existing `var(--color-primary)` → `bg-primary` bridge in `index.css`. v3 is not a fit — no `@theme`, different config model. | HIGH |
| `tailwind-merge` | `^2.5.0` (installed: `2.6.1`) | Deterministic merging of Tailwind classes when consumers override via `className` / `classNames` | Without it, a consumer's `className="bg-blue-500"` loses to the wrapper's `bg-primary` depending on stylesheet order. `twMerge` guarantees last-wins at the class level. Used in every 0.4.0 component. **v2.x is Tailwind-v4-compatible** for the utilities this library uses (core spacing, color, layout). If a future custom utility causes a merge miss, that's addressed per-component, not by swapping the library. | HIGH |
| `clsx` | `^2.1.1` | Conditional class composition (variant maps, boolean flags) | Tiny (~240B), already in every 0.4.0 component, pairs naturally with `twMerge(clsx(...), overrides)`. | HIGH |
| `lucide-react` | `^0.460.0` | Default icon set (`ChevronDown`, `Check`, `X`, etc.) | Mandated by `PROJECT.md` constraint "No inline SVG — Lucide only." Already in use across 0.4.0 (accordion, dialog, select). Tree-shakable per-icon imports keep consumer bundles small. | HIGH |

### Language / build (dev-only, does not ship to consumers)

| Technology | Version | Purpose | Why | Confidence |
|---|---|---|---|---|
| `typescript` | `^5.7.3` | Type-safe component props | Already pinned. Needed for the `React.ComponentPropsWithoutRef<typeof BaseX.Root>` pattern that underpins every wrapper. | HIGH |
| `@biomejs/biome` | `^2.3.12` | Lint + format (no ESLint, no Prettier) | Already adopted. Biome's formatter is what produces the tab-indent / double-quote style seen in 0.4.0 files — 0.5.0 must match. | HIGH |
| `tsup` | `^8.0.1` | Bundles `index.ts` + `cli.ts` for the `@bctechnology/ui` npm package | Registry files themselves are **not bundled** — they are source copied by the CLI. tsup is only for the CLI + registry metadata. | HIGH |

### Explicitly NOT installed (and why)

| Library | Why NOT | Confidence |
|---|---|---|
| `class-variance-authority` (cva) | Adds a third abstraction on top of `clsx` + `twMerge` for variants. 0.4.0's Button proves plain variant-map objects (`variantStyles: Record<string, string>`) are readable, single-file, and zero-dep. cva would also make the copy-to-own source less approachable for consumers reading what they just copied. | HIGH |
| `tailwind-variants` | Same reasoning as cva plus larger surface area. | HIGH |
| `@radix-ui/react-*` | 0.5.0's defining value is Base UI coverage. Mixing Radix primitives would fragment the mental model and pull in a second a11y layer. | HIGH |
| `@headlessui/react` | Same reason as Radix. | HIGH |
| `framer-motion` / `motion` | Base UI exposes `data-[open]` / `data-[starting-style]` / `data-[ending-style]` attributes; existing dialog already uses plain CSS animation (`bct-dialog-panel-right` class) driven by those attributes. A JS animation library would be a new peer dep — explicitly forbidden by the "only `@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react`" constraint in `PROJECT.md`. | HIGH |
| `react-aria` / `@react-aria/*` | Base UI already owns a11y for all 36 primitives. Adding react-aria would duplicate focus management, keyboard handling, and ARIA wiring. | HIGH |
| `zod` / `valibot` (for prop validation) | TypeScript types are sufficient for a component library. Runtime validation bloats consumer bundles. | HIGH |
| `react-hook-form` | Form integration is **consumer territory**. Base UI's `Field`, `Form`, `Fieldset`, `Input`, `Checkbox`, `Radio`, `Select`, `Switch`, `NumberField`, `OTPField` primitives are all uncontrolled-friendly and work with any form library the consumer picks. 0.5.0 components should accept `name` / `value` / `onValueChange` and stop there. | HIGH |
| `cmdk` | Base UI ships `Autocomplete` and `Combobox` primitives in 1.1. Those are the components we're wrapping. | HIGH |
| A new CSS-in-JS library (Emotion, Stitches, vanilla-extract, styled-components) | The entire BCT token pipeline is CSS-variables + Tailwind `@theme`. CSS-in-JS would require a parallel theme system. | HIGH |

### Alternatives considered (brief)

| Category | Recommended | Alternative | Why not the alternative |
|---|---|---|---|
| Headless primitive library | `@base-ui/react` | Radix UI | Mandated by milestone scope ("all 36 Base UI components") |
| Class composition | `clsx` + `tailwind-merge` | `cva` / `tailwind-variants` | Extra dep, harder-to-read copied source, no practical win over plain variant-map objects |
| Icon set | `lucide-react` | `@radix-ui/react-icons`, `heroicons`, inline SVG | Mandated by `PROJECT.md`; already in 0.4.0 |
| Variant/size API | Flat `variant` / `size` string props | Nested `styling` config object | Flat matches 0.4.0 Button, which is the reference implementation |
| Sub-part overrides | `classNames: { root, item, trigger, panel, ... }` | `slotProps` (MUI-style) / `render` prop | 0.4.0 already standardized on `classNames` (see Accordion, Dialog, Select). Consistency > cleverness. |

### Installation (consumer side, after `bct add <component>`)

Consumers already have `react`, `react-dom`, and `tailwindcss` v4. `bct add` and the component `registry.json` entries are responsible for ensuring these are added if missing:

```bash
# Runtime deps a 0.5.0 component might need (from registry.json deps field)
pnpm add @base-ui/react clsx tailwind-merge lucide-react
```

No new peer deps are introduced in 0.5.0.

---

## The Wrapper Pattern (prescriptive — apply to all 36 components)

This is the load-bearing part of this document. The Base UI primitives are *compound components* (`Accordion.Root` / `Accordion.Item` / `Accordion.Trigger` / ...), but `PROJECT.md` mandates that 0.5.0 exposes **one named export per component concept** — a props-driven wrapper. The pattern below is extracted from the 0.4.0 implementations that already work (`button.tsx`, `accordion.tsx`, `dialog.tsx`, `select.tsx`, `tabs.tsx`). Confidence: HIGH (empirical — these files are in production).

### Pattern 1: Single-primitive pass-through (Button, Separator, Avatar, Switch, Progress, Meter, Toggle, Checkbox, Radio, Input, Slider, NumberField, OTPField)

When the Base UI primitive is essentially one element (`Button`, `Separator`) or a tight single-primary-element cluster:

```tsx
import { Button as BaseButton } from "@base-ui/react/button"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: "primary" | "secondary" | /* ... */ "icon"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Button({ className, variant = "primary", size = "md", children, ...props }: ButtonProps) {
  // 1. Static base classes
  const baseStyles = clsx("inline-flex items-center ...")
  // 2. Variant map (object literal, outside function if purely static — see Dialog's MODAL_WIDTH)
  const variantStyles: Record<string, string> = { primary: "...", /* ... */ }
  const sizeStyles: Record<string, string> = { sm: "...", md: "...", lg: "..." }

  return (
    <BaseButton
      className={twMerge(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
```

Rules:
- `Props extends React.ComponentPropsWithoutRef<typeof BaseX>` — consumers get every Base UI prop for free.
- `className` is the **last** argument to `twMerge` so consumer overrides always win.
- Variant/size maps are typed as `Record<string, string>` (or a narrower union) — never function calls, never nested conditionals.

### Pattern 2: Compound primitive collapsed via an `items` / `options` / `tabs` prop (Accordion, Tabs, Select, Menu, ContextMenu, Menubar, RadioGroup, CheckboxGroup, ToggleGroup, NavigationMenu, Combobox, Autocomplete, Toolbar)

When Base UI exposes `Root` + `Item` + `Trigger` + `Content` and the consumer would normally render a list, collapse that into a single array prop:

```tsx
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"

export interface AccordionItemProps {
  value: string
  title: React.ReactNode
  children: React.ReactNode
}

export interface AccordionProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>, "children"> {
  items: AccordionItemProps[]
  className?: string
  classNames?: {
    root?: string
    item?: string
    header?: string
    trigger?: string
    panel?: string
  }
}

export function Accordion({ items, className, classNames, ...props }: AccordionProps) {
  return (
    <BaseAccordion.Root className={twMerge("...", classNames?.root, className)} {...props}>
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} className={twMerge("...", classNames?.item)}>
          <BaseAccordion.Header className={twMerge(classNames?.header)}>
            <BaseAccordion.Trigger className={twMerge("...", classNames?.trigger)}>
              {item.title}
              <ChevronDown className="size-4 ... data-open:rotate-180" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={twMerge("...", classNames?.panel)}>
            {item.children}
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  )
}
```

Rules:
- `Omit<..., "children">` on the extended Root props — the wrapper owns children internally.
- `classNames` keys mirror the Base UI sub-part names (`root`, `trigger`, `panel` — not `container`, `button`, `body`). Consistency lets consumers transfer knowledge between components.
- Icons in sub-parts (e.g. `ChevronDown` on the trigger) get a prop override on the *wrapper* (e.g. `triggerIcon?: React.ReactNode`) — see "Icons" below.
- `key` must be a value the consumer controls (`item.value`), not the array index.

### Pattern 3: Portal-backed overlays (Dialog, AlertDialog, Drawer, Popover, Tooltip, PreviewCard, Toast)

When the primitive renders into a portal and has Backdrop / Positioner / Popup structure:

```tsx
<BaseDialog.Root {...baseRootProps}>
  <BaseDialog.Portal>
    <BaseDialog.Backdrop className={twMerge("...", classNames?.backdrop)} />
    <div className="fixed inset-0 z-[110] flex ...">
      <BaseDialog.Popup className={twMerge("...", classNames?.popup, className)}>
        {/* header, content, footer */}
      </BaseDialog.Popup>
    </div>
  </BaseDialog.Portal>
</BaseDialog.Root>
```

Rules (from 0.4.0 Dialog):
- Z-index uses the existing `z-[100]` backdrop / `z-[110]` popup ladder — or, preferably, migrate to named `z-dialog-*` tokens if/when added to `index.css`. (Select already uses `z-popover`.)
- Animation driven by data attributes + the `bct-dialog-*` CSS animation classes defined in `index.css`. Do not introduce JS animation libs.
- When a Base UI prop has a confusing name (e.g. `disablePointerDismissal`), **translate it to a friendlier prop** (`dismissible: boolean`) and `Omit` the original from the public API. This is the "friendly abstraction" pattern from Dialog.
- `mode` / `side` / `size` as enum props — split rendering into sub-branches in the component body when the DOM truly differs (panel vs modal), not via style-only switches.

### Pattern 4: Controlled/uncontrolled passthrough (all form primitives — Input, Checkbox, Radio, Switch, Select, NumberField, OTPField, Slider, Combobox, Autocomplete)

Do not intercept `value` / `defaultValue` / `onValueChange`. Spread `...props` into the Base UI Root. Rename `onValueChange` → `onChange` **only** if it materially improves DX (done in 0.4.0 Tabs) — and when you do, `Omit` the original so you don't get both in the public type.

### Icons (mandated by `PROJECT.md`)

Every component that renders an icon as part of its own chrome (not consumer-supplied content) follows this recipe:

```tsx
import { ChevronDown } from "lucide-react"

export interface AccordionProps extends /* ... */ {
  /** Icon rendered inside every trigger. Defaults to Lucide ChevronDown. */
  triggerIcon?: React.ReactNode
}

// default prop value:
triggerIcon = <ChevronDown className="size-4 shrink-0 text-typography-muted transition-transform duration-200 data-open:rotate-180" />
```

- Default: a pre-styled Lucide icon (size, color, rotation transitions baked in).
- Override: `React.ReactNode` — consumers pass any JSX, including a differently-styled Lucide icon or a custom SVG component.
- **Never** import from `lucide-react/icons/*` subpath — use the top-level `lucide-react` named import. Tree-shaking handles it.
- Icon prop names follow the pattern `<part>Icon`: `triggerIcon`, `closeIcon`, `checkIcon`, `chevronIcon`, `clearIcon`.

### Class-merge conventions (strict)

Every `className` composition in a 0.5.0 component follows this exact order, top-to-bottom:

```tsx
twMerge(
  clsx(baseStyles, conditionalStyles),      // 1. component-author styles
  variantStyles[variant],                   // 2. variant-specific styles
  sizeStyles[size],                         // 3. size-specific styles
  classNames?.<subpart>,                    // 4. per-sub-part consumer override
  className,                                // 5. top-level consumer override (Root/Popup only)
)
```

- Only the *root* (or the wrapper's chosen "primary" element — e.g. Dialog Popup) receives the top-level `className`. Every other internal part uses `classNames?.<subpart>` only.
- `twMerge` always wraps the whole expression. `clsx` is only used for the static base + conditionals. Do not nest `twMerge` inside `twMerge`.

### Prop API conventions (apply to all 36 components)

1. **One named export, PascalCase**, matching the component concept: `Button`, `Accordion`, `Dialog`, `NavigationMenu`. No `Accordion.Item` re-exports.
2. **Interface name = `<Component>Props`**, exported.
3. **Extends `React.ComponentPropsWithoutRef<typeof BaseX.Root>`** (or `typeof BaseX` for single-primary-element primitives) with `Omit<...>` for:
   - `"children"` when the wrapper generates children from an array prop (Accordion, Tabs, Select).
   - Any Base UI prop you are renaming (e.g. Dialog omits `"disablePointerDismissal"` because `dismissible` replaces it).
4. **`className?: string`** on every component (top-level override).
5. **`classNames?: { ... }`** on every component with more than one sub-part, keys named after Base UI sub-parts.
6. **`size?: "sm" | "md" | "lg"`** where size is meaningful (Dialog adds `"xl"` — allowed). Never numeric sizes.
7. **`variant?: ...`** only where there is a real visual variation story (Button, Badge-like primitives, Alert-like primitives). Do not invent variants for their own sake.
8. **Default behaviour must render a usable component with no props beyond required content** (validated requirement in `PROJECT.md`).
9. Icon overrides follow the `<part>Icon` naming convention.
10. Event handler renames use `Omit<..., "originalName">` so the public type contains exactly one.

---

## Architecture fit: single-file constraint

Every 0.5.0 component must be **one `.tsx` file, no cross-file imports from the same registry version**. The CLI copies individual files, and registry entries track dependencies explicitly. This means:

- Static helpers (size maps, class compositions) live **inside the same file**, above the component (see Dialog's `MODAL_WIDTH` / `PANEL_WIDTH`).
- If two components need the same helper (e.g. a `cn` util), copy it into both. Do not introduce a shared `utils.ts` in the version directory.
- Types used by one component's props live in the same file (e.g. `AccordionItemProps`, `SelectOption`, `TabItem` are all exported from their component files).
- The wrapper and its props interface export together. Nothing else is exported.

This constraint is non-negotiable — it's the registry architecture.

---

## Sources

- **Repo lockfile** (authoritative for installed versions): `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/pnpm-lock.yaml` — `@base-ui/react@1.1.0`, `tailwindcss@4.1.18` / `4.2.1`, `tailwind-merge@2.6.1`, `clsx@2.1.1`, `lucide-react@0.460.0`, `react@18.3.1`. Confidence: HIGH.
- **Repo `package.json` files** (root + `packages/ui`): confirm peer dep declarations and dev toolchain. Confidence: HIGH.
- **Existing 0.4.0 component sources** (the reference implementations of every pattern above):
  - `packages/ui/src/registry/versions/0.4.0/components/button.tsx` — Pattern 1 + variant maps.
  - `packages/ui/src/registry/versions/0.4.0/components/accordion.tsx` — Pattern 2 (`items` + `classNames`).
  - `packages/ui/src/registry/versions/0.4.0/components/dialog.tsx` — Pattern 3 (portal overlays) + friendly-prop translation.
  - `packages/ui/src/registry/versions/0.4.0/components/select.tsx` — Pattern 2 with nested sub-parts (Trigger / Portal / Positioner / Popup / Item).
  - `packages/ui/src/registry/versions/0.4.0/components/tabs.tsx` — Pattern 2 with handler rename (`onValueChange` → `onChange`).
  Confidence: HIGH (empirical — shipping code).
- **`.planning/PROJECT.md`**: Constraints list (`@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react` only; single-file; no inline SVG; token compatibility). Authoritative for this milestone. Confidence: HIGH.
- **Base UI public API surface** (`@base-ui/react/<component>` subpath imports, `Root` / `Trigger` / `Popup` / etc. compound shape): consistent across all 0.4.0 wrappers. Confidence: HIGH for components already wrapped in 0.4.0; MEDIUM for components new to 0.5.0 (Autocomplete, Combobox, ContextMenu, Drawer, Fieldset, Form, Menubar, Meter, NavigationMenu, NumberField, OTPField, PreviewCard, ScrollArea, Toast, Toggle, ToggleGroup, Toolbar) — their exact sub-part names need per-component verification when implementing, but they will follow the same compound shape.

### Gaps / items to verify during implementation (flagged for per-component research in later phases)

- **Autocomplete vs Combobox sub-part structure** — Base UI distinguishes the two; the `items` / `options` prop shape may need slight variation. Suggest using `options: AutocompleteOption[]` and `options: ComboboxOption[]` with slightly different fields (Autocomplete may expose a filtering function, Combobox may expose a `multiple` flag).
- **NavigationMenu** — likely has nested sub-menu structure that doesn't collapse cleanly into a flat `items` array. May need a recursive `NavItem` type with optional `children: NavItem[]`.
- **Toast** — usually requires a provider/viewport pattern (`Toast.Provider`, `Toast.Viewport`) plus an imperative `toast()` function. Needs design: does 0.5.0 expose `<Toast />` as a render component or as a provider + imperative hook? Flag for the Toast phase.
- **Drawer** — may overlap conceptually with `Dialog mode="panel"` already shipped in 0.4.0. Decide whether 0.5.0 Drawer is a distinct component or a re-export pattern. Flag for the Drawer phase.
- **Form / Fieldset / Field** — these are structural primitives, not visual ones. The wrapper value is thinner than for other components. Consider whether they deserve a wrapper or a pass-through (`export { Field } from "@base-ui/react/field"`). Flag for the form-primitives phase.
- **Tailwind v4 `@theme` + `tailwind-merge` edge cases** — if custom utility classes derived from BCT tokens ever collide with Tailwind core classes, `twMerge`'s default config may not know about them. Monitor; custom `twMerge` config is a last resort and stays out of 0.5.0 scope unless a concrete bug surfaces.
