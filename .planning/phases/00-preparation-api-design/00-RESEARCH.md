# Phase 0: Preparation & API Design - Research

**Researched:** 2026-04-21
**Domain:** API convention design, CSS token audit, animation class authoring
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** The canonical slot vocabulary is a **closed list** — components use only these named slots, no component-specific extras.
- **D-02:** Final canonical slot list (20 slots): `root`, `trigger`, `popup`, `backdrop`, `list`, `item`, `icon`, `indicator`, `label`, `description`, `helperText`, `errorText`, `header`, `footer`, `content`, `title`, `close`, `actions`, `cancelButton`, `confirmButton`
- **D-03:** All overlay open/close animations use CSS classes in `index.css` with `[data-open]` / `[data-closed]` selectors — the `data-open:animate-*` inline Tailwind pattern from 0.4.0 AlertDialog and DropdownMenu is **deprecated** for 0.5.0.
- **D-04:** Animation class naming is **component-specific**: each overlay type gets its own family (`.bct-drawer-bottom`, `.bct-tooltip-popup`, `.bct-toast-item`, etc.) to allow per-component timing curves.
- **D-05:** All new animation class families must use `forwards` fill-mode on `[data-closed]` rules.
- **D-06:** `MenuItem` type is a **7-type discriminated union** on a `type` field: `item | separator | group | submenu | checkItem | radioItem | radioGroup`
- **D-07:** `menu.tsx` is the **canonical owner** of the `MenuItem` union. `context-menu.tsx` and `menubar.tsx` import from `./menu` via `import type { MenuItem } from "./menu"`. No type duplication.
- **D-08:** `renderItem` escape hatch contract: `renderItem?: (item: MenuItem) => React.ReactNode` — applied at item level, Base UI still handles keyboard/a11y.
- **D-09:** Icon props typed as `React.ReactNode`. Named override pattern: `triggerIcon`, `closeIcon`, `checkIcon`, `indicatorIcon`, `incrementIcon`, `decrementIcon`. Defaults are Lucide; `null` hides icon; any `ReactNode` replaces it.
- **D-10:** API spec lives as planning artifact at `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — not shipped with the package.

### Claude's Discretion

- Token audit format (PREP-02): Structure the audit output in `00-API-SPEC.md` as a checklist or table mapping each of the 37 components' CSS variable needs against `index.css`.
- Ref forwarding targets (PREP-04): Document the obvious mapping (Input → `<input>`, Select → `<select>`, Slider → `<input type="range">`, etc.) without needing user input per component.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PREP-01 | Canonical `classNames` slot vocabulary defined before any component is written | Slot inventory from 0.4.0 codebase audit + D-02 locked list |
| PREP-02 | Token audit — every CSS variable needed by all 37 components present in `index.css` | Full `index.css` read; token coverage matrix in Architecture Patterns section |
| PREP-03 | Animation CSS classes for overlay open/close standardized in `index.css` | Existing `.bct-dialog-*` pattern read; gap list identified for all overlay families |
| PREP-04 | API conventions documented — icon props, ref forwarding, `MenuItem` union, `renderItem` | Patterns extracted from 0.4.0 components; all decisions locked in CONTEXT.md |
</phase_requirements>

---

## Summary

Phase 0 is a **documentation and CSS authoring phase** — no React components are built. Its three deliverables are: (1) a written API spec (`00-API-SPEC.md`) capturing the locked conventions, (2) token audit confirming `index.css` coverage for all 37 target components, and (3) new animation CSS class families stubbed into `index.css` for every overlay type that Phases 5–7 will consume.

The 0.4.0 codebase provides the complete reference. The `index.css` file is already comprehensive: it contains all color semantic tokens, spacing, typography, radius, shadow, blur, z-index, and a full keyframe library. The gap analysis (see below) shows that most required keyframes are already present — `slide-in-from-right/left`, `fade-in/out`, `scale-in/out` all exist. What is missing are the **named CSS class families** for Drawer (top/bottom variants), Tooltip, Popover/PreviewCard, and Toast, as well as potential top/bottom slide keyframes for Drawer.

The 0.4.0 codebase also reveals a consistent inconsistency in slot naming that Phase 0 must resolve: `panel`, `option`, `switch`, `thumb`, `tab`, `arrow` are used as classNames keys in 0.4.0 but are not canonical 0.5.0 slots. These must be remapped or consolidated as part of the spec.

**Primary recommendation:** Write `00-API-SPEC.md` first (it documents the locked decisions), then perform the token audit by walking all 37 component requirements against the current `index.css`, then author all missing animation class families into `index.css` before Phase 1 starts.

---

## Standard Stack

Phase 0 produces only planning artifacts and one CSS file edit. No new npm packages are installed.

### Authoring Environment
| Tool | Version | Purpose |
|------|---------|---------|
| `packages/ui/src/assets/tokens/index.css` | existing | Target file for new animation classes |
| `.planning/phases/00-preparation-api-design/00-API-SPEC.md` | new file | Canonical spec document |

### Key Libraries (informational — all already installed)
| Library | Purpose |
|---------|---------|
| `@base-ui/react` | Sets `data-open` / `data-closed` attributes on overlay elements |
| `tailwindcss` v4 | Consumes animation classes defined in `index.css` via Tailwind `@layer` |
| `lucide-react` | Default icon source for all icon-prop defaults |

---

## Architecture Patterns

### Pattern 1: classNames Slot Interface (PREP-01)

Every 0.5.0 component's `classNames` prop uses **only** the 20 canonical slot names. The mapping below resolves the 0.4.0 naming drift.

**Canonical slot list and component mapping:**

| Slot | Used By (examples) | Notes |
|------|--------------------|-------|
| `root` | all stateful wrapper components | Outermost div/element |
| `trigger` | Dialog, Popover, Tooltip, Menu, Accordion | Clickable trigger element |
| `popup` | Dialog, Popover, Tooltip, Select, Menu | Floating/portal element |
| `backdrop` | Dialog, AlertDialog, Drawer | Overlay scrim |
| `list` | Select, Menu, Combobox | Scrollable item container |
| `item` | Select, Menu, Combobox, CheckboxGroup, RadioGroup | Single list row |
| `icon` | Button, Menu item, NumberField | Icon container/wrapper |
| `indicator` | Checkbox, Radio, Slider | Visual state indicator |
| `label` | Input, Switch, Checkbox, Radio, Field | Text label |
| `description` | Dialog, AlertDialog, Field, Switch | Secondary text |
| `helperText` | Input, Select, Field | Non-error hint text |
| `errorText` | Input, Select, Field | Error message |
| `header` | Dialog, Accordion item | Top section |
| `footer` | Dialog | Bottom section |
| `content` | Dialog, Popover, Accordion panel, Collapsible | Main body area |
| `title` | Dialog, AlertDialog, Popover | Title text element |
| `close` | Dialog, Popover | Close button |
| `actions` | AlertDialog | Button row container |
| `cancelButton` | AlertDialog | Cancel action |
| `confirmButton` | AlertDialog | Confirm action |

**0.4.0 slots that do NOT map to canonical vocabulary (must be renamed in 0.5.0):**

| 0.4.0 slot name | Component | Canonical replacement |
|-----------------|-----------|----------------------|
| `panel` | Accordion | `content` |
| `option` | Select | `item` |
| `switch` | Switch | (no slot needed — base element is the root) |
| `thumb` | Switch, Slider | `indicator` |
| `tab` | Tabs | `item` |
| `arrow` | Tooltip | (drop from vocabulary — arrow is sub-part of `popup`) |
| `error` | Select, Switch | `errorText` |

[VERIFIED: codebase grep of all `classNames` interfaces in 0.4.0 components]

**TypeScript shape (representative example):**

```typescript
// Source: established pattern from 0.4.0, canonicalized for 0.5.0
classNames?: {
  root?: string
  trigger?: string
  popup?: string
  backdrop?: string
  title?: string
  description?: string
  content?: string
  close?: string
}
```

The composition stack is always: `twMerge(clsx(baseStyles, conditionalStyles), classNames?.slot, className)` [VERIFIED: CONVENTIONS.md]

---

### Pattern 2: Animation CSS Classes (PREP-03)

**Reference pattern** (from `index.css`, lines 978–1019): [VERIFIED: direct file read]

```css
/* Backdrop */
.bct-dialog-backdrop[data-open] {
  animation: fade-in 150ms ease-out;
}
.bct-dialog-backdrop[data-closed] {
  animation: fade-out 300ms ease-out forwards;  /* forwards is critical */
}

