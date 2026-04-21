# Phase 1: Foundation Components - Research

**Researched:** 2026-04-21
**Domain:** Base UI primitives — Button, Separator, Avatar, Progress, Meter; registry scaffolding
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Button ships exactly 9 variants: `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `text`, `icon`. The 0.4.0 `-muted` siblings are NOT carried forward. Consumers who need muted tones use `className` / `classNames` overrides.
- **D-02:** Avatar wraps Base UI Avatar primitives (`Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`) — not a custom `useState`/`onError` implementation.
- **D-03:** Avatar exposes `fallbackIcon?: React.ReactNode` defaulting to Lucide `<User />` per D-09 icon prop convention. When no `fallback` text and no `src` (or image fails), `fallbackIcon` renders.
- **D-04:** Avatar retains `size` (`sm` | `md` | `lg` | `xl`) and `shape` (`circle` | `square`) props from 0.4.0.
- **D-05:** Progress includes indeterminate state via `value={null}`. Base UI natively supports this. A pulsing animation class hooks into `[data-indeterminate]` in `index.css`. Added in Phase 1.
- **D-06:** Meter ships as single-color uniform fill only. `getSegmentStyle` color zone API is not wrapped. Color zones deferred to v2.

### Claude's Discretion

- Registry scaffold: Create `packages/ui/src/registry/versions/0.5.0/components/` and `registry.json` with entries for the 5 Phase 1 components only.
- Separator: Determine appropriate `decorative` default (likely `false` — semantic separator by default for a11y). No user input required.
- Animation class for Progress indeterminate: Claude names and implements the pulsing keyframe in `index.css` following the `bct-*` naming pattern.
- Meter visual differentiation from Progress: Claude decides (e.g., subtle color difference, no indeterminate support).

### Deferred Ideas (OUT OF SCOPE)

- Meter color zones (`zones?: { from, to, className }[]`) — v2 requirement.
- Button `-muted` variant siblings — dropped from 0.5.0 scope entirely.
- Docs site preview wrappers — Phase 7 scope.
- `apps/docs/lib/versions.ts` VALID_VERSIONS update — Phase 7 scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | `packages/ui/src/registry/versions/0.5.0/` directory structure created | Registry format fully documented from 0.4.0 reference; structure is clear |
| INFRA-02 (partial) | Phase 1 components have valid `registry.json` entries with correct `deps` and `registryDeps` | All 5 components use only locked deps; registryDeps are all empty for this phase |
| FOUND-01 | `bct add button` — Button with 9 variants and 3 sizes | 0.4.0 reference ready; variant trimming documented; Base UI Button API verified |
| FOUND-02 | `bct add separator` — Separator with `orientation` prop | Base UI Separator API verified from source; renders `<div role="separator">` |
| FOUND-03 | `bct add avatar` — Avatar with `src`, `alt`, `fallback` props | Base UI Avatar tri-part API verified; fallback enabled/hidden via `imageLoadingStatus` |
| FOUND-04 | `bct add progress` — Progress with `value`, `min`, `max` props | Base UI Progress API verified; `data-indeterminate` attribute confirmed |
| FOUND-05 | `bct add meter` — Meter with `value`, `min`, `max`, `label` props | Base UI Meter API verified; Meter.Label renders accessible label |
</phase_requirements>

---

## Summary

Phase 1 scaffolds the 0.5.0 registry directory and implements five Base UI primitive wrappers: Button, Separator, Avatar, Progress, and Meter. All five are straightforward Base UI wrapping jobs — no custom state management, no novel patterns. The primary work is (1) creating the `0.5.0/` registry directory with a `registry.json` scaffold, (2) implementing each component following the 0.5.0 API spec from Phase 0, and (3) adding a `[data-indeterminate]` pulsing animation rule to `index.css` for Progress.

The 0.4.0 Button is the strongest reference — its structure (base styles, variant map, size map, `twMerge` composition) carries forward unchanged except trimming from 16 variants to 9. Avatar requires more refactoring because the 0.4.0 version used a custom `useState`/`onError` pattern; D-02 mandates a switch to Base UI's `Avatar.Root` / `Avatar.Image` / `Avatar.Fallback` composition. Progress and Meter share an almost identical DOM structure from Base UI; the differentiator per the CONTEXT is that Meter always shows visible label text while Progress uses `label` as an `aria-label` only.

All token needs for Phase 1 components are covered by the existing `index.css` as verified in the Phase 0 token audit. The only CSS addition required is a pulsing keyframe + `[data-indeterminate]` rule for Progress indeterminate state — this does not require new CSS variables, only a new `@keyframes` block and animation rule.

**Primary recommendation:** Implement in this order — registry scaffold first, then Button (simplest, pure style work), then Separator (one-liner wrapper), then Progress + Meter together (shared track/indicator structure), then Avatar (most complex due to Base UI tri-part composition).

---

## Project Constraints (from CLAUDE.md)

These are binding for all Phase 1 work:

| Constraint | Implication for Phase 1 |
|------------|------------------------|
| Single-file `.tsx` per component | Each of the 5 components is one file; no shared utilities |
| Deps: `@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react` only | No new deps; Avatar adds `@base-ui/react` (was custom div in 0.4.0) |
| No inline SVG | Avatar fallback icon must use Lucide `<User />` — verified pattern |
| BCT token system only | No arbitrary hex/rgb values; all classes from token Tailwind map |
| `"use client"` directive required for hook-using components | Avatar (Base UI tracks `imageLoadingStatus` internally), Progress/Meter if using Base UI Root |
| Biome formatting: tabs, double quotes, no semicolons, sorted classes | All component source must pass `pnpm biome check` |
| `noUnusedImports: error` | Import exactly what is used; no wildcard star imports |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@base-ui/react` | 1.1.0 | Provides accessible primitives for Button, Separator, Avatar, Progress, Meter | Project constraint; already installed |
| `clsx` | ^2.1.1 | Conditional class composition | Project constraint; all 0.4.0 components use it |
| `tailwind-merge` | ^2.5.0 | Merge Tailwind classes without conflicts | Project constraint; enables `className` consumer override |
| `lucide-react` | ^0.460.0 | Icon source for Avatar `fallbackIcon` default | Project constraint; no inline SVG |

