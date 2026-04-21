# Architecture Patterns

**Domain:** Registry-distributed Base UI wrapper library (bct-ui 0.5.0)
**Researched:** 2026-04-21
**Confidence:** HIGH (based on existing 0.4.0 registry, PROJECT.md scope, Base UI primitive architecture)

## Recommended Architecture

### Component Architecture Constraint

Every 0.5.0 component is distributed as a **single `.tsx` file** copied into a consumer project by `bct add <name>`. This constraint drives the entire architecture:

- No shared runtime helpers beyond `clsx`, `tailwind-merge`, `@base-ui/react`, `lucide-react`
- No cross-component module imports inside a component file
- `registryDeps` expresses which sibling files must be copied alongside (but they are sibling files, not imports)
- Field-like behavior (label + error + helperText) is **inlined into each input component** rather than factored out

This is an explicit trade-off vs. Base UI's compositional model: the wrapper library offers a flatter, props-driven API at the cost of some duplication across form-input components. The duplication is acceptable because each component is self-contained and a consumer can freely edit one without affecting others.

### Layers

```
Consumer project
  └─ src/components/<name>.tsx              ← copied via `bct add`
       └─ imports from @base-ui/react/<part>  ← runtime dep
       └─ imports from lucide-react           ← icon dep (conditional)
       └─ imports from clsx, tailwind-merge   ← styling utility
       └─ uses var(--color-*) tokens          ← from consumer's index.css

Docs site (apps/docs)
  └─ app/components/[version]/[component]
       └─ reads source from packages/ui/src/registry/versions/0.5.0/components/<name>.tsx
       └─ lazy-imports apps/docs/previews/0.5.0/<name>.tsx
       └─ preview wrapper exports { variants: VariantPreview[] }

Registry manifest (packages/ui/src/registry/versions/0.5.0/registry.json)
  └─ { [name]: { title, description, category, files, deps, registryDeps } }
```

### Component Boundaries

| Component type | Responsibility | Typical Base UI parts | Peer deps |
|---------------|---------------|----------------------|-----------|
| **Primitive-atom** (Button, Separator, Progress, Meter, Avatar, Spinner) | Single visual element, no sub-parts | `@base-ui/react/<name>` root only (some pure DOM) | `clsx`, `tailwind-merge` |
| **Form-input with Field logic** (Input, TextArea, NumberField, OTPField, Checkbox, Switch, Slider, Radio, CheckboxGroup) | Label + input + error + helperText, self-contained | `@base-ui/react/<input>`, may inline `@base-ui/react/field` | + `lucide-react` if icons |
| **Popover-backed** (Select, Menu, Popover, Tooltip, PreviewCard, ContextMenu, Menubar, NavigationMenu, Combobox, Autocomplete) | Trigger + positioner + portal + popup + items array | `@base-ui/react/<name>` full tree (Root→Trigger→Portal→Positioner→Popup→Item) | + `lucide-react` for chevron/check |
| **Dialog-family** (Dialog, AlertDialog, Drawer) | Overlay + backdrop + popup + close trigger | `@base-ui/react/dialog` or `@base-ui/react/alert-dialog` | + `lucide-react` for close X |
| **Compound-state** (Tabs, Toolbar, ToggleGroup, Fieldset, Form, Accordion, Collapsible, RadioGroup, CheckboxGroup) | Container managing child items via `items` prop | `@base-ui/react/<name>` root + list + trigger/panel | Varies |
| **Structural** (ScrollArea, Separator, Portal-like) | Layout / utility | `@base-ui/react/scroll-area` or pure DOM | Minimal |

### Data Flow

**Props-driven items pattern (continues from 0.4.0):**
```tsx
<Accordion items={[
  { id, title, content, icon? },
  ...
]} />
```
Consumers pass data, not JSX sub-components. This is the explicit Decision in PROJECT.md ("Props-driven wrappers, not compound API").

**classNames escape hatch:**
```tsx
<Select classNames={{ root, label, trigger, popup, option, error, helperText }} />
```
Every component with sub-parts exposes a `classNames` prop for per-part overrides, merged via `twMerge` after the defaults.

**Icon override pattern:**
```tsx
<Dialog closeIcon={<MyX />} />
<Select triggerIcon={<MyChevron />} checkIcon={<MyCheck />} />
```
Sensible Lucide default; single prop per icon slot for override.