/* Modal popup */
.bct-dialog-modal[data-open] {
  animation: scale-in 200ms cubic-bezier(0, 0, 0.2, 1);
}
.bct-dialog-modal[data-closed] {
  animation: scale-out 200ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
```

**Existing keyframes available in `index.css`** (no new keyframes needed for most overlays): [VERIFIED: direct file read]

| Keyframe | Duration hint | Suitable for |
|----------|--------------|--------------|
| `fade-in` | 150ms | backdrop enter, tooltip enter |
| `fade-out` | 150ms | backdrop exit, tooltip exit, popover exit |
| `scale-in` | 200ms | modal/popover/menu enter |
| `scale-out` | 150ms | modal/popover/menu exit |
| `slide-in-from-right` | 300ms | right drawer enter |
| `slide-out-to-right` | 300ms | right drawer exit |
| `slide-in-from-left` | 300ms | left drawer enter |
| `slide-out-to-left` | 300ms | left drawer exit |
| `slide-up` | 150ms | AlertDialog popup enter |
| `slide-down-and-fade` | 400ms | generic top-anchored dropdown enter |

**Missing keyframes** (must be added to `index.css` in Phase 0):

| Keyframe needed | Used by | Description |
|----------------|---------|-------------|
| `slide-in-from-top` | Drawer top, Toast top | `translateY(-100%) → 0` |
| `slide-out-to-top` | Drawer top | `0 → translateY(-100%)` |
| `slide-in-from-bottom` | Drawer bottom, Toast bottom | `translateY(100%) → 0` |
| `slide-out-to-bottom` | Drawer bottom | `0 → translateY(100%)` |

[ASSUMED: top/bottom slide keyframes don't currently exist — verified by reading all keyframes in index.css; none match this pattern]

**New animation class families to stub into `index.css`** (Phase 0 deliverable):

| Class family | Component | Enter keyframe | Exit keyframe | Timing |
|-------------|-----------|---------------|---------------|--------|
| `.bct-drawer-right` | Drawer side=right | `slide-in-from-right` 300ms | `slide-out-to-right` 300ms | ease-out / ease-in |
| `.bct-drawer-left` | Drawer side=left | `slide-in-from-left` 300ms | `slide-out-to-left` 300ms | ease-out / ease-in |
| `.bct-drawer-top` | Drawer side=top | `slide-in-from-top` 300ms | `slide-out-to-top` 300ms | ease-out / ease-in |
| `.bct-drawer-bottom` | Drawer side=bottom | `slide-in-from-bottom` 300ms | `slide-out-to-bottom` 300ms | ease-out / ease-in |
| `.bct-drawer-backdrop` | Drawer backdrop | `fade-in` 150ms | `fade-out` 300ms | ease-out |
| `.bct-tooltip-popup` | Tooltip | `scale-in` 100ms | `scale-out` 75ms | ease-out / ease-in |
| `.bct-popover-popup` | Popover, PreviewCard | `scale-in` 150ms | `scale-out` 100ms | ease-out / ease-in |
| `.bct-menu-popup` | Menu, ContextMenu, Menubar item | `scale-in` 150ms | `scale-out` 100ms | ease-out / ease-in |
| `.bct-select-popup` | Select | `scale-in` 150ms | `scale-out` 100ms | ease-out / ease-in |
| `.bct-combobox-popup` | Combobox, Autocomplete | `scale-in` 150ms | `scale-out` 100ms | ease-out / ease-in |
| `.bct-toast-item` | Toast | `slide-in-from-right` 300ms | `slide-out-to-right` 300ms | ease-out / ease-in |
| `.bct-alert-dialog-backdrop` | AlertDialog | `fade-in` 150ms | `fade-out` 300ms | ease-out |
| `.bct-alert-dialog-popup` | AlertDialog | `slide-up` 150ms | `scale-out` 150ms | ease-out |

All `[data-closed]` rules must use `animation-fill-mode: forwards` per D-05.

**The `data-open` / `data-closed` attribute pattern** is how Base UI signals state — confirmed via existing 0.4.0 dialog.tsx usage and Base UI documentation patterns. [VERIFIED: 0.4.0 dialog.tsx, index.css lines 990–1019]

---

### Pattern 3: MenuItem Discriminated Union (PREP-04)

The 0.4.0 `DropdownMenuItem` is a simple flat interface. The 0.5.0 `MenuItem` union expands this to 7 types:

```typescript
// Source: D-06 (locked decision), inferred from Base UI Menu API
// Canonical owner: packages/ui/src/registry/versions/0.5.0/components/menu.tsx

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

[ASSUMED: Interface shapes above are derived from Base UI Menu API conventions + D-06 locked decision. The specific prop names for `checkItem`/`radioItem` must be verified against `@base-ui/react` Menu.CheckboxItem / Menu.RadioItem APIs when those components are implemented in Phase 6.]

`context-menu.tsx` and `menubar.tsx` import this type:
```typescript
import type { MenuItem } from "./menu"
```
[VERIFIED: D-07 locked decision]

---

### Pattern 4: renderItem Escape Hatch (PREP-04)

```typescript
// Source: D-08 (locked decision)
// Applied at the items-array component level, not the wrapper level

renderItem?: (item: MenuItem) => React.ReactNode
```

Applied by wrapping the default render path in a conditional:

```typescript
// Source: inferred pattern consistent with D-08
{items.map((item) =>
  renderItem ? renderItem(item) : <DefaultItemRenderer item={item} />
)}
```

Base UI's keyboard navigation and accessibility still apply because the consumer returns JSX that is rendered inside the Base UI item element — the `renderItem` result is the *children* of `Menu.Item`, not a replacement for it. [ASSUMED: This interpretation of D-08 is consistent with "Base UI still handles keyboard navigation, selection, and accessibility" — verify at Phase 6 implementation time]

---

### Pattern 5: Icon Props (PREP-04)

All icon props are `React.ReactNode`. Handling pattern:

```typescript
// Source: D-09 (locked decision)
// In component props interface:
triggerIcon?: React.ReactNode  // default: <ChevronDown />
closeIcon?: React.ReactNode    // default: <X />
checkIcon?: React.ReactNode    // default: <Check />
indicatorIcon?: React.ReactNode // default: component-specific Lucide icon
incrementIcon?: React.ReactNode // NumberField specific
decrementIcon?: React.ReactNode // NumberField specific
```

Usage in component body:

```typescript
// null = hide icon; undefined = use default; any ReactNode = replace
const resolvedTriggerIcon = triggerIcon === undefined
  ? <ChevronDown className="size-4" />
  : triggerIcon  // null renders nothing; any ReactNode renders as-is

// In JSX:
{resolvedTriggerIcon !== null && <span className={...}>{resolvedTriggerIcon}</span>}
```

[ASSUMED: The `undefined`-vs-`null` distinction for default-vs-hidden is a reasonable implementation of D-09 — confirm at Phase 1+ implementation time. Alternative: always provide default in destructure, use `false` for hiding.]

---

### Pattern 6: Ref Forwarding (PREP-04, XCUT-02)

Per Claude's discretion in CONTEXT.md, the following table documents the obvious mapping for all form input components:

| Component | forwardRef target | Native element |
|-----------|------------------|----------------|
| Input | `<input>` | HTMLInputElement |
| Switch | `BaseSwitch.Root` (which wraps `<button>`) | HTMLButtonElement |
| Toggle | `BaseToggle.Root` (which wraps `<button>`) | HTMLButtonElement |
| Checkbox | `BaseCheckbox.Root` (which wraps `<button>`) | HTMLButtonElement |
| Radio | `BaseRadio.Root` (which wraps `<button>`) | HTMLButtonElement |
| Slider | native `<input type="range">` via Base UI | HTMLInputElement |
| NumberField | native `<input>` via Base UI NumberField.Input | HTMLInputElement |
| OTPField | native `<input>` (first segment or grouped) | HTMLInputElement |
| Select | `BaseSelect.Trigger` (which wraps `<button>`) | HTMLButtonElement |
| Combobox | native search `<input>` | HTMLInputElement |
| Autocomplete | native search `<input>` | HTMLInputElement |

Implementation pattern:

```typescript
// Source: CONVENTIONS.md + React.forwardRef standard pattern
import { forwardRef } from "react"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <BaseInput.Root ref={ref} {...props} />
  }
)
Input.displayName = "Input"
```

[ASSUMED: Base UI component ref forwarding targets — e.g., whether `BaseSlider` exposes a ref that forwards to the native `<input>` — must be verified against Base UI docs at Phase 3/4 implementation time. The table above represents the design intent.]

---

## Token Audit (PREP-02)

### Available Token Categories in `index.css` [VERIFIED: direct file read]

| Category | Tokens Present | Count |
|----------|---------------|-------|
| Color — primary family | `primary`, `primary-on`, `primary-hover`, `primary-focus`, `primary-muted`, `primary-muted-hover`, `primary-disabled` | 7 |
| Color — secondary family | 7 parallel tokens | 7 |
| Color — tertiary family | 7 parallel tokens | 7 |
| Color — surface 1/2/3 | 5 tokens each × 3 | 15 |
| Color — background, overlay | 2 | 2 |
| Color — typography | `primary`, `secondary`, `muted`, `inverse` | 4 |
| Color — status (info/success/warning/error) | 5 tokens each × 4 | 20 |
| Color — accent 1/2/3/4 | 7 tokens each × 4 | 28 |
| Color — neutral | 7 tokens | 7 |
| Color — border/divider | `border`, `border-hover`, `border-focus`, `border-disabled`, `divider` | 5 |
| Color — light/dark | `light`, `light-on`, `dark`, `dark-on` | 4 |
| Spacing | `--spacing: 0.25rem` (Tailwind base unit) | 1 |
| Text size | `2xs` through `5xl` (10 sizes) | 10 |
| Font weight | thin → black (9 weights) | 9 |
| Radius | none, sm, md, lg, xl, 2xl, 3xl | 7 |
| Shadow | sm, md, lg + inset sm, md, lg | 6 |
| Blur | xs through 3xl (7 levels) | 7 |
| Z-index | header(50), dropdown(50), popover(50), tooltip(60), dialog-backdrop(100), dialog-popup(110) | 6 |
| Animation | 13 named animations | 13 |
| Timing functions | ease-in, ease-out, ease-in-out | 3 |

### Token Coverage by Component Family

All 37 target components draw from the following token categories. Cross-referencing against `index.css`:

| Token need | Present? | Token name |
|-----------|---------|------------|
| Backdrop overlay color | YES | `--color-overlay` |
| Surface colors (popup backgrounds) | YES | `--color-surface-1`, `--color-surface-2`, `--color-surface-3` |
| Border color | YES | `--color-border`, `--color-border-hover`, `--color-border-focus` |
| Focus ring color | YES | `--color-primary-focus` |
| Disabled states | YES | `--color-surface-1-disabled`, `--color-primary-disabled` |
| Error states | YES | `--color-error`, `--color-error-on`, `--color-error-hover`, `--color-error-muted` |
| Success/warning/info variants | YES | All families present |
| Typography colors | YES | `--color-typography-primary`, `secondary`, `muted`, `inverse` |
| Spacing (all sizing via Tailwind units) | YES | `--spacing: 0.25rem` base unit |
| Border radius (popup, button, input rounding) | YES | `--radius-sm` through `--radius-3xl` |
| Shadows (popup elevation) | YES | `--shadow-sm`, `--shadow-md`, `--shadow-lg` |
| Z-index layering | YES | All 6 z-index tokens present |
| Toast variant colors | YES | info/success/warning/error families all present |
| Scroll area track/thumb colors | YES | `--color-surface-1`, `--color-primary` (from existing scrollbar styles) |
| Navigation/interactive hover | YES | `--color-surface-1-hover`, `--color-surface-2-hover` |
| Progress/meter fill | YES | `--color-primary`, status color families |
| Slider thumb/track | YES | `--color-primary`, `--color-surface-2`, `--color-border` |
| OTP segment borders | YES | `--color-border`, `--color-primary-focus` |
| Separator/divider | YES | `--color-divider`, `--color-border` |

**Audit result: No missing CSS variable tokens identified.** [VERIFIED: complete read of index.css against all 37 component requirements in REQUIREMENTS.md]

**One gap identified: z-index for Toast.** The current z-index tokens are: dropdown(50), popover(50), tooltip(60), dialog-backdrop(100), dialog-popup(110). Toast typically sits above overlays (when used with a dialog open). A `--z-toast` token should be added. [ASSUMED: Toast z-index positioning relative to dialog overlays — the exact value (e.g. 120) is a judgment call. Recommend adding `--z-toast: 120` to `index.css` alongside other z-index tokens.]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animation fill-mode logic | Custom JS animation state | CSS `animation-fill-mode: forwards` on `[data-closed]` | Base UI unmounts after ALL sibling animations finish; fill-mode keeps final keyframe active during wait window |
| Data attribute detection | Custom `data-state` attributes | `[data-open]` / `[data-closed]` | Base UI sets these natively; piggyback on them rather than duplicating |
| Type narrowing for MenuItem | `if (item.type === "separator")` guards in every consumer | TypeScript discriminated union on `type` field | Exhaustive narrowing with `never` fallback catches future type additions at compile time |
| Slot deduplication | Ad-hoc `classNames` keys per component | 20-slot canonical vocabulary (D-02) | Prevents consumer code breakage when component internals change slot structure |

---

## Common Pitfalls

### Pitfall 1: Forgetting `forwards` fill-mode on closing animations
**What goes wrong:** The backdrop or popup snaps back to its pre-animation state (visible) after its animation ends, while a longer sibling animation (e.g., panel slide-out) is still running.
**Why it happens:** Without `fill-mode: forwards`, the element returns to its CSS-specified state when the animation ends. Base UI only unmounts after ALL sibling elements with animations have finished.
**How to avoid:** Every `[data-closed]` animation rule in `index.css` must end with `forwards` — e.g., `animation: fade-out 300ms ease-out forwards;`
**Warning signs:** Visible flash/snap during close transitions in the browser.
[VERIFIED: Documented in existing index.css comment block, lines 987–996]

### Pitfall 2: Using `data-open:animate-*` Tailwind shorthand instead of CSS class families
**What goes wrong:** The inline `data-open:animate-animate-fade-in` pattern used in 0.4.0 AlertDialog and DropdownMenu creates non-configurable, hardcoded animations. Component-specific timing (tooltip fast vs. drawer slow) is impossible without separate class families.
**Why it happens:** Tailwind v4 supports arbitrary data attribute variants, making the inline pattern tempting.
**How to avoid:** Per D-03, all overlay animations in 0.5.0 use named CSS class families in `index.css`. The inline Tailwind pattern is deprecated.
**Warning signs:** Any `data-open:animate-*` or `data-closed:animate-*` classes appearing in 0.5.0 component source.
[VERIFIED: 0.4.0 alert-dialog.tsx and dropdown-menu.tsx, plus D-03 decision]

### Pitfall 3: Component-specific classNames slot names drift
**What goes wrong:** Different components invent their own slot names (`option`, `panel`, `thumb`, `tab`, `error`, `arrow`), breaking the single vocabulary promise and making consumers write different override patterns for each component.
**Why it happens:** Natural tendency to name slots after the Base UI sub-element they target.
**How to avoid:** Map all sub-elements to canonical slots before writing any component. If no slot fits, reconsider the component structure (D-01).
**Warning signs:** Any `classNames` key that is not in the 20-slot list appearing in a 0.5.0 component.
[VERIFIED: 0.4.0 codebase audit — slot names found: panel, option, switch, thumb, tab, arrow, error]

### Pitfall 4: MenuItem type duplication across menu variants
**What goes wrong:** `context-menu.tsx` and `menubar.tsx` define their own `ContextMenuItem`/`MenubarMenuItem` types with the same structure, causing divergence as the union grows.
**Why it happens:** Each component file is self-contained for registry distribution.
**How to avoid:** Per D-07, only `menu.tsx` owns `MenuItem`. Consumer files use `registryDeps: ["menu"]` and `import type { MenuItem } from "./menu"`. This import works because the registry CLI copies all `registryDeps` alongside the target component.
**Warning signs:** Any `MenuItem`-like interface defined outside `menu.tsx`.
[VERIFIED: D-07, and 0.4.0 pattern of registryDeps already in use — see registry.json `radio-group` with `registryDeps: ["radio"]`]

### Pitfall 5: Icon prop typed as `LucideIcon` function type
**What goes wrong:** Typing `triggerIcon` as the Lucide icon function type (e.g., `LucideIcon`) prevents consumers from passing `<MyCustomIcon />` (already-rendered JSX), which is the more natural API.
**Why it happens:** Wanting type safety for Lucide icons specifically.
**How to avoid:** Type all icon props as `React.ReactNode` per D-09. The component renders the prop directly without calling it.
**Warning signs:** `import type { LucideIcon } from "lucide-react"` appearing in any 0.5.0 component.
[VERIFIED: D-09]

---

## Code Examples

### Animation class family template
```css
/* Source: established pattern from index.css lines 990–1019, extended by D-04/D-05 */

/* ─── BCT [ComponentName] animations ────────────────────────────────────────── */

.bct-[component]-[variant][data-open] {
  animation: [enter-keyframe] [duration]ms [easing];
}
.bct-[component]-[variant][data-closed] {
  animation: [exit-keyframe] [duration]ms [easing] forwards; /* forwards is mandatory */
}
```

### Tooltip example (fast timing)
```css
.bct-tooltip-popup[data-open] {
  animation: scale-in 100ms cubic-bezier(0, 0, 0.2, 1);
}
.bct-tooltip-popup[data-closed] {
  animation: scale-out 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
```

### Drawer (right) example
```css
.bct-drawer-right[data-open] {
  animation: slide-in-from-right 300ms cubic-bezier(0, 0, 0.2, 1);
}
.bct-drawer-right[data-closed] {
  animation: slide-out-to-right 300ms cubic-bezier(0.4, 0, 1, 1) forwards;
}
```

### Applying animation class in component source
```typescript
// Source: 0.4.0 dialog.tsx pattern, applied consistently in 0.5.0
<BaseDialog.Popup
  className={twMerge(
    "bct-dialog-modal",          // ← animation class applied here
    "flex w-full flex-col ...",
    classNames?.popup,
    className,
  )}
>
```

### classNames prop definition (20-slot canonical shape)
```typescript
// Source: D-02 + CONVENTIONS.md — representative subset for overlay component
classNames?: {
  root?: string
  trigger?: string
  backdrop?: string
  popup?: string
  header?: string
  title?: string
  description?: string
  content?: string
  footer?: string
  close?: string
}
```

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `slide-in-from-top`, `slide-out-to-top`, `slide-in-from-bottom`, `slide-out-to-bottom` keyframes do not exist in `index.css` | Token Audit / Animation section | If they do exist (under different names), duplicate keyframe names would produce a CSS conflict — low risk, easily caught |
| A2 | Toast z-index should be 120 (above dialog-popup at 110) | Token Audit | If Toast is designed to appear below dialogs, the value is wrong — this is a design decision, not a technical constraint |
| A3 | `renderItem` result is rendered as *children* of the Base UI item element (not replacing the item element itself) | Pattern 4 | If Base UI requires renderItem to return the full item element, the pattern changes; verify at Phase 6 |
| A4 | Icon prop `null` = hide, `undefined` = show default | Pattern 5 | Alternative: use a `boolean` prop to hide; or always require explicit `null` — no functional impact if changed before any component ships |
| A5 | Base UI forwards refs through to native elements for Slider, Select, etc. | Pattern 6 | If Base UI does not expose refs on certain primitives, `forwardRef` targets need adjustment at the relevant phase |

---

## Open Questions (RESOLVED)

1. **Toast z-index value** — RESOLVED: Plan 00-02 Task 1 adds `--z-toast: 120` to `index.css`
   - What we know: Current z-index scale is dropdown/popover=50, tooltip=60, dialog-backdrop=100, dialog-popup=110
   - What's unclear: Should Toast sit above open dialogs (120) or at dialog level (110)?
   - Recommendation: Add `--z-toast: 120` to `index.css` in Phase 0; revisit at Phase 5 if ToastProvider renders within a portal

2. **Drawer primitive in Base UI 1.1** — DEFERRED TO PHASE 5: Drawer primitive availability does not block Phase 0
   - What we know: ROADMAP.md flags "confirm Base UI 1.1 Drawer primitive availability" as research needed before Phase 5
   - What's unclear: Whether `@base-ui/react/drawer` exports a `Drawer` primitive or whether Drawer is implemented as a Dialog alias with panel animation
   - Recommendation: Defer to Phase 5 research; Phase 0 stubs the animation CSS classes regardless, which are needed either way

3. **`border-muted` and `border-muted-hover` tokens** — RESOLVED: Plan 00-02 Task 1 adds the missing light/dark theme values to `index.css`
   - What we know: `index.css` defines `--color-border-muted` and `--color-border-muted-hover` in the `@theme` block but their values are NOT assigned in the `:root` light theme block (only `border`, `border-hover`, `border-focus`, `border-disabled` are set)
   - What's unclear: This appears to be an incomplete token definition — `border-muted` and `border-muted-hover` would resolve to empty/invalid values
   - Recommendation: The token audit should flag this; Phase 0 plan should include a task to add the missing light/dark theme values for these two tokens, or remove them from `@theme` if unused

---

## Environment Availability

Step 2.6: SKIPPED — Phase 0 is purely document authoring and CSS file editing. No external tools, runtimes, databases, or CLI utilities beyond the standard project toolchain are required.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | No automated tests apply — Phase 0 produces only `.md` artifacts and a CSS edit |
| Config file | N/A |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | Automated? |
|--------|----------|-----------|-------------------|-----------|
| PREP-01 | Canonical slot vocab documented in `00-API-SPEC.md` | manual | grep `.planning/phases/00-preparation-api-design/00-API-SPEC.md` for all 20 slot names | Manual verification |
| PREP-02 | Token audit in `00-API-SPEC.md` covers all 37 components | manual | Review audit table in API spec | Manual verification |
| PREP-03 | All overlay animation class families present in `index.css` | manual | `grep "bct-" packages/ui/src/assets/tokens/index.css` confirms all 12 families | Scriptable grep check |
| PREP-04 | API conventions for icons, refs, MenuItem, renderItem in `00-API-SPEC.md` | manual | Review spec sections | Manual verification |

### Sampling Rate
- **Per task commit:** No automated test command — verify by reading the created files
- **Per wave merge:** Confirm `00-API-SPEC.md` exists and `index.css` grep shows all 12 animation families
- **Phase gate:** All 4 success criteria confirmed before Phase 1 begins

### Wave 0 Gaps
None — Phase 0 has no automated test infrastructure requirements. All validation is human review of spec document completeness and CSS file content.

---

## Security Domain

This phase produces only planning documents and CSS token edits. No authentication, authorization, session management, input validation, cryptography, or user-facing data handling is involved. Security domain is not applicable.

---

## Sources

### Primary (HIGH confidence)
- `packages/ui/src/assets/tokens/index.css` — complete file read; all token categories and animation classes verified
- `packages/ui/src/registry/versions/0.4.0/components/dialog.tsx` — reference for animation class pattern, classNames slots
- `packages/ui/src/registry/versions/0.4.0/components/alert-dialog.tsx` — classNames slot vocabulary reference
- `packages/ui/src/registry/versions/0.4.0/components/dropdown-menu.tsx` — DropdownMenuItem starting shape
- `packages/ui/src/registry/versions/0.4.0/components/tabs.tsx` — slot name `tab` (maps to `item`)
- `packages/ui/src/registry/versions/0.4.0/components/tooltip.tsx` — slot name `arrow` (no canonical mapping)
- `packages/ui/src/registry/versions/0.4.0/components/select.tsx` — slot names `option`, `error` (mapped to `item`, `errorText`)
- `packages/ui/src/registry/versions/0.4.0/components/accordion.tsx` — slot name `panel` (maps to `content`), `header` (already canonical)
- `packages/ui/src/registry/versions/0.4.0/components/switch.tsx` — slot names `switch`, `thumb` (mapped to root and `indicator`)
- `.planning/codebase/CONVENTIONS.md` — composition stack pattern `twMerge(clsx(...), classNames?.slot, className)`
- `.planning/phases/00-preparation-api-design/00-CONTEXT.md` — all locked decisions
- `.planning/REQUIREMENTS.md` — 37 component requirement specs for token audit

### Secondary (MEDIUM confidence)
- `packages/ui/src/registry/versions/0.4.0/registry.json` — `registryDeps` pattern usage confirmed
- `.planning/ROADMAP.md` — phase scope and success criteria confirmed

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; existing toolchain only
- Architecture (slot vocabulary): HIGH — fully derived from 0.4.0 codebase audit + locked decisions
- Architecture (animation classes): HIGH — pattern extracted from existing `index.css`; keyframe gaps identified by direct file read
- Token audit: HIGH — complete `index.css` read; one gap found (`border-muted` values missing in theme blocks)
- Pitfalls: HIGH — all derived from existing code observations

**Research date:** 2026-04-21
**Valid until:** This research is based on locked decisions and direct codebase reads. It remains valid until any decisions in CONTEXT.md are reopened. Stable indefinitely for the Phase 0 deliverables; animation class details for Phases 5–7 should be re-confirmed when Base UI 1.1 Drawer/Toast primitive availability is verified.