[VERIFIED: packages/ui/package.json]

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `tailwindcss` | ^4.1.0 | Utility class generation from BCT token CSS vars | Always — Tailwind v4 reads `index.css` `@theme` block |

[VERIFIED: packages/ui/package.json]

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Base UI Avatar | Custom `useState`/`onError` div (0.4.0 pattern) | D-02 locks Base UI — custom approach is explicitly rejected |
| Base UI Progress | Native `<progress>` element | Base UI adds ARIA, `data-indeterminate`, formatted value text — native has no `data-indeterminate` |
| Base UI Meter | Native `<meter>` element | Base UI adds structured parts (Label, Track, Indicator, Value) for styling; native is hard to style |

**Installation:** No new installation needed — all deps already in `packages/ui/package.json`.

---

## Base UI API: Verified Component Details

### Button (`@base-ui/react/button`)

[VERIFIED: node_modules/@base-ui/react/button/Button.d.ts]

- Renders `<button>` element
- Extends `NativeButtonProps` + `BaseUIComponentProps<'button', ButtonState>`
- Key extra prop: `focusableWhenDisabled?: boolean` (default `false`)
- All native button props pass through via spread
- No sub-parts — just the root element

```typescript
// Import pattern
import { Button as BaseButton } from "@base-ui/react/button"

// Props interface
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof BaseButton> {
  variant?: "primary" | "secondary" | "tertiary" | "error" | "success" | "warning" | "info" | "text" | "icon"
  size?: "sm" | "md" | "lg"
  className?: string
}
```

**No `"use client"` needed** — Button has no React hooks in our wrapper; Base UI Button itself is marked `'use client'` internally. [VERIFIED: button/Button.js inspected — internal `'use client'` directive]

### Separator (`@base-ui/react/separator`)

[VERIFIED: node_modules/@base-ui/react/separator/Separator.d.ts, Separator.js]

- Renders `<div role="separator" aria-orientation={orientation}>` — NOT `<hr>`
- Single-part component (no sub-elements)
- Props: `orientation?: "horizontal" | "vertical"` (default `"horizontal"`)
- Extends `BaseUIComponentProps<'div', Separator.State>`
- Sets data attribute `data-orientation` on the element via state attribute mapping

```typescript
// Import pattern
import { Separator as BaseSeparator } from "@base-ui/react/separator"
```

**No `"use client"` needed** — the component is purely presentational.