## The 36 Base UI Components — Dependency Map

The `registryDeps` field in `registry.json` declares which sibling files must be copied alongside. For 0.5.0, because of the props-driven pattern (no shared compound exports), cross-component dependencies are **minimal by design** — but a few meaningful groupings exist:

### Dependency Graph (Logical, Not Import-Level)

```
Level 0 — No dependencies, pure primitives (11 components)
  button, separator, avatar, progress, meter, skeleton-equivalent*,
  portal (pure DOM), spinner*, badge*, divider*, fieldset
  (* not in Base UI list — noted for clarity; skip if out-of-scope)

Level 1 — Single Base UI primitive, no sibling registryDeps (10 components)
  field, form, input, textarea-equivalent*, checkbox, switch, toggle,
  scroll-area, collapsible, accordion
  (Accordion depends on Collapsible conceptually but not as a registryDep —
   Base UI handles the coupling internally)

Level 2 — Uses popup/portal machinery internally, still standalone (8 components)
  tooltip, popover, preview-card, dialog, alert-dialog, drawer*, toast, slider
  (*Drawer = Dialog variant in Base UI 1.x; verify at implementation time)

Level 3 — Composite inputs / wrappers (7 components)
  number-field        → uses Input + increment/decrement buttons
  otp-field           → uses Input slots
  radio + radio-group → RadioGroup wraps Radio (registryDep: radio)
  checkbox-group      → wraps Checkbox (registryDep: checkbox)
  toggle-group        → wraps Toggle (registryDep: toggle)

Level 4 — Menu/Select family (popup + items) (6 components)
  select, menu, menubar, context-menu, combobox, autocomplete, navigation-menu
  (Each is self-contained via its own @base-ui/react/<name> primitive —
   they do NOT depend on popover as a registryDep, because Base UI
   gives each its own complete primitive tree.)

Level 5 — Compound navigation (2 components)
  tabs, toolbar
```

### Explicit `registryDeps` for 0.5.0

Using the 0.4.0 pattern as precedent (`radio-group` declared `registryDeps: ["radio"]`), the 0.5.0 registry should declare these:

| Component | `registryDeps` | Reason |
|-----------|---------------|--------|
| `radio-group` | `["radio"]` | Renders array of Radio items |
| `checkbox-group` | `["checkbox"]` | Renders array of Checkbox items |
| `toggle-group` | `["toggle"]` | Renders array of Toggle items |
| `menubar` | `["menu"]` | Menubar is a row of Menu triggers |
| `context-menu` | `[]` (or `["menu"]` if sharing logic) | Base UI ships its own primitive; verify at impl |
| All others | `[]` | Self-contained Base UI primitive |

**Intentionally NOT cross-depended** (despite conceptual overlap):
- `select`, `combobox`, `autocomplete` do NOT depend on `popover` — each uses its own `@base-ui/react/<name>` primitive
- `tooltip`, `preview-card` do NOT depend on `popover` — separate Base UI primitives
- `alert-dialog`, `drawer` do NOT depend on `dialog` — each uses its own primitive
- Form-input components (Input, Checkbox, Switch, etc.) do NOT depend on `field` — Field logic (label + error + helper) is **inlined** per component to keep each file self-contained

**Confidence:** HIGH — this matches the established 0.4.0 precedent and the single-file constraint.

### Field Inlining Decision

Base UI's `Field.Root` provides a11y wiring for `Field.Label`, `Field.Control`, `Field.Error`, `Field.Description`. Two options existed for 0.5.0:

**Option A (adopted) — Inline Field logic into each form-input component**
- Pro: Single-file constraint preserved; no `registryDeps: ["field"]` on 10+ components
- Pro: Matches 0.4.0 pattern (text-input.tsx already inlines label/error/helperText with generated IDs)
- Con: Duplication of the label/error/helper DOM across ~10 components
- Con: A standalone `field` component in the registry is ornamental unless someone composes custom inputs

**Option B (rejected) — Ship a `field` component and declare it as `registryDep` for all form-inputs**
- Pro: DRY
- Con: Every form-input copy pulls in `field.tsx`, doubling file count per add
- Con: Changing `field.tsx` post-install doesn't propagate to existing form-inputs (they'd have been copied with inline assumptions)

