# bct-ui 0.5.0 API Specification

> Canonical API conventions for all Phase 1–7 component implementations.
> Every component implementer must read this document before writing any component.
>
> Source of truth for: classNames slot vocabulary, icon props, ref forwarding targets,
> MenuItem discriminated union, renderItem escape hatch, and common pitfalls.

---

## 1. classNames Slot Vocabulary

The `classNames` prop uses a **closed 20-slot vocabulary**. Every 0.5.0 component uses only these names — no component-specific additions. If a sub-part does not map to a canonical slot, reconsider the component structure (D-01).

```
root | trigger | popup | backdrop | list | item | icon | indicator | label |
description | helperText | errorText | header | footer | content | title |
close | actions | cancelButton | confirmButton
```

### Slot-to-Component Mapping

| Slot | Used By (examples) | Notes |
|------|--------------------|-------|
| root | all stateful wrapper components | Outermost div/element |
| trigger | Dialog, Popover, Tooltip, Menu, Accordion | Clickable trigger element |
| popup | Dialog, Popover, Tooltip, Select, Menu | Floating/portal element |
| backdrop | Dialog, AlertDialog, Drawer | Overlay scrim |
| list | Select, Menu, Combobox | Scrollable item container |
| item | Select, Menu, Combobox, CheckboxGroup, RadioGroup | Single list row |
| icon | Button, Menu item, NumberField | Icon container/wrapper |
| indicator | Checkbox, Radio, Slider | Visual state indicator |
| label | Input, Switch, Checkbox, Radio, Field | Text label |
| description | Dialog, AlertDialog, Field, Switch | Secondary text |
| helperText | Input, Select, Field | Non-error hint text |
| errorText | Input, Select, Field | Error message |
| header | Dialog, Accordion item | Top section |
| footer | Dialog | Bottom section |
| content | Dialog, Popover, Accordion panel, Collapsible | Main body area |
| title | Dialog, AlertDialog, Popover | Title text element |
| close | Dialog, Popover | Close button |
| actions | AlertDialog | Button row container |
| cancelButton | AlertDialog | Cancel action |
| confirmButton | AlertDialog | Confirm action |

### 0.4.0 → 0.5.0 Slot Renames

| 0.4.0 slot | Component | Canonical 0.5.0 replacement |
|-----------|-----------|------------------------------|
| panel | Accordion | content |
| option | Select | item |
| switch | Switch | (no slot — base element is root) |
| thumb | Switch, Slider | indicator |
| tab | Tabs | item |
| arrow | Tooltip | (drop — arrow is sub-part of popup) |
| error | Select, Switch | errorText |

### Composition Stack

Document the composition stack pattern from CONVENTIONS.md — applied consistently across all 0.5.0 components:

```typescript
// Outermost element
className={twMerge(
  clsx("base-classes", { "conditional-class": condition }),
  classNames?.root,
  className,
)}

// Internal elements
className={twMerge("internal-base-classes", classNames?.label)}
```

---

## 2. Icon Props Convention

All icon props are typed as `React.ReactNode` — NOT `LucideIcon`. This allows consumers to pass pre-rendered JSX rather than calling the Lucide function (D-09).

| Prop | Default | Used By |
|------|---------|---------|
| triggerIcon | `<ChevronDown className="size-4" />` | Select, Accordion, Combobox |
| closeIcon | `<X className="size-4" />` | Dialog, Popover |
| checkIcon | `<Check className="size-4" />` | Checkbox |
| indicatorIcon | component-specific Lucide icon | Radio, Slider |
| incrementIcon | `<Plus className="size-4" />` | NumberField |
| decrementIcon | `<Minus className="size-4" />` | NumberField |

Resolution pattern — handle `undefined` (default), `null` (hide), and custom `ReactNode` (replace):

```typescript
// null = hide icon; undefined = use default; any ReactNode = replace
const resolvedTriggerIcon = triggerIcon === undefined
  ? <ChevronDown className="size-4" />
  : triggerIcon  // null renders nothing; ReactNode renders as-is

// In JSX:
{resolvedTriggerIcon !== null && <span className={twMerge("...", classNames?.icon)}>{resolvedTriggerIcon}</span>}
```

> **Warning:** Do NOT import `LucideIcon` type from lucide-react in any 0.5.0 component — use `React.ReactNode` exclusively.

---

## 3. Ref Forwarding Targets

All form input components use `React.forwardRef`. The table below documents the intended forwarding target for every form input in the 0.5.0 set.

