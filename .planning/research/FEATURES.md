# Feature Landscape: bct-ui 0.5.0 Component Wrappers

**Domain:** Props-driven React wrappers around all 36 Base UI primitives
**Researched:** 2026-04-21
**Confidence:** HIGH for established pattern (0.4.0 Accordion/Select/Dialog); MEDIUM for complex components (Combobox/Autocomplete/Navigation Menu/Drawer) where API shape is design-decision dependent

## Wrapper Pattern (Reference)

Every component follows the 0.4.0 pattern validated in `accordion.tsx`, `select.tsx`, `dialog.tsx`:

```tsx
export interface ComponentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Base.Root>,
  "children"
> {
  // 1. Content/data props (items, options, value, title, etc.)
  // 2. Content content string props (label, placeholder, helperText, error)
  // 3. Behavioral shortcuts (size, mode, variant)
  // 4. Icon overrides (triggerIcon, closeIcon, indicatorIcon)
  // 5. Style escape hatches
  className?: string
  classNames?: { root?: string; /* sub-parts */ }
}
```

All Base UI `Root` props pass through via spread. Content is data-driven (`items`, `options`, `children`). Icons default to Lucide with an optional override prop.

---

## Complexity Buckets

| Bucket | Components | Characteristic |
|--------|------------|----------------|
| **Simple** (single part) | Avatar, Button, Separator, Toggle, Switch, Progress, Meter, Input, Collapsible, Scroll Area | One surface, no portal, no items array |
| **Medium** (form / compound) | Checkbox, Checkbox Group, Radio, Slider, Number Field, OTP Field, Field, Fieldset, Form, Tabs, Accordion, Toggle Group, Toolbar, Alert Dialog, Dialog, Popover, Tooltip, Preview Card, Select | Known item/option data shape, or labelled form control |
| **Complex** (multi-part, data-heavy) | Combobox, Autocomplete, Menu, Context Menu, Menubar, Navigation Menu, Drawer, Toast | Recursive items, filtering, portals + multiple triggers, or nested state |

---

## Table Stakes — Per-Component API

Legend:
- **Required:** must be supplied for component to render meaningfully
- **Optional:** table-stakes overrides (label/helper/size/icon)
- **Differentiator:** advanced option worth exposing
- **classNames:** sub-part override keys (in addition to `root`)
- **Icon props:** icons with defaults + override props

---

### 1. Accordion — Medium

- **Required:** `items: { value, title, children }[]`
- **Optional:** `defaultValue`, `value`, `onValueChange`, `openMultiple`, `orientation`
- **Differentiator:** `collapsible` (default true) — allow closing last open panel
- **classNames:** `root, item, header, trigger, panel`
- **Icons:** `triggerIcon` (default `ChevronDown`)

Already shipped in 0.4.0 — reuse verbatim.

---

### 2. Alert Dialog — Medium

- **Required:** `title: ReactNode` (alert dialogs must be titled), `children` (body)
- **Optional:** `description`, `open`, `defaultOpen`, `onOpenChange`, `size` (`sm|md|lg`), `confirmLabel` ("OK"), `cancelLabel` ("Cancel"), `onConfirm`, `onCancel`, `destructive?: boolean`
- **Differentiator:** render prop escape `actions?: ReactNode` to replace default OK/Cancel footer
- **classNames:** `backdrop, popup, title, description, content, confirm, cancel`
- **Icons:** none by default (but `icon?: ReactNode` slot above title is a nice differentiator for destructive alerts)

---

### 3. Autocomplete — Complex

- **Required:** `items: { value, label, description?, disabled? }[]`
- **Optional:** `label`, `placeholder`, `helperText`, `error`, `value`, `onValueChange`, `inputValue`, `onInputValueChange`, `emptyMessage` ("No results")
- **Differentiator:** `filterFn?: (item, query) => boolean` (default: case-insensitive label match), `groupBy?: (item) => string`, `renderItem?: (item) => ReactNode`
- **classNames:** `root, label, input, clear, popup, item, empty, group, helperText, error`
- **Icons:** `startIcon` (default `Search`), `clearIcon` (default `X`), `itemIndicatorIcon` (default `Check`)