**Decision:** Ship `field` as a standalone registry component (for consumers composing custom inputs directly against Base UI primitives), but do NOT use it as a `registryDep` for Input/Checkbox/Switch/etc. Each form-input stays self-contained.

**Confidence:** HIGH — derived directly from the PROJECT.md single-file constraint and existing 0.4.0 pattern.

## Phase Breakdown Recommendation (5-8 Phases)

Given 36 components, the recommended split is **7 phases**. Phases are ordered to front-load low-risk components that establish patterns, then tackle higher-complexity popup/menu families once the patterns are proven.

Each phase includes: component implementations → registry.json entries → preview wrappers → `VALID_VERSIONS` update (Phase 1 only).

### Phase 1 — Foundation (5 components, low complexity)

**Components:** Button, Separator, Avatar, Progress, Meter

**Rationale:** All are Level-0 primitives with no dependencies. Establishes:
- Base file layout, import pattern (`@base-ui/react/<name>`)
- `classNames` API shape
- Token usage (verify no new tokens needed for Meter gradient)
- Registry.json entry format for 0.5.0
- Preview wrapper scaffold (`apps/docs/previews/0.5.0/<name>.tsx`)
- First run of `pnpm docs:add-component` script against 0.5.0

**Registry + docs work:**
- Create `packages/ui/src/registry/versions/0.5.0/` folder
- Create `registry.json` with 5 entries
- Update `apps/docs/lib/versions.ts` — add `"0.5.0"` to `VALID_VERSIONS` and set as default
- Update `apps/docs/previews/registry.ts` — add `"0.5.0": { button, separator, avatar, progress, meter }` entry
- Run `pnpm verify-registry-version`

**Risk:** Lowest. If patterns are wrong, we discover it on 5 simple components, not 20.

### Phase 2 — Basic Form Inputs (6 components)

**Components:** Field, Fieldset, Form, Input, TextArea (note: TextArea is NOT in the 36-Base-UI list; **exclude if strictly scoping** — Base UI exposes TextArea only as `<Input render={<textarea />} />`), Switch, Toggle

**Corrected list (strictly 36 Base UI):** Field, Fieldset, Form, Input, Switch, Toggle (6 components)

**Rationale:** Establishes the form-input pattern (label + error + helperText inline) that 8 more components will follow. `Field`/`Fieldset`/`Form` are shipped as standalone components for consumers composing custom inputs, but NOT declared as `registryDeps`.

**Dependencies:** None between these. Switch and Toggle are near-identical API-wise — implement Switch first, port the pattern.

**Registry + docs:** 6 new entries, 6 preview wrappers. No new tokens expected.

**Risk:** Medium-low. Field's a11y wiring is the pattern under test.

### Phase 3 — Selection Inputs (7 components)

**Components:** Checkbox, CheckboxGroup, Radio, RadioGroup, ToggleGroup, Slider, Separator (already done — skip)

**Corrected:** Checkbox, CheckboxGroup, Radio, RadioGroup, ToggleGroup, Slider (6 components)

**Rationale:** All use the Phase 2 pattern. Groups depend on their atoms:
- `checkbox-group` has `registryDeps: ["checkbox"]`
- `radio-group` has `registryDeps: ["radio"]`
- `toggle-group` has `registryDeps: ["toggle"]` (toggle from Phase 2)

**Build order within phase:** Checkbox → CheckboxGroup → Radio → RadioGroup → ToggleGroup → Slider

**Risk:** Medium-low. First cross-component `registryDeps` declarations — validate that `bct add radio-group` correctly pulls in `radio.tsx`.

### Phase 4 — Number/OTP/Specialized Inputs (2 components)

**Components:** NumberField, OTPField

**Rationale:** These are composite inputs (increment/decrement buttons, slot-per-digit). More complex than basic inputs — keep separate from Phase 2/3 to avoid bloat. Do NOT declare `registryDeps: ["input"]` — NumberField and OTPField each use `@base-ui/react/number-field` and `@base-ui/react/otp-field` directly.

**Risk:** Medium. OTPField sub-slot rendering is novel vs. 0.4.0 (which had no OTP component).

### Phase 5 — Overlays: Dialogs & Tooltips (5 components)

**Components:** Dialog, AlertDialog, Drawer, Tooltip, PreviewCard