| Component | forwardRef target | Native element type |
|-----------|------------------|---------------------|
| Input | `<input>` directly | HTMLInputElement |
| Switch | BaseSwitch.Root (`<button>`) | HTMLButtonElement |
| Toggle | BaseToggle.Root (`<button>`) | HTMLButtonElement |
| Checkbox | BaseCheckbox.Root (`<button>`) | HTMLButtonElement |
| Radio | BaseRadio.Root (`<button>`) | HTMLButtonElement |
| Slider | native `<input type="range">` via Base UI | HTMLInputElement |
| NumberField | native `<input>` via Base UI NumberField.Input | HTMLInputElement |
| OTPField | native `<input>` (first segment) | HTMLInputElement |
| Select | BaseSelect.Trigger (`<button>`) | HTMLButtonElement |
| Combobox | native search `<input>` | HTMLInputElement |
| Autocomplete | native search `<input>` | HTMLInputElement |

Implementation pattern:

```typescript
import { forwardRef } from "react"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <BaseInput.Root ref={ref} {...props} />
  }
)
Input.displayName = "Input"
```

> **Note:** Base UI ref forwarding targets (especially Slider, Select) must be verified against @base-ui/react 1.1.0 docs at each component's implementation phase — the table above is the design intent.

---

## 4. MenuItem Discriminated Union

The `MenuItem` type is a 7-type discriminated union on a `type` field. The canonical owner is `packages/ui/src/registry/versions/0.5.0/components/menu.tsx`. `context-menu.tsx` and `menubar.tsx` import via `import type { MenuItem } from './menu'` and declare `registryDeps: ['menu']` in registry.json (D-07).

```typescript
export type MenuItem =
  | MenuItemBasic
  | MenuItemSeparator
  | MenuItemGroup
  | MenuItemSubmenu
  | MenuItemCheck
  | MenuItemRadio
  | MenuItemRadioGroup

export interface MenuItemBasic {
  type: "item"
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

export interface MenuItemSeparator {
  type: "separator"
}

export interface MenuItemGroup {
  type: "group"
  label?: React.ReactNode
  items: Array<MenuItemBasic | MenuItemCheck | MenuItemRadio>
}

export interface MenuItemSubmenu {
  type: "submenu"
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
  items: MenuItem[]
}

export interface MenuItemCheck {
  type: "checkItem"
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

export interface MenuItemRadio {
  type: "radioItem"
  value: string
  label: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface MenuItemRadioGroup {
  type: "radioGroup"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  items: MenuItemRadio[]
}
```

> **Note:** Verify `checkItem`/`radioItem` prop names against `@base-ui/react` Menu.CheckboxItem / Menu.RadioItem APIs at Phase 6 implementation time.

---

## 5. renderItem Escape Hatch

Items-array components (`Menu`, `ContextMenu`, `Menubar`, `Select`, `Combobox`, `Autocomplete`, `CheckboxGroup`, `RadioGroup`, `ToggleGroup`, `Accordion`, `Tabs`, `Toolbar`, `NavigationMenu`) expose a `renderItem` prop for custom item rendering.

Contract:

```typescript
renderItem?: (item: MenuItem) => React.ReactNode
```

> **Note:** For non-menu items-array components (Select, Tabs, etc.), substitute the appropriate item type for `MenuItem` in the signature. The concept is identical — consumer receives item data and returns JSX.

Usage pattern:

```typescript
{items.map((item) =>
  renderItem ? renderItem(item) : <DefaultItemRenderer key={item.value} item={item} />
)}
```

> **Constraint:** Base UI's keyboard navigation and accessibility still apply. The `renderItem` result is rendered as the *children* of the Base UI item element — it does not replace the item element itself. Verify this interpretation against Base UI 1.1.0 docs at Phase 6.

---

## 6. Common Pitfalls

### Pitfall 1: Forgetting `forwards` fill-mode on closing animations

**What goes wrong:** The backdrop or popup snaps back to its pre-animation state (visible) after its animation ends, while a longer sibling animation (e.g., panel slide-out) is still running.

**Why it happens:** Without `fill-mode: forwards`, the element returns to its CSS-specified state when the animation ends. Base UI only unmounts after ALL sibling elements with animations have finished.

**How to avoid:** Every `[data-closed]` animation rule in `index.css` must end with `forwards` — e.g., `animation: fade-out 300ms ease-out forwards;`

**Warning signs:** Visible flash/snap during close transitions in the browser.

### Pitfall 2: Using `data-open:animate-*` Tailwind shorthand instead of CSS class families

**What goes wrong:** The inline `data-open:animate-animate-fade-in` pattern used in 0.4.0 AlertDialog and DropdownMenu creates non-configurable, hardcoded animations. Component-specific timing (tooltip fast vs. drawer slow) is impossible without separate class families.

**Why it happens:** Tailwind v4 supports arbitrary data attribute variants, making the inline pattern tempting.

**How to avoid:** Per D-03, all overlay animations in 0.5.0 use named CSS class families in `index.css`. The inline Tailwind pattern is deprecated.

**Warning signs:** Any `data-open:animate-*` or `data-closed:animate-*` classes appearing in 0.5.0 component source.

### Pitfall 3: Component-specific classNames slot names drift