**Sketch:**
```tsx
<Autocomplete
  label="Assignee"
  items={users}
  value={value}
  onValueChange={setValue}
  emptyMessage="No users found"
/>
```

---

### 4. Avatar — Simple

- **Required:** none (but `src` or `fallback` effectively required for useful render)
- **Optional:** `src`, `alt`, `fallback: string` (initials — default first char of alt), `size` (`xs|sm|md|lg|xl`), `shape` (`circle|square`)
- **Differentiator:** `onLoadingStatusChange`, `delayMs` before fallback shows
- **classNames:** `root, image, fallback`
- **Icons:** `fallbackIcon?: ReactNode` (default `User` when no initials available)

---

### 5. Button — Simple

- **Required:** `children`
- **Optional:** `variant` (`primary|secondary|ghost|outline|destructive`), `size` (`sm|md|lg|icon`), `disabled`, `loading?: boolean`, `startIcon?: ReactNode`, `endIcon?: ReactNode`, all native button props (`onClick`, `type`, etc.)
- **Differentiator:** `asChild?: boolean` for rendering as link
- **classNames:** not typical for a single-part component — `className` alone is enough, but offer `{ root, startIcon, endIcon, spinner }` for consistency
- **Icons:** `startIcon`, `endIcon`, `loadingIcon` (default Lucide `Loader2` spinning)

Note: Base UI Button is a thin semantic wrapper — most work is design-token + variant matrix.

---

### 6. Checkbox — Medium

- **Required:** `label: ReactNode` (checkboxes without labels are accessibility-hostile — but allow `aria-label` escape)
- **Optional:** `checked`, `defaultChecked`, `onCheckedChange`, `indeterminate`, `disabled`, `name`, `value`, `description`, `error`, `size` (`sm|md`)
- **Differentiator:** `labelPosition?: "left"|"right"` (default right)
- **classNames:** `root, control, indicator, label, description, error`
- **Icons:** `checkedIcon` (default `Check`), `indeterminateIcon` (default `Minus`)

---

### 7. Checkbox Group — Medium

- **Required:** `items: { value, label, description?, disabled? }[]`
- **Optional:** `label` (group legend), `value`, `defaultValue`, `onValueChange`, `orientation` (`vertical|horizontal`), `helperText`, `error`, `disabled`
- **Differentiator:** `allowSelectAll?: boolean` with a "Select all" checkbox at top
- **classNames:** `root, label, list, item, helperText, error`
- **Icons:** `checkedIcon` (default `Check`), `indeterminateIcon` (default `Minus`)

---

### 8. Collapsible — Simple

- **Required:** `trigger: ReactNode`, `children` (panel content)
- **Optional:** `open`, `defaultOpen`, `onOpenChange`, `disabled`
- **Differentiator:** none needed — primitive is simple on purpose
- **classNames:** `root, trigger, panel`
- **Icons:** `triggerIcon` (default `ChevronDown`, rotates on open) — exposed but can be `null` to render no icon

---

### 9. Combobox — Complex

- **Required:** `items: { value, label, description?, disabled? }[]`
- **Optional:** `label`, `placeholder`, `helperText`, `error`, `value`, `onValueChange`, `inputValue`, `onInputValueChange`, `multiple?: boolean`, `emptyMessage` ("No results"), `loading?: boolean`
- **Differentiator:** `creatable?: boolean` (allow new free-form entries), `filterFn`, `groupBy`, `renderItem`, `renderTag` (when multiple)
- **classNames:** `root, label, control, input, tag, chevron, clear, popup, item, group, empty, loading, helperText, error`
- **Icons:** `chevronIcon` (default `ChevronsUpDown`), `clearIcon` (default `X`), `itemIndicatorIcon` (default `Check`), `loadingIcon` (default `Loader2`), `tagRemoveIcon` (default `X`)