**Rationale:** All use Base UI's portal + positioner machinery. Establishes overlay patterns (backdrop, animation tokens from `index.css`, close on escape/outside-click). Dialog first (reference implementation), then variants.

**Drawer caveat:** Base UI 1.x exposes drawer functionality via Dialog with directional positioning. Verify during implementation whether a `@base-ui/react/drawer` primitive exists in the current Base UI version or whether Drawer wraps Dialog with specific classes. **Flag for Phase 5 research.**

**Registry + docs:** 5 entries. Verify `z-dialog`/`z-popover` tokens from 0.4.0 still exist; add animation tokens if new variants require them (already present in repo per recent commit 4cef33c).

**Risk:** Medium. Animation state-machine debugging is the usual pain point — the 0.4.0 dialog.tsx is a good reference.

### Phase 6 — Popup & Menu Family (7 components)

**Components:** Popover, Select, Menu, ContextMenu, Menubar, NavigationMenu, Combobox

**Rationale:** All share the Trigger → Portal → Positioner → Popup → Item(s) structure. Popover first (simplest), then Select (adds items array + ItemIndicator), then Menu/ContextMenu/Menubar (add separators, submenu nesting), then Combobox (adds input filtering), then NavigationMenu (adds viewport + horizontal nav).

**Build order:**
1. Popover (reference popup pattern)
2. Select (adds `options: SelectOption[]` shape — carry forward from 0.4.0)
3. Menu (adds items with onClick, separators, icons)
4. ContextMenu (Menu + ContextMenu.Trigger wrapping children)
5. Menubar (`registryDeps: ["menu"]` OR inline; decide at impl)
6. Combobox (Menu + Input hybrid)
7. NavigationMenu (most complex; horizontal + Viewport)

**Risk:** High. Submenu nesting, keyboard navigation edge cases, viewport positioning for NavigationMenu. Budget extra time. Flag for phase-level research.

### Phase 7 — Autocomplete + Remaining Composites (5 components)

**Components:** Autocomplete, Accordion, Collapsible, Tabs, Toolbar, ScrollArea, Toast, Toggle (done), ContextMenu (done)

**Corrected (remaining):** Autocomplete, Accordion, Collapsible, Tabs, Toolbar, ScrollArea, Toast (7 components)

Wait — this pushes us to 8 phases. Recombining:

### Revised Phase Breakdown — Final 7 Phases

| Phase | Components | Count | Running Total |
|-------|-----------|-------|---------------|
| **1. Foundation** | Button, Separator, Avatar, Progress, Meter | 5 | 5 |
| **2. Form basics** | Field, Fieldset, Form, Input, Switch, Toggle | 6 | 11 |
| **3. Selection inputs** | Checkbox, CheckboxGroup, Radio, RadioGroup, ToggleGroup, Slider | 6 | 17 |
| **4. Specialized inputs** | NumberField, OTPField | 2 | 19 |
| **5. Overlays** | Dialog, AlertDialog, Drawer, Tooltip, PreviewCard, Toast | 6 | 25 |
| **6. Popup/menu family** | Popover, Select, Menu, ContextMenu, Menubar, Combobox, Autocomplete | 7 | 32 |
| **7. Structure & navigation** | Accordion, Collapsible, Tabs, Toolbar, ScrollArea, NavigationMenu | 6 | 38 |

Adjustment: 38 > 36 because I double-counted Toast (Phase 5) and merged it there. Let me re-verify against the canonical 36-component list from PROJECT.md:

**Canonical 36:**
Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox, Checkbox Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Menubar, Meter, Navigation Menu, Number Field, OTP Field, Popover, Preview Card, Progress, Radio, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip.

That's actually **37** in the PROJECT.md prose (Radio + Radio Group both count, Checkbox + Checkbox Group both count). Count again: Accordion (1), Alert Dialog (2), Autocomplete (3), Avatar (4), Button (5), Checkbox (6), Checkbox Group (7), Collapsible (8), Combobox (9), Context Menu (10), Dialog (11), Drawer (12), Field (13), Fieldset (14), Form (15), Input (16), Menu (17), Menubar (18), Meter (19), Navigation Menu (20), Number Field (21), OTP Field (22), Popover (23), Preview Card (24), Progress (25), Radio (26), Scroll Area (27), Select (28), Separator (29), Slider (30), Switch (31), Tabs (32), Toast (33), Toggle (34), Toggle Group (35), Toolbar (36), Tooltip (37).