**What goes wrong:** Different components invent their own slot names (`option`, `panel`, `thumb`, `tab`, `error`, `arrow`), breaking the single vocabulary promise and making consumers write different override patterns for each component.

**Why it happens:** Natural tendency to name slots after the Base UI sub-element they target.

**How to avoid:** Map all sub-elements to canonical slots before writing any component. If no slot fits, reconsider the component structure (D-01).

**Warning signs:** Any `classNames` key that is not in the 20-slot list appearing in a 0.5.0 component.

### Pitfall 4: MenuItem type duplication across menu variants

**What goes wrong:** `context-menu.tsx` and `menubar.tsx` define their own `ContextMenuItem`/`MenubarMenuItem` types with the same structure, causing divergence as the union grows.

**Why it happens:** Each component file is self-contained for registry distribution.

**How to avoid:** Per D-07, only `menu.tsx` owns `MenuItem`. Consumer files use `registryDeps: ["menu"]` and `import type { MenuItem } from "./menu"`. This import works because the registry CLI copies all `registryDeps` alongside the target component.

**Warning signs:** Any `MenuItem`-like interface defined outside `menu.tsx`.

### Pitfall 5: Icon prop typed as `LucideIcon` function type

**What goes wrong:** Typing `triggerIcon` as the Lucide icon function type (e.g., `LucideIcon`) prevents consumers from passing `<MyCustomIcon />` (already-rendered JSX), which is the more natural API.

**Why it happens:** Wanting type safety for Lucide icons specifically.

**How to avoid:** Type all icon props as `React.ReactNode` per D-09. The component renders the prop directly without calling it.

**Warning signs:** `import type { LucideIcon } from "lucide-react"` appearing in any 0.5.0 component.

---

## 7. Token Audit

### 7.1 Coverage Summary

Audit date: 2026-04-21. All 37 target components draw from the BCT CSS variable token set. The audit below maps each token category to its `index.css` coverage status.

| Token need | Present? | Token name |
|-----------|---------|------------|
| Backdrop overlay color | YES | --color-overlay |
| Surface colors (popup backgrounds) | YES | --color-surface-1, --color-surface-2, --color-surface-3 |
| Border color | YES | --color-border, --color-border-hover, --color-border-focus |
| Focus ring color | YES | --color-primary-focus |
| Disabled states | YES | --color-surface-1-disabled, --color-primary-disabled |
| Error states | YES | --color-error, --color-error-on, --color-error-hover, --color-error-muted |
| Success/warning/info variants | YES | All status families present |
| Typography colors | YES | --color-typography-primary, secondary, muted, inverse |
| Spacing | YES | --spacing: 0.25rem base unit |
| Border radius | YES | --radius-sm through --radius-3xl |
| Shadows (popup elevation) | YES | --shadow-sm, --shadow-md, --shadow-lg |
| Z-index layering | YES | --z-header, --z-dropdown, --z-popover, --z-tooltip, --z-dialog-backdrop, --z-dialog-popup |
| Toast z-index | GAP — FIX IN PLAN 02 | --z-toast: 120 (add above --z-dialog-backdrop) |
| Toast variant colors | YES | info/success/warning/error families all present |
| Scroll area track/thumb colors | YES | --color-surface-1, --color-primary |
| Navigation/interactive hover | YES | --color-surface-1-hover, --color-surface-2-hover |
| Progress/meter fill | YES | --color-primary, status color families |
| Slider thumb/track | YES | --color-primary, --color-surface-2, --color-border |
| OTP segment borders | YES | --color-border, --color-primary-focus |
| Separator/divider | YES | --color-divider, --color-border |
| border-muted tokens | GAP — FIX IN PLAN 02 | --color-border-muted and --color-border-muted-hover declared in @theme but NO values in :root or .dark |

### 7.2 Token Gaps and Fixes

Two gaps were identified. Both are fixed in Plan 02 (index.css edits).

**Gap 1 — Missing z-index token:**

- Token: `--z-toast`
- Problem: Toast renders above dialogs but no z-index token exists for it
- Fix: Add `--z-toast: 120;` to the `@theme` block in `index.css`, after `--z-dialog-popup: 110`

**Gap 2 — border-muted tokens with no theme values:**

- Tokens: `--color-border-muted` and `--color-border-muted-hover`
- Problem: Both tokens are declared in `@theme` (forwarding to CSS vars) but have no values set in `:root` (light) or `.dark` blocks — they resolve to empty/invalid
- Fix: Add to `:root` block: `--color-border-muted: #f0f0f0;` and `--color-border-muted-hover: #e0e0e0;`
- Fix: Add to `.dark` block: `--color-border-muted: #525252;` and `--color-border-muted-hover: #666666;`

### 7.3 Audit Verdict

**PASS with two gaps.** All 37 components can be implemented using existing BCT token variables. Two tokens require value assignments before Phase 1 begins — these are handled by Plan 02.