**Sketch:**
```tsx
<Combobox
  label="Tags"
  items={tags}
  multiple
  value={selected}
  onValueChange={setSelected}
  creatable
  emptyMessage="Type to create a tag"
/>
```

Combobox is the single most complex wrapper — its API should be the most thoroughly reviewed.

---

### 10. Context Menu — Complex

- **Required:** `trigger: ReactNode` (the right-click target), `items: MenuItem[]` (recursive)
- **MenuItem shape:**
  ```ts
  type MenuItem =
    | { type?: "item"; label: ReactNode; onSelect?: () => void; disabled?: boolean; icon?: ReactNode; shortcut?: string; destructive?: boolean }
    | { type: "separator" }
    | { type: "label"; label: ReactNode }
    | { type: "checkbox"; label: ReactNode; checked: boolean; onCheckedChange: (v: boolean) => void }
    | { type: "radio-group"; value: string; onValueChange: (v: string) => void; items: { value: string; label: ReactNode }[] }
    | { type: "submenu"; label: ReactNode; icon?: ReactNode; items: MenuItem[] }
  ```
- **Optional:** `onOpenChange`, `modal`
- **Differentiator:** shared recursive `MenuItem` type with Menu and Menubar
- **classNames:** `popup, item, separator, label, shortcut, submenuIndicator, checkboxIndicator, radioIndicator`
- **Icons:** `checkboxIcon` (`Check`), `radioIcon` (`Circle` filled), `submenuIcon` (`ChevronRight`)

---

### 11. Dialog — Medium

- **Required:** `children` (body); `title` strongly recommended for a11y
- **Optional:** `description`, `open`, `defaultOpen`, `onOpenChange`, `mode` (`panel|modal`), `size` (`sm|md|lg|xl`), `side` (`left|right` — panel mode only), `dismissible` (default true)
- **Differentiator:** `footer?: ReactNode`, plus the custom `dismissible`/`mode`/`side` already in 0.4.0
- **classNames:** `backdrop, popup, title, description, content, close, footer`
- **Icons:** `closeIcon` (default `X`)

Already shipped in 0.4.0 — extend with `footer` slot and `closeIcon` override.

---

### 12. Drawer — Complex

Note: Base UI does not ship a standalone Drawer — it's typically a Dialog in `panel` mode. 0.5.0's Drawer should either **(a)** be a thin alias that composes Dialog with mode="panel", or **(b)** wrap a dedicated drawer library. Design decision needed.

- **Required:** `children`
- **Optional:** `title`, `description`, `open`, `defaultOpen`, `onOpenChange`, `side` (`left|right|top|bottom`), `size` (`sm|md|lg|xl|full`), `dismissible`, `showHandle?: boolean` (for mobile bottom sheet affordance)
- **Differentiator:** `snapPoints?: (number | string)[]` for bottom-sheet (differentiates from plain Dialog), `defaultSnapPoint`, `onSnapPointChange`
- **classNames:** `backdrop, popup, handle, title, description, content, close, footer`
- **Icons:** `closeIcon` (default `X`)

**Recommendation:** In 0.5.0, ship Drawer as a superset of Dialog's panel mode with vertical side support and an optional drag handle. Snap-points are a 0.5.x add-on if time permits — document as "planned" otherwise.

---

### 13. Field — Medium

Base UI's Field is a wrapper primitive (label + control + description + error). The bct-ui wrapper should be a layout helper rarely used directly, but exposed.

- **Required:** `children` (the control), `label`
- **Optional:** `description`, `error`, `required`, `disabled`, `name`
- **Differentiator:** `orientation?: "vertical"|"horizontal"` for inline forms
- **classNames:** `root, label, control, description, error`
- **Icons:** none