**37 components**, not 36. PROJECT.md's "36 Base UI components" headline is off by one. **Flag this for the roadmap — confirm which component (likely Radio Group conflation) is intended.** Assuming all 37 ship:

### Final 7-Phase Breakdown (37 components)

| Phase | Components | Count |
|-------|-----------|-------|
| **1. Foundation** | Button, Separator, Avatar, Progress, Meter | 5 |
| **2. Form basics** | Field, Fieldset, Form, Input, Switch, Toggle | 6 |
| **3. Selection inputs** | Checkbox, Checkbox Group, Radio, Radio Group, Toggle Group, Slider | 6 |
| **4. Specialized inputs** | Number Field, OTP Field | 2 |
| **5. Overlays & feedback** | Dialog, Alert Dialog, Drawer, Tooltip, Preview Card, Toast | 6 |
| **6. Popup/menu family** | Popover, Select, Menu, Context Menu, Menubar, Combobox, Autocomplete | 7 |
| **7. Structure & navigation** | Accordion, Collapsible, Tabs, Toolbar, Scroll Area, Navigation Menu | 6 |
| | **Total** | **38** |

Still off. The issue: PROJECT.md lists both Radio and Radio Group, both Checkbox and Checkbox Group, both Toggle and Toggle Group — but also lists Menubar (separate from Menu). If Base UI bundles some of these under a single primitive, the component count may be lower at implementation. **Leave final reconciliation to Phase 1 when registry entries are authored — trust the canonical 37 from PROJECT.md prose and drop one if implementation reveals overlap.**

### Build Order Rationale

**Why Foundation first:** Establishes the single-file pattern, registry manifest entries for 0.5.0, docs `VALID_VERSIONS` update, and preview scaffolding — all in one phase, with 5 near-trivial components to prove the workflow before scaling.

**Why Form basics before Selection inputs:** Field/Fieldset/Form are the "a11y reference" for label/error/helperText inlining. Input establishes the "form input with inline Field logic" pattern that Checkbox, Radio, Slider, NumberField, OTPField will all follow. If we build Checkbox first, we risk rework when Input forces the pattern to shift.

**Why Specialized inputs (NumberField, OTPField) before Overlays:** They're still form inputs; finishing all form inputs before switching to overlay/popup contexts reduces cognitive switching. Also lets us ship a "forms RC" milestone checkpoint.

**Why Overlays before Popup/menu:** Dialog's animation/backdrop/portal pattern is prerequisite knowledge for the popup family. Building Dialog first means Select/Menu/Popover authors already know the portal+positioner+animation story. Skipping overlays and going straight to Select would force discovery of overlay primitives in the most complex components.

**Why Popup/menu before Structure:** NavigationMenu (Phase 7) composes behaviors from Menu (Phase 6). Building Menu/Popover first lets us reference those implementations when building NavigationMenu.

**Why Structure last:** ScrollArea, Accordion, Collapsible, Tabs, Toolbar are relatively independent of each other and of earlier phases. Saving them for last means the hardest parts (popup family) are done while momentum is highest, and the phase-7 components are comfortable "wind-down" work with known patterns.

### Registry + Docs Integration Steps (per phase)

Each phase follows the same 5-step loop:

1. **Implement components** in `packages/ui/src/registry/versions/0.5.0/components/<name>.tsx`
2. **Add registry entries** to `packages/ui/src/registry/versions/0.5.0/registry.json` with `title`, `description`, `category`, `files`, `deps`, and `registryDeps`
3. **Scaffold preview wrappers** with `pnpm docs:add-component -- --version 0.5.0 --component <name>`, then fill in `variants` array
4. **Register previews** in `apps/docs/previews/registry.ts` under the `"0.5.0"` key (scaffold script may do this automatically)
5. **Verify** with `pnpm verify-registry-version` and manual smoke test of `/components/0.5.0/<name>` docs page