**Decorative default decision (Claude's discretion):** Base UI Separator always sets `role="separator"` — it is always semantic. There is no `decorative` prop on Base UI Separator 1.1.0. The BCT wrapper should not add one either; if a consumer needs a purely decorative line, they use `aria-hidden="true"` via `className` override or the spread `...props`. Default is semantic.

### Avatar (`@base-ui/react/avatar`)

[VERIFIED: node_modules/@base-ui/react/avatar/root/AvatarRoot.d.ts, avatar/image/AvatarImage.d.ts, avatar/fallback/AvatarFallback.d.ts, AvatarImage.js, AvatarFallback.js]

- **Root** (`AvatarRoot`): Renders `<span>`. Tracks `imageLoadingStatus` state (`idle | loading | loaded | error`). No props of its own beyond base.
- **Image** (`AvatarImage`): Renders `<img>`. Has `onLoadingStatusChange` callback. Internally uses `useImageLoadingStatus` hook. **Rendered only when `imageLoadingStatus === 'loaded'`** (the `enabled` prop on `useRenderElement` gates it). When loading fails, it renders nothing.
- **Fallback** (`AvatarFallback`): Renders `<span>`. Shown when `imageLoadingStatus !== 'loaded'`. Has `delay?: number` prop (ms before showing fallback). `enabled: imageLoadingStatus !== 'loaded' && delayPassed`.

**Key insight:** Base UI handles the show/hide logic internally. Both Image and Fallback are always in the component tree — Base UI controls whether they render output via the `enabled` flag. You do NOT conditionally render them in JSX.

```typescript
// Import pattern
import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
// Gives access to BaseAvatar.Root, BaseAvatar.Image, BaseAvatar.Fallback
```

**`"use client"` is required** — Avatar.Root tracks `imageLoadingStatus` via React state internally. [VERIFIED: AvatarRoot.js has `'use client'` directive]

### Progress (`@base-ui/react/progress`)

[VERIFIED: node_modules/@base-ui/react/progress/ — all .d.ts files]

- **Root** (`ProgressRoot`): `value: number | null` (null = indeterminate). `min?: number` (default 0), `max?: number` (default 100). Sets `data-indeterminate`, `data-progressing`, `data-complete` based on status.
- **Track** (`ProgressTrack`): Container div. No own props.
- **Indicator** (`ProgressIndicator`): Sets `style={{ insetInlineStart: 0, height: 'inherit', width: \`${percentageValue}%\` }}` via `getStyles()`. When `value === null`, returns `{}` (no inline style). This means the indeterminate animation must drive width via CSS keyframes, not JS.
- **Label** (`ProgressLabel`): Renders `<span>` — provides an accessible label linked to the Progress Root for ARIA.
- **Value** (`ProgressValue`): Renders `<span>` with formatted value text. Children is a function: `(formattedValue: string | null, value: number | null) => React.ReactNode`.

```typescript
import { Progress as BaseProgress } from "@base-ui/react/progress"
// Access: BaseProgress.Root, .Track, .Indicator, .Label, .Value
```

**`"use client"` required** — Progress Root uses internal React state for status tracking. [VERIFIED: ProgressRoot.js has `'use client'`]

**Indeterminate animation approach:** When `value === null`, the Indicator renders with no inline `width` style. The CSS animation must provide `width` via keyframes on `[data-indeterminate]`. A sliding-bar pattern works: animate `translateX` from `-100%` to `100%` with `width: 40%` set on the indicator via CSS (not inline style). The `[data-indeterminate]` selector on the Track or Root gates this.

### Meter (`@base-ui/react/meter`)

[VERIFIED: node_modules/@base-ui/react/meter/ — all .d.ts files, MeterIndicator.js]

- **Root** (`MeterRoot`): `value: number` (NOT nullable — Meter has no indeterminate). `min?: number` (default 0), `max?: number` (default 100). No status data attributes (verified: no stateAttributesMapping in Meter indicator JS).
- **Track** (`MeterTrack`): Container div.
- **Indicator** (`MeterIndicator`): Sets `style={{ insetInlineStart: 0, height: 'inherit', width: \`${percentageWidth}%\` }}` — always has a numeric width.
- **Label** (`MeterLabel`): Renders `<span>` — visible label text (contrast to Progress where label is ARIA-only).
- **Value** (`MeterValue`): Renders `<span>` with formatted value. Children is `(formattedValue: string, value: number) => React.ReactNode`.

```typescript
import { Meter as BaseMeter } from "@base-ui/react/meter"
// Access: BaseMeter.Root, .Track, .Indicator, .Label, .Value
```

**`"use client"` required** — Meter Root has `'use client'` directive. [VERIFIED: MeterRoot.js]

**Key difference from Progress:** `MeterRoot.value` is `number`, not `number | null`. Meter cannot be indeterminate. The BCT wrapper should enforce this with `value: number` (not nullable) in its props interface.

---

## Architecture Patterns

### Recommended Project Structure

```
packages/ui/src/registry/versions/0.5.0/
├── components/
│   ├── button.tsx
│   ├── separator.tsx
│   ├── avatar.tsx
│   ├── progress.tsx
│   └── meter.tsx
└── registry.json
```

### Pattern 1: Registry Scaffold

The 0.5.0 `registry.json` follows the exact same structure as `0.4.0/registry.json` — a flat object keyed by component slug.

[VERIFIED: packages/ui/src/registry/versions/0.4.0/registry.json]

```json
{
  "button": {
    "title": "Button",
    "description": "...",
    "category": "form-inputs",
    "files": [{ "src": "components/button.tsx", "dst": "button.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  },
  "separator": {
    "title": "Separator",
    "description": "...",
    "category": "display",
    "files": [{ "src": "components/separator.tsx", "dst": "separator.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  },
  "avatar": {
    "title": "Avatar",
    "description": "...",
    "category": "display",
    "files": [{ "src": "components/avatar.tsx", "dst": "avatar.tsx" }],
    "deps": ["@base-ui/react", "clsx", "lucide-react", "tailwind-merge"],
    "registryDeps": []
  },
  "progress": {
    "title": "Progress",
    "description": "...",
    "category": "feedback",
    "files": [{ "src": "components/progress.tsx", "dst": "progress.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  },
  "meter": {
    "title": "Meter",
    "description": "...",
    "category": "feedback",
    "files": [{ "src": "components/meter.tsx", "dst": "meter.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  }
}
```

**Note on `lucide-react` dep:** Only Avatar needs it (for the `<User />` fallback icon default). Button, Separator, Progress, Meter do not use Lucide in their base implementation.

### Pattern 2: Component File Structure

All 0.5.0 components follow this file organization pattern from CONVENTIONS.md:

[VERIFIED: packages/ui/src/registry/versions/0.4.0/components/button.tsx]

```typescript
// 1. "use client" (only if component uses hooks or wraps hook-using Base UI parts)
"use client"

// 2. External library imports (alphabetical within group)
import { SomeBase } from "@base-ui/react/some-base"
import clsx from "clsx"
import { IconName } from "lucide-react"    // only if needed
import type * as React from "react"
import { twMerge } from "tailwind-merge"

// 3. ─── Constants ──────────────────────────────────────────────────────────────
const VARIANT_STYLES: Record<string, string> = { ... }
const SIZE_STYLES: Record<string, string> = { ... }

// 4. ─── Props ─────────────────────────────────────────────────────────────────
export interface ComponentProps
  extends React.ComponentPropsWithoutRef<typeof SomeBase> {
  // BCT-added props
  variant?: "..."
  classNames?: {
    root?: string
    // ... canonical slot names only
  }
}

// 5. ─── Component ─────────────────────────────────────────────────────────────
export function ComponentName({
  variant = "primary",
  classNames,
  className,
  children,
  ...props
}: ComponentProps) {
  return (
    <SomeBase
      className={twMerge(
        clsx(VARIANT_STYLES[variant]),
        classNames?.root,
        className,
      )}
      {...props}
    >
      {children}
    </SomeBase>
  )
}
```

### Pattern 3: Composition Stack

From API-SPEC.md and CONVENTIONS.md:

[VERIFIED: .planning/phases/00-preparation-api-design/00-API-SPEC.md, .planning/codebase/CONVENTIONS.md]

```typescript
// Outermost element (receives both classNames?.root and className)
className={twMerge(
  clsx("base-classes", { "conditional-class": condition }),
  classNames?.root,
  className,
)}

// Internal elements (receive only classNames?.slot)
className={twMerge("internal-base-classes", classNames?.label)}
```

### Pattern 4: Button Variant / Size Maps (carried from 0.4.0, trimmed)

[VERIFIED: packages/ui/src/registry/versions/0.4.0/components/button.tsx]

The icon variant size map pattern handles square sizing:

```typescript
const SIZE_STYLES: Record<string, string> = {
  sm: variant === "icon" ? "h-8 w-8 p-0" : "h-8 px-3 text-sm",
  md: variant === "icon" ? "h-10 w-10 p-0" : "h-10 px-4 text-base",
  lg: variant === "icon" ? "h-12 w-12 p-0" : "h-12 px-6 text-lg",
}
```

### Pattern 5: Avatar with Base UI Tri-Part Composition

[VERIFIED: AvatarRoot.d.ts, AvatarImage.d.ts, AvatarFallback.d.ts, AvatarImage.js, AvatarFallback.js]

```typescript
"use client"
import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import clsx from "clsx"
import { User } from "lucide-react"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

const SIZE_STYLES: Record<string, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
}
const SHAPE_STYLES: Record<string, string> = {
  circle: "rounded-full",
  square: "rounded-md",
}
const ICON_SIZE_STYLES: Record<string, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
}

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof BaseAvatar.Root> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  fallbackIcon?: React.ReactNode   // default: <User />; null = hide icon
  size?: "sm" | "md" | "lg" | "xl"
  shape?: "circle" | "square"
  className?: string
  classNames?: {
    root?: string
    image?: string
    fallback?: string
    // Note: image and fallback are documented exceptions to the canonical 20-slot vocabulary.
    // classNames.icon is intentionally omitted — icon sizing is controlled by ICON_SIZE_STYLES[size].
  }
}

export function Avatar({
  src,
  alt,
  fallback,
  fallbackIcon = <User />,
  size = "md",
  shape = "circle",
  className,
  classNames,
  ...props
}: AvatarProps) {
  const derivedInitials =
    alt != null
      ? alt
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : null

  const fallbackContent = fallback ?? derivedInitials

  return (
    <BaseAvatar.Root
      className={twMerge(
        clsx(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-surface-2",
          SIZE_STYLES[size],
          SHAPE_STYLES[shape],
        ),
        classNames?.root,
        className,
      )}
      {...props}
    >
      <BaseAvatar.Image
        src={src ?? ""}
        alt={alt ?? "Avatar"}
        className={twMerge("size-full object-cover", classNames?.image)}
      />
      <BaseAvatar.Fallback
        className={twMerge(
          "flex items-center justify-center font-medium text-typography-primary",
          classNames?.fallback,
        )}
      >
        {fallbackContent != null ? (
          fallbackContent
        ) : fallbackIcon != null ? (
          <span className={ICON_SIZE_STYLES[size]}>{fallbackIcon}</span>
        ) : null}
      </BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}
```

**Critical:** Base UI shows Image only when loaded and Fallback when not loaded — both are always in the JSX tree, Base UI controls rendering. Do not add conditional rendering around them.

### Pattern 6: Progress Indeterminate Animation

[VERIFIED: progress/root/ProgressRootDataAttributes.js — `data-indeterminate` is the exact attribute name]

The indicator renders no inline `width` when `value === null`. The CSS animation must supply width and motion.

Animation to add to `index.css` (following `bct-*` naming pattern):

```css
/* ─── BCT Progress animations ─────────────────────────────────────────────────── */

@keyframes progress-indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(250%);
  }
}

.bct-progress-track[data-indeterminate] .bct-progress-indicator {
  width: 40%;
  animation: progress-indeterminate 1.4s ease-in-out infinite;
}
```

However, the cleaner approach (avoids class coupling between parent and child selectors) is to target the indicator directly:

```css
.bct-progress-indicator[data-indeterminate] {
  width: 40%;
  animation: progress-indeterminate 1.4s ease-in-out infinite;
}
```

Since Base UI propagates the progress state to all sub-elements via `stateAttributesMapping`, the `data-indeterminate` attribute is present on both Root and Indicator when `value === null`. Either selector works. Use the indicator-direct approach for cleaner CSS.

**Alternative (simpler):** Apply `animate-pulse` Tailwind class conditionally on the track when indeterminate — but this conflicts with the "CSS class families in index.css" pattern from D-03. Use the keyframe approach.

### Anti-Patterns to Avoid

- **Conditional JSX around Avatar.Image / Avatar.Fallback:** Base UI gates rendering internally via `enabled`. Wrapping with `{src && <BaseAvatar.Image />}` prevents the src from loading at all. Always render Avatar.Image and Avatar.Fallback unconditionally in the JSX tree.
- **Inline `style` for Progress indeterminate width:** The Indicator JS already returns `{}` (empty object) when value is null, which means no inline width. Don't set a width via inline `style` on the wrapper — use CSS only.
- **Custom classNames slot names:** Avatar's `image` and `fallback` slots are not in the canonical 20-slot list. This is a known necessary deviation for Avatar's specific sub-elements. All other slots (`root`, `icon`) are canonical. Flag this as a documented exception.
- **Using the 0.4.0 `track` classNames slot name from Progress:** The canonical vocabulary has no `track` slot. The 0.5.0 Progress wrapper uses `root` (outermost div), `label`, and `indicator` — no `track` slot exposed to consumers (the track div is an internal implementation detail).
- **Forgetting `"use client"` on Avatar, Progress, and Meter:** All three use Base UI internals that have `'use client'`. The wrapper files must include `"use client"` at the top.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Avatar image load/error tracking | Custom `useState`/`onError` | `BaseAvatar.Image` + `BaseAvatar.Fallback` | Base UI handles status state, SSR-safe load detection, and delay fallback |
| Progress ARIA (`aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext`) | Manual aria prop spreading | `BaseProgress.Root` | Base UI generates correct ARIA automatically from `value`, `min`, `max`, `format` |
| Meter ARIA | Manual aria prop spreading | `BaseMeter.Root` | Same as Progress |
| Separator semantics | Raw `<div>` or `<hr>` | `BaseSeparator` | Base UI sets `role="separator"` and `aria-orientation` correctly |
| Progress indicator width calculation | `style={{ width: (value/max)*100 + '%' }}` | `BaseProgress.Indicator` | Already done by Base UI internally; double-calculating causes conflicts |

**Key insight:** For these five components, all ARIA and state management is handled by Base UI's internal hooks. The BCT wrapper's job is styling and prop simplification only.

---

## Common Pitfalls

### Pitfall 1: Avatar renders both Image and Fallback simultaneously

**What goes wrong:** Developer conditions `{src && <BaseAvatar.Image />}` thinking this is necessary. Base UI already conditionally renders Image (only when `imageLoadingStatus === 'loaded'`). Adding a JSX condition means if `src` is provided but the image hasn't loaded yet, Base UI's `imageLoadingStatus` never advances past `idle` because the Image element is not in the tree to trigger the load.

**Why it happens:** Natural instinct from working with raw `<img>` elements.

**How to avoid:** Always render both `BaseAvatar.Image` and `BaseAvatar.Fallback` in the JSX tree. Let Base UI control visibility.

**Warning signs:** Avatar always shows fallback even when `src` is valid.

### Pitfall 2: Progress indicator width fighting Base UI's inline style

**What goes wrong:** Setting a CSS class like `w-1/2` on the Indicator competes with Base UI's inline `style={{ width: '50%' }}`. Since inline styles have higher specificity than class-based styles, CSS classes cannot override the width.

**Why it happens:** Tailwind-first thinking — reaching for `w-*` classes.

**How to avoid:** For Progress indicator width, only use the inline style supplied by Base UI. The indeterminate animation must operate via a CSS keyframe that overrides the empty inline style (which Base UI sets to `{}` when indeterminate). Use `animation` instead of `width` utilities.

**Warning signs:** Indeterminate progress bar is invisible (zero width from Base UI's `{}`) or has a fixed width that doesn't animate.

### Pitfall 3: classNames slot name `track` used for Progress

**What goes wrong:** The 0.4.0 Progress exposed `classNames.track`. The 0.5.0 canonical slot vocabulary does not have `track`. Using it in 0.5.0 breaks the closed 20-slot vocabulary promise.

**Why it happens:** Direct copy from 0.4.0 Progress component.

**How to avoid:** The Track element is an internal implementation detail — do not expose it as a `classNames` slot in 0.5.0. Expose only `root`, `label`, and `indicator`. If consumers need to style the track, they use `className` (which targets the outermost root element) or the `render` prop from Base UI if needed.

**Warning signs:** `classNames?: { track?: string }` appearing in 0.5.0 Progress props.

### Pitfall 4: Forgetting `"use client"` on Avatar / Progress / Meter

**What goes wrong:** Next.js throws "You're importing a component that needs useState / useEffect" error at build time because the wrapper file lacks `"use client"` but Base UI internals use React hooks.

**Why it happens:** Not noticing that the Base UI source files have `'use client'` but the wrapper does not.

**How to avoid:** All three components (Avatar, Progress, Meter) require `"use client"` as the first line of their `.tsx` files.

**Warning signs:** Runtime or build error in Next.js App Router context.

### Pitfall 5: Biome `useSortedClasses` error on clsx arguments

**What goes wrong:** Biome flags unsorted Tailwind class strings inside `clsx()` calls as errors because `useSortedClasses` is set to `error` level.

**Why it happens:** Writing classes in a logical human order rather than Tailwind's canonical sort order.

**How to avoid:** Run `pnpm biome check --write packages/ui/src/registry/versions/0.5.0/components/*.tsx` after writing each component to auto-fix class ordering. Do not hand-sort — let Biome's autofix handle it.

**Warning signs:** CI fails with "useSortedClasses" violations.

### Pitfall 6: Avatar `fallbackIcon` default JSX causing Biome lint issues

**What goes wrong:** Using `{ fallbackIcon = <User /> }` in destructuring with a `React.ReactNode` type may require the `lucide-react` `User` import to be present — if unused (e.g., when all callers pass their own icon), Biome's `noUnusedImports` will still flag it because the default is always imported.

**Why it happens:** Default parameter JSX imports are always "used" in the source, so this is actually safe. However, the import statement must be exactly `import { User } from "lucide-react"` — not a type import.

**How to avoid:** Always include `import { User } from "lucide-react"` in avatar.tsx — not `import type`.

---

## Code Examples

### registry.json entry format

[VERIFIED: packages/ui/src/registry/versions/0.4.0/registry.json]

```json
{
  "button": {
    "title": "Button",
    "description": "Accessible button with 9 variants and 3 sizes. Built on Base UI with BCT design tokens.",
    "category": "form-inputs",
    "files": [{ "src": "components/button.tsx", "dst": "button.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  }
}
```

### Button 0.5.0 variant map (trimmed from 0.4.0)

[VERIFIED: packages/ui/src/registry/versions/0.4.0/components/button.tsx — structure carried forward]

```typescript
const VARIANT_STYLES: Record<string, string> = {
  primary: clsx(
    "bg-primary text-primary-on shadow-sm",
    "hover:bg-primary-hover",
    "active:scale-[0.98] active:bg-primary-focus",
  ),
  secondary: clsx(
    "bg-secondary text-secondary-on shadow-sm",
    "hover:bg-secondary-hover",
    "active:scale-[0.98] active:bg-secondary-focus",
  ),
  tertiary: clsx(
    "border border-border bg-tertiary text-tertiary-on",
    "hover:border-border-hover hover:bg-tertiary-hover",
    "active:scale-[0.98] active:bg-tertiary-focus",
  ),
  error: clsx(
    "bg-error text-error-on shadow-sm",
    "hover:bg-error-hover",
    "active:scale-[0.98] active:bg-error-hover",
  ),
  success: clsx(
    "bg-success text-success-on shadow-sm",
    "hover:bg-success-hover",
    "active:scale-[0.98] active:bg-success-hover",
  ),
  warning: clsx(
    "bg-warning text-warning-on shadow-sm",
    "hover:bg-warning-hover",
    "active:scale-[0.98] active:bg-warning-hover",
  ),
  info: clsx(
    "bg-info text-info-on shadow-sm",
    "hover:bg-info-hover",
    "active:scale-[0.98] active:bg-info-hover",
  ),
  text: clsx(
    "text-typography-primary",
    "hover:bg-accent",
    "active:scale-[0.98] active:bg-accent",
  ),
  icon: clsx(
    "text-typography-primary",
    "hover:bg-accent",
    "active:scale-[0.98] active:bg-accent",
  ),
}
```

**Note on `text` and `icon` using `bg-accent`:** The 0.4.0 source uses this pattern. Verify that `bg-accent` is a valid Tailwind token in the BCT system. [ASSUMED — could not find `--color-accent` in index.css without a specific single-token name; 0.4.0 uses it so it likely maps to one of the `accent-*` tokens]. Use `hover:bg-surface-1-hover` as a safe fallback if `bg-accent` produces no styles.

### Separator 0.5.0

```typescript
import { Separator as BaseSeparator } from "@base-ui/react/separator"
import clsx from "clsx"
import type * as React from "react"
import { twMerge } from "tailwind-merge"

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof BaseSeparator> {
  className?: string
  classNames?: {
    root?: string
  }
}

export function Separator({
  orientation = "horizontal",
  className,
  classNames,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      orientation={orientation}
      className={twMerge(
        clsx({
          "h-px w-full bg-border": orientation === "horizontal",
          "h-full w-px bg-border": orientation === "vertical",
        }),
        classNames?.root,
        className,
      )}
      {...props}
    />
  )
}
```

**Note:** Using `bg-border` (maps to `--color-border`) rather than `bg-divider` (maps to `--color-divider: rgba(10,10,10,0.1)`). Divider is more transparent; border is more visible. Either is acceptable — Claude's discretion. The 0.4.0 Divider component used `bg-divider`. For a Separator that is a structural separator, `bg-border` is slightly more distinct.

### Progress indeterminate CSS addition to index.css

```css
/* ─── BCT Progress animations ────────────────────────────────────────────────── */

@keyframes progress-indeterminate-slide {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(400%);
  }
}

.bct-progress-indicator[data-indeterminate] {
  width: 35%;
  animation: progress-indeterminate-slide 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Why 35% width:** Visible enough to see motion without looking like a full bar. Standard indeterminate progress bar convention.
**Why `cubic-bezier(0.4, 0, 0.6, 1)`:** Ease-in-out feel that mirrors the BCT `--ease-in-out` token.

---

## Token Coverage for Phase 1 Components

[VERIFIED: Phase 0 token audit in 00-API-SPEC.md — all tokens below confirmed present]

| Component | Token Used | CSS Variable |
|-----------|-----------|--------------|
| Button (primary) | `bg-primary`, `text-primary-on`, `hover:bg-primary-hover` | `--color-primary`, etc. |
| Button (tertiary) | `border-border`, `bg-tertiary` | `--color-border`, `--color-tertiary` |
| Button (focus ring) | `ring-primary-focus` | `--color-primary-focus` |
| Button (disabled) | `disabled:opacity-50` | N/A (Tailwind opacity) |
| Separator | `bg-border` or `bg-divider` | `--color-border` or `--color-divider` |
| Avatar (container) | `bg-surface-2` | `--color-surface-2` |
| Avatar (fallback text) | `text-typography-primary` | `--color-typography-primary` |
| Avatar (fallback icon) | `text-typography-muted` | `--color-typography-muted` |
| Progress (track) | `bg-surface-2` | `--color-surface-2` |
| Progress (indicator) | `bg-primary` | `--color-primary` |
| Progress (label) | `text-typography-primary` | `--color-typography-primary` |
| Meter (track) | `bg-surface-2` (or `bg-surface-3` to differentiate) | `--color-surface-2/3` |
| Meter (indicator) | `bg-primary` (or accent color to differentiate from Progress) | `--color-primary` |
| Meter (label) | `text-typography-primary` | `--color-typography-primary` |

**No missing tokens** — Phase 0 audit confirmed all required variables are present in index.css. [VERIFIED: 00-API-SPEC.md §7.1 — Audit Verdict: PASS]

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 0.4.0 Avatar: custom `useState`/`onError` on `<div>` | 0.5.0 Avatar: Base UI `Avatar.Root`/`Image`/`Fallback` | Phase 1 (D-02) | More robust; SSR-safe; handles image load race conditions |
| 0.4.0 Progress: manual `style={{ width: \`${value}%\` }}` on indicator | 0.5.0 Progress: Base UI Indicator handles width via its own inline style | Phase 1 | ARIA-complete; indeterminate support via `value={null}` |
| 0.4.0 Button: 16 variants including `-muted` siblings | 0.5.0 Button: 9 variants, clean set | Phase 1 (D-01) | Simpler API; muted tones via `classNames` if needed |
| 0.4.0: No Separator (used custom Divider) | 0.5.0: Base UI Separator (`role="separator"`, `aria-orientation`) | Phase 1 | Semantic HTML; screen reader accessible |
| 0.4.0: No Meter | 0.5.0: Base UI Meter | Phase 1 | Distinct from Progress; non-nullable value |

---

## Open Questions (RESOLVED)

1. **`bg-accent` token validity** (RESOLVED)
   - What we know: 0.4.0 Button `text` and `icon` variants use `hover:bg-accent`. The index.css `@theme` has `accent-1` through `accent-4` but no bare `accent`.
   - Resolution: `bg-accent` has no mapping in index.css — confirmed no bare `--color-accent` variable. Plan 01-02 uses `hover:bg-surface-1-hover` for `text` and `icon` variants (per XCUT-01). See 01-02-PLAN.md Task 1 action.

2. **Meter visual differentiation from Progress** (RESOLVED)
   - What we know: Claude's discretion to decide. CONTEXT suggests "subtle color difference, no indeterminate support."
   - Resolution: Meter uses `h-3` track height (vs Progress `h-2`), `bg-surface-2` track background (vs Progress `bg-border`), and `bg-primary` single-color fill. Height differentiation is the primary signal per 01-UI-SPEC.md visual differentiation rules. See 01-03-PLAN.md Task 3 action.

3. **Avatar `classNames.image` and `classNames.fallback` slot names are not in the canonical 20-slot vocabulary** (RESOLVED)
   - What we know: The canonical slots are a closed list. `image` and `fallback` are not in it.
   - Resolution: `image` and `fallback` are used as documented exceptions — Avatar's tri-part structure does not map cleanly to canonical slots. This is explicitly noted in 01-03-PLAN.md Task 1 action and the plan's `<interfaces>` block. `classNames.icon` is intentionally NOT exposed (Claude's discretion — icon sizing is controlled by `ICON_SIZE_STYLES[size]`).
---

## Environment Availability

Step 2.6: SKIPPED — Phase 1 is code/config authoring only. No external services, databases, CLI utilities, or runtimes beyond the existing project toolchain are required. The project's pnpm + Biome + TypeScript tools are already verified as present from Phase 0.

---

## Validation Architecture

nyquist_validation is enabled (absent from config treated as enabled, and config.json confirms `"nyquist_validation": true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Biome (linter/formatter) + TypeScript (`tsc --noEmit`) |
| Config file | `biome.json` (root) |
| Quick run command | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/ --write` |
| Full suite command | `pnpm biome check packages/ui/src/registry/versions/0.5.0/ && pnpm typecheck` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFRA-01 | 0.5.0/ directory exists with registry.json | automated | `ls packages/ui/src/registry/versions/0.5.0/registry.json` | ❌ Wave 0 |
| INFRA-02 | registry.json has correct schema for 5 components | automated | `node -e "const r=require('./packages/ui/src/registry/versions/0.5.0/registry.json'); ['button','separator','avatar','progress','meter'].forEach(k=>{if(!r[k])throw new Error(k+' missing')}); console.log('OK')"` | ❌ Wave 0 |
| FOUND-01 | button.tsx exports `Button` with variant + size props | automated | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/button.tsx && pnpm typecheck` | ❌ Wave 0 |
| FOUND-02 | separator.tsx exports `Separator` with orientation prop | automated | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/separator.tsx` | ❌ Wave 0 |
| FOUND-03 | avatar.tsx exports `Avatar` with src/alt/fallback props | automated | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/avatar.tsx` | ❌ Wave 0 |
| FOUND-04 | progress.tsx exports `Progress` with value/min/max + indeterminate | automated | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/progress.tsx` | ❌ Wave 0 |
| FOUND-05 | meter.tsx exports `Meter` with value/min/max/label props | automated | `pnpm biome check packages/ui/src/registry/versions/0.5.0/components/meter.tsx` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `pnpm biome check packages/ui/src/registry/versions/0.5.0/`
- **Per wave merge:** `pnpm biome check packages/ui/src/registry/versions/0.5.0/ && cd packages/ui && pnpm typecheck`
- **Phase gate:** All 5 component files pass Biome + TypeScript before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `packages/ui/src/registry/versions/0.5.0/` directory — must be created before any component file
- [ ] `packages/ui/src/registry/versions/0.5.0/registry.json` — scaffold file with 5 entries
- [ ] `packages/ui/src/registry/versions/0.5.0/components/` — directory for component files

No new test framework installation needed — Biome and TypeScript are already configured at the monorepo root.

---

## Security Domain

Security enforcement is not explicitly disabled (`security_enforcement` key absent from config.json). However, Phase 1 components are purely presentational React components with no authentication, session handling, data persistence, user input processing, or network calls. They accept style props and children.

**Applicable ASVS categories for Phase 1:**

| ASVS Category | Applies | Rationale |
|---------------|---------|-----------|
| V2 Authentication | No | No auth logic in display/primitive components |
| V3 Session Management | No | No session state |
| V4 Access Control | No | No access gating |
| V5 Input Validation | Minimal | `className` / `classNames` props accept strings — no XSS risk since React escapes attribute values; `children` is `React.ReactNode` which is inherently safe |
| V6 Cryptography | No | No crypto |

**Threat patterns:** None applicable to this phase. All five components render styled HTML elements with no data processing, API calls, or dynamic script execution. XSS via className is not possible in React because className values are set as DOM attributes (not innerHTML).

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `bg-accent` in 0.4.0 Button maps to a valid BCT token in Tailwind v4 | Code Examples (Button variant map) | `text` and `icon` variants have no hover background; easily fixed by substituting `hover:bg-surface-1-hover` |
| A2 | `"use client"` on the wrapper file is sufficient for Next.js App Router; no explicit boundary needed | Architecture Patterns | If wrong, consumers would need to wrap components in their own `"use client"` boundary; low risk since this is the standard pattern for all Base UI React components |
| A3 | Biome `useSortedClasses` autofix handles class ordering inside `clsx()` arguments | Common Pitfalls | If autofix doesn't handle clsx, implementer must manually sort; can be verified by running `pnpm biome check --write` on first component |

---

## Sources

### Primary (HIGH confidence)
- `node_modules/.pnpm/@base-ui+react@1.1.0.../button/Button.d.ts` — Button props API
- `node_modules/.pnpm/@base-ui+react@1.1.0.../separator/Separator.d.ts`, `Separator.js` — Separator props + role/aria
- `node_modules/.pnpm/@base-ui+react@1.1.0.../avatar/` — AvatarRoot.d.ts, AvatarImage.d.ts, AvatarFallback.d.ts, AvatarImage.js, AvatarFallback.js — Avatar full API and behavior
- `node_modules/.pnpm/@base-ui+react@1.1.0.../progress/` — all .d.ts + ProgressRootDataAttributes.js + ProgressIndicator.js — Progress API, data-indeterminate, indicator width behavior
- `node_modules/.pnpm/@base-ui+react@1.1.0.../meter/` — all .d.ts + MeterIndicator.js — Meter API, non-nullable value, indicator width
- `packages/ui/src/registry/versions/0.4.0/registry.json` — Registry JSON schema
- `packages/ui/src/registry/versions/0.4.0/components/button.tsx` — Button implementation reference
- `packages/ui/src/registry/versions/0.4.0/components/avatar.tsx` — Avatar props/maps reference
- `packages/ui/src/registry/versions/0.4.0/components/progress.tsx` — Progress reference
- `packages/ui/src/assets/tokens/index.css` — Full token set confirmed
- `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — API conventions, classNames vocabulary, composition stack
- `.planning/codebase/CONVENTIONS.md` — Code conventions

### Secondary (MEDIUM confidence)
- `.planning/phases/00-preparation-api-design/00-REVIEW.md` — Phase 0 code review findings (animation patterns)
- `.planning/phases/01-foundation-components/01-CONTEXT.md` — Locked decisions D-01 through D-06

### Tertiary (LOW confidence)
- A1: `bg-accent` token validity — inferred from 0.4.0 usage, not verified by CSS compilation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified in package.json and node_modules
- Base UI APIs: HIGH — all five component APIs verified from installed source `.d.ts` and `.js` files
- Architecture: HIGH — patterns verified from 0.4.0 components and CONVENTIONS.md
- Progress indeterminate animation: HIGH — `data-indeterminate` attribute confirmed from source; animation approach standard
- Pitfalls: HIGH — derived from direct inspection of Base UI source behavior

**Research date:** 2026-04-21
**Valid until:** 2026-07-21 (Base UI stable; 90-day horizon reasonable for a 1.x release)