Most bct-ui input components already embed this pattern (see Select's label/error/helperText). Field is the primitive consumers reach for when wrapping a non-bct control.

---

### 14. Fieldset — Simple

- **Required:** `legend: ReactNode`, `children`
- **Optional:** `description`, `disabled`
- **Differentiator:** none
- **classNames:** `root, legend, description, content`
- **Icons:** none

---

### 15. Form — Simple

- **Required:** `children`, `onSubmit`
- **Optional:** `errors?: Record<string, string>` (field-level error map), all native `<form>` props
- **Differentiator:** `noValidate` (default true — errors come from app state)
- **classNames:** `root`
- **Icons:** none

Form is mostly about wiring Base UI's validation state — the wrapper's job is a clean `errors` prop that propagates to Field children.

---

### 16. Input — Simple

- **Required:** none (works uncontrolled)
- **Optional:** `label`, `helperText`, `error`, `startIcon`, `endIcon`, `startAdornment`, `endAdornment` (text), `size` (`sm|md|lg`), all native `<input>` props (`value`, `onChange`, `placeholder`, `type`, etc.)
- **Differentiator:** `clearable?: boolean` (shows clear button when value), `loading?: boolean` (shows spinner in endIcon slot)
- **classNames:** `root, label, control, input, startIcon, endIcon, clear, helperText, error`
- **Icons:** `startIcon`, `endIcon`, `clearIcon` (default `X`), `loadingIcon` (default `Loader2`)

---

### 17. Menu — Complex

Same recursive `MenuItem` shape as Context Menu, but trigger is user-controlled (click).

- **Required:** `trigger: ReactNode`, `items: MenuItem[]`
- **Optional:** `open`, `defaultOpen`, `onOpenChange`, `side` (`top|right|bottom|left`), `align` (`start|center|end`), `sideOffset`, `modal`
- **Differentiator:** shared MenuItem type
- **classNames:** `trigger, popup, item, separator, label, shortcut, submenuIndicator, checkboxIndicator, radioIndicator`
- **Icons:** `checkboxIcon` (`Check`), `radioIcon` (`Circle`), `submenuIcon` (`ChevronRight`)

---

### 18. Menubar — Complex

- **Required:** `menus: { label: ReactNode; items: MenuItem[] }[]`
- **Optional:** `value`, `defaultValue`, `onValueChange`, `loop` (default true)
- **Differentiator:** reuses MenuItem schema verbatim
- **classNames:** `root, trigger, popup, item, separator, label, shortcut, submenuIndicator, checkboxIndicator, radioIndicator`
- **Icons:** same as Menu

---

### 19. Meter — Simple

- **Required:** `value: number`
- **Optional:** `label`, `min` (0), `max` (100), `format?: (v) => string`, `showValue?: boolean`, `size` (`sm|md|lg`), `getStatus?: (v, min, max) => "normal"|"warning"|"critical"`
- **Differentiator:** status thresholds — Meter is semantically a "gauge" so coloring by value band matters
- **classNames:** `root, label, value, track, indicator`
- **Icons:** none

---

### 20. Navigation Menu — Complex

- **Required:** `items: NavItem[]` where
  ```ts
  type NavItem =
    | { label: ReactNode; href: string; icon?: ReactNode }
    | { label: ReactNode; icon?: ReactNode; content: ReactNode | NavGroup[] }
  type NavGroup = { heading?: ReactNode; items: { label: ReactNode; href: string; description?: ReactNode; icon?: ReactNode }[] }
  ```
- **Optional:** `orientation` (`horizontal|vertical`), `value`, `defaultValue`, `onValueChange`, `linkComponent?: ComponentType` (Next.js `Link` interop), `delayDuration`
- **Differentiator:** `linkComponent` — critical for SPAs; render-prop `renderLink?: (item) => ReactNode`
- **classNames:** `root, list, item, trigger, content, group, groupHeading, link, indicator, viewport`
- **Icons:** `triggerIcon` (default `ChevronDown`)

**Sketch:**
```tsx
<NavigationMenu
  linkComponent={Link}
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Products", content: [{ heading: "Core", items: [{label: "UI", href: "/ui"}]}] }
  ]}
/>
```

---

### 21. Number Field — Medium

- **Required:** none (works uncontrolled)
- **Optional:** `label`, `helperText`, `error`, `value`, `defaultValue`, `onValueChange`, `min`, `max`, `step`, `smallStep`, `largeStep`, `format` (Intl.NumberFormatOptions), `placeholder`, `disabled`, `size` (`sm|md|lg`)
- **Differentiator:** `allowWheelScrub?: boolean`, `showControls?: boolean` (default true)
- **classNames:** `root, label, group, input, increment, decrement, helperText, error`
- **Icons:** `incrementIcon` (default `Plus`), `decrementIcon` (default `Minus`)

---

### 22. OTP Field — Medium

- **Required:** `length: number` (default 6)
- **Optional:** `label`, `helperText`, `error`, `value`, `defaultValue`, `onValueChange`, `onComplete`, `disabled`, `autoFocus`, `type?: "numeric"|"alphanumeric"`, `mask?: boolean`
- **Differentiator:** `separator?: ReactNode` rendered between every N cells (default `null`, e.g. `<span>-</span>` at index length/2)
- **classNames:** `root, label, group, cell, separator, helperText, error`
- **Icons:** none

---

### 23. Popover — Medium

- **Required:** `trigger: ReactNode`, `children` (body)
- **Optional:** `title`, `description`, `open`, `defaultOpen`, `onOpenChange`, `side`, `align`, `sideOffset`, `showArrow?: boolean`, `modal`
- **Differentiator:** `showArrow` + `arrowClassName`; `dismissible`
- **classNames:** `trigger, popup, arrow, title, description, content, close`
- **Icons:** `closeIcon` (default `X`, only rendered if `dismissible`)

---

### 24. Preview Card — Medium

- **Required:** `trigger: ReactNode`, `children` (card content)
- **Optional:** `open`, `defaultOpen`, `onOpenChange`, `side`, `align`, `openDelay` (default 700ms), `closeDelay` (default 300ms), `showArrow?: boolean`
- **Differentiator:** convenience `image?: string`, `title?: ReactNode`, `description?: ReactNode` for common "link preview" shape — falls back to children when absent
- **classNames:** `trigger, popup, arrow, image, title, description, content`
- **Icons:** none

---

### 25. Progress — Simple

- **Required:** `value: number` (0-100) or `null` for indeterminate
- **Optional:** `label`, `min` (0), `max` (100), `format?: (v) => string`, `showValue?: boolean`, `size` (`sm|md|lg`), `variant` (`default|success|warning|error`)
- **Differentiator:** indeterminate mode when `value == null`
- **classNames:** `root, label, value, track, indicator`
- **Icons:** none

---

### 26. Radio — Medium

Note: Base UI's Radio is the single button; RadioGroup is the container. In a props-driven library, **one `Radio` component accepts `items`** and plays the role of RadioGroup.

- **Required:** `items: { value, label, description?, disabled? }[]`
- **Optional:** `label` (group legend), `value`, `defaultValue`, `onValueChange`, `orientation` (`vertical|horizontal`), `helperText`, `error`, `disabled`, `name`, `size` (`sm|md`)
- **Differentiator:** `variant?: "radio"|"card"` — card variant shows full bordered cards (common design pattern)
- **classNames:** `root, label, list, item, control, indicator, itemLabel, itemDescription, helperText, error`
- **Icons:** `indicatorIcon?: ReactNode` (default = filled circle via CSS, not icon)

---

### 27. Scroll Area — Simple

- **Required:** `children`
- **Optional:** `orientation` (`vertical|horizontal|both`, default vertical), `size` (constraints — `className` is usually better), `scrollbarSize` (`sm|md`)
- **Differentiator:** `hideScrollbarDelay?: number` (auto-hide after inactivity), `type?: "auto"|"always"|"hover"|"scroll"`
- **classNames:** `root, viewport, scrollbar, thumb, corner`
- **Icons:** none

---

### 28. Select — Medium

Already shipped in 0.4.0. Current API is solid:

- **Required:** `options: { value, label, description?, disabled? }[]`
- **Optional:** `placeholder`, `label`, `error`, `helperText`, all Base.Root props
- **Differentiator:** add `groupBy?: (option) => string` for grouped selects in 0.5.0; `size` (`sm|md|lg`); `multiple?: boolean` (Base UI supports this natively)
- **classNames:** `root, label, trigger, popup, option, group, groupHeading, error, helperText`
- **Icons:** `triggerIcon` (default `ChevronDown`), `selectedIcon` (default `Check`)

---

### 29. Separator — Simple

- **Required:** none
- **Optional:** `orientation` (`horizontal|vertical`), `label?: ReactNode` (centered text over the line), `decorative` (default true)
- **Differentiator:** `label` slot — common pattern ("or" between auth methods)
- **classNames:** `root, label`
- **Icons:** none

---

### 30. Slider — Medium

- **Required:** none (uncontrolled works), but practically: either `defaultValue` or `value`
- **Optional:** `label`, `helperText`, `error`, `value`, `defaultValue`, `onValueChange`, `onValueCommitted`, `min` (0), `max` (100), `step` (1), `orientation` (`horizontal|vertical`), `disabled`, `showValue?: boolean`, `format?: (v) => string`, `marks?: { value: number; label?: ReactNode }[]`
- **Differentiator:** `range?: boolean` (dual-thumb, `value`/`defaultValue` become `number[]`), `marks` array
- **classNames:** `root, label, control, track, indicator, thumb, mark, markLabel, value, helperText, error`
- **Icons:** none

---

### 31. Switch — Simple

- **Required:** `label: ReactNode` (or `aria-label`)
- **Optional:** `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `description`, `size` (`sm|md`), `labelPosition?: "left"|"right"`
- **Differentiator:** `onIcon?: ReactNode`, `offIcon?: ReactNode` rendered inside the thumb
- **classNames:** `root, control, thumb, label, description`
- **Icons:** `onIcon`, `offIcon` (both optional; default none)

---

### 32. Tabs — Medium

- **Required:** `items: { value, label, icon?, disabled?, content }[]`
- **Optional:** `value`, `defaultValue`, `onValueChange`, `orientation` (`horizontal|vertical`), `variant` (`line|pill|enclosed`), `size` (`sm|md|lg`), `activationMode` (`automatic|manual`)
- **Differentiator:** per-item `icon`, `badge?: ReactNode`, `variant` matrix
- **classNames:** `root, list, trigger, indicator, panel, icon, badge`
- **Icons:** per-item `icon` (consumer supplies)

---

### 33. Toast — Complex

Toasts need a provider + imperative API. The props-driven wrapper is two exports working as one component file:

1. `<ToastProvider>` — mounted once at the app root; accepts global config (`position`, `duration`, `max`, `swipeDirection`, `classNames`).
2. `toast()` — imperative function: `toast({ title, description, variant?, action?, duration?, icon? })` returning an id; also `toast.success`, `toast.error`, `toast.warning`, `toast.info`, `toast.dismiss(id)`, `toast.promise(p, { loading, success, error })`.

- **Required (provider):** none; (call-site): `title` or `description`
- **Optional:** `description`, `variant` (`default|success|error|warning|info`), `duration`, `action: { label, onClick }`, `icon?: ReactNode`, `onDismiss`
- **Differentiator:** `promise` helper; global `position` (`top|bottom|top-left|top-right|bottom-left|bottom-right`)
- **classNames:** `viewport, toast, icon, title, description, action, close`
- **Icons:** variant defaults via Lucide (`CheckCircle`, `XCircle`, `AlertTriangle`, `Info`), `closeIcon` (default `X`), call-site `icon` override

---

### 34. Toggle — Simple

- **Required:** `children` or `icon`
- **Optional:** `pressed`, `defaultPressed`, `onPressedChange`, `disabled`, `variant` (`default|outline`), `size` (`sm|md|lg|icon`), `aria-label` (required when icon-only)
- **Differentiator:** icon-only affordance
- **classNames:** `root`
- **Icons:** consumer-supplied via `children` or explicit `icon` prop

---

### 35. Toggle Group — Medium

- **Required:** `items: { value, label?, icon?, disabled?, "aria-label"? }[]`
- **Optional:** `type` (`single|multiple`, default single), `value`, `defaultValue`, `onValueChange`, `orientation`, `variant` (`default|outline`), `size` (`sm|md|lg|icon`), `disabled`, `loop`
- **Differentiator:** icon-only group when items have no `label`
- **classNames:** `root, item`
- **Icons:** per-item `icon` (consumer supplies)

---

### 36. Toolbar — Medium

- **Required:** `items: ToolbarItem[]` where
  ```ts
  type ToolbarItem =
    | { type: "button"; label?: ReactNode; icon?: ReactNode; onClick; disabled?; "aria-label"? }
    | { type: "toggle"; pressed; onPressedChange; label?; icon? }
    | { type: "toggle-group"; value; onValueChange; items: { value; label?; icon? }[]; groupType?: "single"|"multiple" }
    | { type: "link"; label; href; icon? }
    | { type: "separator" }
    | { type: "custom"; render: () => ReactNode }
  ```
- **Optional:** `orientation` (`horizontal|vertical`), `loop`, `aria-label`
- **Differentiator:** heterogeneous item types (button / toggle / toggle-group / separator / custom); `custom` render escape for non-standard widgets
- **classNames:** `root, button, toggle, toggleGroup, separator, link`
- **Icons:** per-item `icon`

---

### 37. Tooltip — Medium

(Included even though the list says 36 — this makes the full Base UI set.)

- **Required:** `trigger: ReactNode`, `content: ReactNode`
- **Optional:** `open`, `defaultOpen`, `onOpenChange`, `side`, `align`, `sideOffset`, `delay` (default 600ms), `closeDelay`, `showArrow?: boolean` (default true), `disableHoverableContent`
- **Differentiator:** `delay`/`closeDelay`, `showArrow` with custom arrow size
- **classNames:** `trigger, popup, arrow, content`
- **Icons:** none

---

## Shared Data Shapes

Standardize these types across components for consistency:

```ts
// Used by Select, Combobox, Autocomplete, Checkbox Group, Radio, Tabs
interface Option {
  value: string
  label: ReactNode
  description?: ReactNode
  disabled?: boolean
  icon?: ReactNode   // optional visual prefix
}

// Used by Menu, Context Menu, Menubar, Toolbar (partial)
type MenuItem =
  | { type?: "item"; label: ReactNode; onSelect?: () => void; disabled?: boolean; icon?: ReactNode; shortcut?: string; destructive?: boolean }
  | { type: "separator" }
  | { type: "label"; label: ReactNode }
  | { type: "checkbox"; label: ReactNode; checked: boolean; onCheckedChange: (v: boolean) => void; disabled?: boolean }
  | { type: "radio-group"; value: string; onValueChange: (v: string) => void; items: { value: string; label: ReactNode; disabled?: boolean }[] }
  | { type: "submenu"; label: ReactNode; icon?: ReactNode; items: MenuItem[] }
```

Keep these types local-to-each-file (single-file constraint) but identical in shape so consumers learn once.

---

## Icon Override Registry

Components that default to a Lucide icon and need an override prop:

| Component | Icon slot(s) | Default |
|-----------|--------------|---------|
| Accordion | `triggerIcon` | `ChevronDown` |
| Alert Dialog | (optional `icon`) | none |
| Autocomplete | `startIcon`, `clearIcon`, `itemIndicatorIcon` | `Search`, `X`, `Check` |
| Avatar | `fallbackIcon` | `User` |
| Button | `startIcon`, `endIcon`, `loadingIcon` | none, none, `Loader2` |
| Checkbox | `checkedIcon`, `indeterminateIcon` | `Check`, `Minus` |
| Checkbox Group | `checkedIcon`, `indeterminateIcon` | `Check`, `Minus` |
| Collapsible | `triggerIcon` | `ChevronDown` |
| Combobox | `chevronIcon`, `clearIcon`, `itemIndicatorIcon`, `loadingIcon`, `tagRemoveIcon` | `ChevronsUpDown`, `X`, `Check`, `Loader2`, `X` |
| Context Menu | `checkboxIcon`, `radioIcon`, `submenuIcon` | `Check`, `Circle`, `ChevronRight` |
| Dialog | `closeIcon` | `X` |
| Drawer | `closeIcon` | `X` |
| Input | `startIcon`, `endIcon`, `clearIcon`, `loadingIcon` | none, none, `X`, `Loader2` |
| Menu | `checkboxIcon`, `radioIcon`, `submenuIcon` | `Check`, `Circle`, `ChevronRight` |
| Menubar | `checkboxIcon`, `radioIcon`, `submenuIcon` | `Check`, `Circle`, `ChevronRight` |
| Navigation Menu | `triggerIcon` | `ChevronDown` |
| Number Field | `incrementIcon`, `decrementIcon` | `Plus`, `Minus` |
| Popover | `closeIcon` | `X` |
| Select | `triggerIcon`, `selectedIcon` | `ChevronDown`, `Check` |
| Switch | `onIcon`, `offIcon` | none |
| Toast | variant icons, `closeIcon` | `CheckCircle`/`XCircle`/`AlertTriangle`/`Info`, `X` |

All other components (Avatar's image, Button, Field, Fieldset, Form, Fieldset, Meter, OTP Field, Preview Card, Progress, Radio, Scroll Area, Separator, Slider, Tabs, Toggle, Toggle Group, Toolbar, Tooltip) either take consumer-supplied icons in item/content slots or have no default icons.

---

## MVP Recommendation

Given 36 components, recommend building in complexity-ascending waves so patterns harden before the hard cases:

**Wave 1 — Primitives (no portals, no items):**
Button, Avatar, Separator, Input, Switch, Progress, Meter, Collapsible, Scroll Area, Toggle, Field, Fieldset, Form

**Wave 2 — Form items with `items`/`options`:**
Checkbox, Checkbox Group, Radio, Slider, Number Field, OTP Field, Select (already done), Accordion (already done), Tabs, Toggle Group, Separator

**Wave 3 — Portalled surfaces (single popup):**
Dialog (already done), Alert Dialog, Popover, Tooltip, Preview Card, Toolbar

**Wave 4 — Complex (recursive / multi-part / imperative):**
Menu, Context Menu, Menubar, Navigation Menu, Combobox, Autocomplete, Drawer, Toast

Waves 1-3 lock the `classNames` + icon-override conventions; Wave 4 inherits them.

## Anti-Features (explicitly do NOT build)

| Anti-feature | Why avoid | Do instead |
|--------------|-----------|------------|
| Compound sub-component exports (`Accordion.Item`) | Violates "props-driven" decision | Single named export + `items` prop |
| New CSS variable tokens per-component | Violates `index.css` stability constraint | Reuse existing BCT tokens |
| Inline SVG | Violates "Lucide only" constraint | Lucide icon + override prop |
| Controlled-only state | Unfriendly DX for quick prototyping | Support both `value` and `defaultValue` on every stateful component |
| Custom className merging (other than `twMerge`) | 0.4.0 uses `twMerge` consistently | Use `twMerge` only |
| Multi-file components | Violates single-file distribution constraint | Types + component in one `.tsx` |

## Sources

- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/.planning/PROJECT.md` (HIGH — authoritative scope)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/accordion.tsx` (HIGH — pattern reference)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/select.tsx` (HIGH — pattern reference)
- `/Users/jonasblendstrup/Documents/work/projects/bct ui/code/bct-ui/packages/ui/src/registry/versions/0.4.0/components/dialog.tsx` (HIGH — pattern reference)
- Base UI component model (Root/Trigger/Popup/Item split) — knowledge from training data (MEDIUM); verify each component's exact sub-parts against `base-ui.com/react/components/<name>` before implementation