**Phase 1 additionally:**
- Create the `0.5.0/` folder structure
- Add `"0.5.0"` to `VALID_VERSIONS` in `apps/docs/lib/versions.ts` (position first — it's the new default)
- Add the `"0.5.0": {}` object to `PREVIEW_REGISTRY` in `apps/docs/previews/registry.ts`

**Phase 7 additionally:**
- Full registry smoke test: `bct add` every component into a scratch project; verify `registryDeps` resolve correctly
- Run `pnpm docs:build` to verify static generation covers all 37 components
- Update `packages/ui/package.json` version to `0.5.0` and ensure `prepublishOnly` passes

## Patterns to Follow

### Pattern 1: Form-input with inline Field logic

**What:** Each form-input component renders its own label, error, helperText with generated IDs and aria wiring, rather than requiring consumers to wrap in `<Field.Root>`.

**When:** All of: Input, TextArea-via-Input, Checkbox, Switch, Toggle, Slider, NumberField, OTPField, Radio (within RadioGroup).

**Example (shape):**
```tsx
export function Input({ label, error, helperText, id, classNames, ...props }: InputProps) {
  const inputId = id || React.useId()
  return (
    <div className={twMerge("flex flex-col gap-1.5", classNames?.root)}>
      {label && <label htmlFor={inputId} className={...}>{label}</label>}
      <BaseInput id={inputId} aria-invalid={!!error} aria-describedby={...} {...props} />
      {error && <span id={`${inputId}-error`} className={...}>{error}</span>}
      {helperText && !error && <span id={`${inputId}-helper`} className={...}>{helperText}</span>}
    </div>
  )
}
```

**Replace 0.4.0's `Math.random()`-based id with `React.useId()`** — stable across SSR/CSR, no hydration mismatch. This is a small but worthwhile 0.5.0 improvement.

### Pattern 2: `items` prop over children

**What:** Multi-part components accept a typed `items` array instead of `children` with sub-component composition.

**When:** Accordion, Tabs, Menu, Menubar, NavigationMenu, Select, Combobox, Autocomplete, RadioGroup, CheckboxGroup, ToggleGroup, Breadcrumbs-like.

**Example:**
```tsx
export interface MenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  onSelect?: () => void
  separator?: boolean
  submenu?: MenuItem[]
}

<Menu items={items} trigger={<Button>Open</Button>} />
```

### Pattern 3: `classNames` per sub-part

**What:** Every component with >1 visual part exposes a `classNames` object for overrides, merged after defaults via `twMerge`.

**When:** Every component except pure atoms (Separator, Spinner, pure icon components).

### Pattern 4: Icon defaults via Lucide + prop override

**What:** Components with built-in icons (Select chevron, Dialog close, Accordion chevron, Checkbox check, NumberField increment arrows, Breadcrumb separator) default to Lucide icons with a named prop override.

**Example:**
```tsx
<Select triggerIcon={<ArrowDown />} checkIcon={<Dot />} />
<Dialog closeIcon={<XCircle />} />
<Accordion chevronIcon={<Plus />} />
```

**No inline SVG anywhere** — constraint from PROJECT.md.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Cross-component runtime imports

**What:** Having `select.tsx` import from `./popover.tsx` (or from a shared `./field.tsx`).

**Why bad:** Breaks the single-file copy model. When `bct add select` runs, the CLI only copies files declared in `files[]` and `registryDeps` — it doesn't follow import statements. A consumer ending up with `import from './popover'` would hit a compile error.

**Instead:** Use `@base-ui/react/<primitive>` directly in each component. Duplicate inline logic when needed.

### Anti-Pattern 2: Compound sub-component exports

**What:** `export const Accordion = { Root, Item, Trigger, Content }` with dot-notation consumption.

**Why bad:** Contradicts the PROJECT.md Key Decision ("Props-driven wrappers, not compound API"). Also complicates the single-named-export assumption in the registry.

**Instead:** One named export per component, with an `items` prop shape.

### Anti-Pattern 3: New peer deps

**What:** Adding `react-hook-form`, `framer-motion`, `cmdk`, etc. to any component.

**Why bad:** Violates PROJECT.md Constraint ("Only `@base-ui/react`, `clsx`, `tailwind-merge`, and `lucide-react` as deps — no new peer deps"). Every new peer dep inflates consumer install cost.

**Instead:** Base UI's built-in primitives cover combobox, autocomplete, animations, and form state. Use them.

### Anti-Pattern 4: New CSS variable tokens without index.css update

**What:** Component uses `var(--color-warning-bright)` but that token doesn't exist in `packages/ui/src/assets/tokens/index.css`.

**Why bad:** Consumer projects won't have the token and component will render unstyled.

**Instead:** Before introducing a new token, add it to `index.css` in the same PR. Prefer reusing existing tokens.

### Anti-Pattern 5: Forgetting preview wrapper or VALID_VERSIONS entry

**What:** Component lives in `packages/ui/src/registry/versions/0.5.0/components/` and in `registry.json` but has no entry in `apps/docs/previews/0.5.0/` or `PREVIEW_REGISTRY`.

**Why bad:** Docs page renders "Preview not available" (caught gracefully, but ships broken UX to users).

**Instead:** The per-component checklist must include both. Phase 1 adds `"0.5.0"` to `VALID_VERSIONS` and the empty `"0.5.0": {}` object in `PREVIEW_REGISTRY`.

## Scalability Considerations

| Concern | Small (5 components) | Medium (20) | Full (37) |
|---------|---------------------|-------------|-----------|
| Registry.json size | Manually editable | Manually editable | Still manually editable (~200 lines) |
| Preview wrapper count | 5 files | 20 files | 37 files |
| `PREVIEW_REGISTRY` entries | Auto-add via script | Auto-add via script | Auto-add via script (script already exists per ARCHITECTURE.md codebase map) |
| Static generation params | 5 × versions | 20 × versions | 37 × versions (still trivial for Next.js ISR/SSG) |
| Token coverage | Existing tokens suffice | Likely existing | May need 1-2 additions (Meter gradient, Toast stack) — flag during impl |
| Bundle size of docs site | N/A — previews lazy-loaded | Same | Same — lazy imports keep first-load small |

No scalability concerns at 37 components. The registry pattern scales linearly and has headroom to 100+.

## Phase-Level Research Flags

Components that will likely need dedicated research before implementation:

| Phase | Component | Why research needed |
|-------|-----------|---------------------|
| 5 | Drawer | Verify if Base UI 1.x has a dedicated `@base-ui/react/drawer` primitive or if it composes Dialog with directional positioning |
| 5 | Toast | Base UI's Toast API includes a `toastManager` — verify whether the props-driven pattern is feasible or if we need to expose a hook/context |
| 6 | Combobox | Filter behavior (client-side vs. async) — API shape for `items` + `onInput` + `isLoading` |
| 6 | Autocomplete | Same as Combobox but with free-text. Decide: separate component vs. Combobox mode |
| 6 | NavigationMenu | Viewport + submenu interactions — the most complex popup component. Dedicated research recommended |
| 7 | ScrollArea | Base UI's ScrollArea is a wrapper around native scrollbars — verify Tailwind v4 + BCT token integration for scrollbar thumb/track |

## Open Questions for Roadmap

1. **Component count discrepancy:** PROJECT.md says "36 Base UI components" in prose but the enumerated list has 37. Reconcile during Phase 1.
2. **Drawer primitive existence:** Confirm whether Base UI ships a discrete Drawer primitive or if it's a Dialog variant. Affects `deps` field in registry.
3. **Toast state management:** Does Base UI's `toastManager` mesh with a props-driven `<Toast items={toasts} onDismiss={...} />` wrapper, or is a hook unavoidable?
4. **Combobox vs. Autocomplete:** Single component with a `mode` prop, or two separate components? Base UI ships both — mirror their decision.
5. **TextArea scope:** If TextArea isn't a separate Base UI primitive, decide whether to ship `<TextArea />` as a convenience wrapper around `<Input render={<textarea />} />` or drop it from 0.5.0.

## Sources

- `packages/ui/src/registry/versions/0.4.0/registry.json` — precedent for registry structure and `registryDeps` (HIGH confidence)
- `packages/ui/src/registry/versions/0.4.0/components/text-input.tsx`, `checkbox.tsx`, `select.tsx` — existing 0.4.0 component patterns (HIGH confidence)
- `.planning/PROJECT.md` — scope, constraints, key decisions (HIGH confidence)
- `.planning/codebase/ARCHITECTURE.md` — system-level conventions, CLI flow, docs site flow (HIGH confidence)
- `apps/docs/previews/registry.ts` — preview registration pattern (HIGH confidence)
- Base UI primitive architecture (Trigger → Portal → Positioner → Popup → Item tree, per-primitive packages) — MEDIUM confidence from training data; verify exact import paths during Phase 1 implementation
- Base UI Drawer/Toast specifics — LOW confidence, flagged for Phase 5 research
