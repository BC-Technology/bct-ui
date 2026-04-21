# Roadmap: bct-ui 0.5.0

**Created:** 2026-04-21
**Granularity:** Standard (8 phases)
**Coverage:** 52/52 v1 requirements mapped

## Core Value

Every Base UI component has a working, styled, props-driven bct-ui wrapper that a developer can drop in and immediately customize without reading Base UI docs.

## Phases

- [ ] **Phase 0: Preparation & API Design** - Lock cross-cutting conventions (slot vocabulary, tokens, animations, icon props) before any component is written
- [ ] **Phase 1: Foundation Components** - Scaffold 0.5.0 registry and ship the five simplest primitives (Button, Separator, Avatar, Progress, Meter)
- [ ] **Phase 2: Form Basics** - Ship form container and basic input primitives (Field, Fieldset, Form, Input, Switch, Toggle)
- [ ] **Phase 3: Selection Inputs** - Ship choice-based inputs (Checkbox, Checkbox Group, Radio, Radio Group, Toggle Group, Slider)
- [ ] **Phase 4: Specialized Inputs** - Ship numeric and OTP input primitives (Number Field, OTP Field)
- [ ] **Phase 5: Overlays & Feedback** - Ship portal-backed overlays and feedback surfaces (Dialog, Alert Dialog, Drawer, Tooltip, Preview Card, Toast)
- [ ] **Phase 6: Popup & Menu Family** - Ship popup-anchored selection and menu components (Popover, Select, Menu, Context Menu, Menubar, Combobox, Autocomplete)
- [ ] **Phase 7: Structure & Navigation** - Ship layout/navigation primitives, finalize registry, wire docs site (Accordion, Collapsible, Tabs, Toolbar, Scroll Area, Navigation Menu)

## Phase Details

### Phase 0: Preparation & API Design
**Goal**: Cross-cutting API conventions are documented and verified so that all 37 component implementations can proceed without rework
**Depends on**: Nothing (first phase)
**Requirements**: PREP-01, PREP-02, PREP-03, PREP-04
**Success Criteria** (what must be TRUE):
  1. A canonical `classNames` slot vocabulary exists in a documented reference (root, trigger, popup, backdrop, list, item, icon, indicator, label, description, helperText, errorText, header, footer, content) and any future component uses only these names
  2. A token audit report confirms every CSS variable required by the 37 target components is already present in `index.css`; any additions are committed before Phase 1
  3. Standardized overlay open/close animation CSS classes (extending the `.bct-dialog-*` 0.4.0 pattern) are defined in `index.css` and cover enter/exit with correct fill-mode behavior
  4. Documented API conventions exist for icon prop naming (`triggerIcon`, `closeIcon`, etc. as `ReactNode`), ref forwarding targets for form inputs, `items` discriminated union shape for menu family, and `renderItem` escape hatch pattern
**Plans**: TBD

### Phase 1: Foundation Components
**Goal**: Developers can install and use the five simplest Base UI primitives via `bct add <component>` from the new 0.5.0 registry
**Depends on**: Phase 0
**Requirements**: INFRA-01, INFRA-02 (partial, for Phase 1 components), FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. The `packages/ui/src/registry/versions/0.5.0/` directory exists with a valid `registry.json` scaffold and components subfolder
  2. Developer can run `bct add button` and receive a single-file Button component supporting `variant` (primary, secondary, tertiary, error, success, warning, info, text, icon) and `size` (sm, md, lg) props with zero-config render
  3. Developer can run `bct add separator`, `bct add avatar`, `bct add progress`, and `bct add meter` and each produces a working single-file component with documented props (orientation / src+alt+fallback / value+min+max / value+min+max+label)
  4. Every Phase 1 component uses only BCT CSS variable tokens, exposes `className` and `classNames` overrides, and renders usefully without any required props beyond content
  5. Each Phase 1 component has a valid `registry.json` entry with correct `deps` and `registryDeps` (all empty for this phase)
**Plans**: TBD

### Phase 2: Form Basics
**Goal**: Developers can compose basic HTML-form UIs using bct-ui form container and input primitives
**Depends on**: Phase 1
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add field` / `fieldset` / `form` and assemble a labeled form with helper text, error text, required markers, a legend, and `onSubmit` passthrough using only props
  2. Developer can run `bct add input` and get an Input with `type`, `placeholder`, `size`, inline label/error/helperText props; its ref forwards to the native `<input>` element so react-hook-form `register` works
  3. Developer can run `bct add switch` and `bct add toggle` and get controlled/uncontrolled components; Switch thumb animates on state change and Toggle exposes `pressed`, `size`, `variant` props
  4. All Phase 2 components forward ref to their native form element and accept `className` / `classNames` per the Phase 0 vocabulary
**Plans**: TBD

### Phase 3: Selection Inputs
**Goal**: Developers can build choice-based inputs — single, multi, and ranged — from bct-ui primitives
**Depends on**: Phase 2
**Requirements**: SEL-01, SEL-02, SEL-03, SEL-04, SEL-05, SEL-06
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add checkbox` and `bct add radio` and get working single components with `label`, `checked`/`defaultChecked` (and `indeterminate` for Checkbox); checkmark uses Lucide with icon-prop override
  2. Developer can run `bct add checkbox-group`, `bct add radio-group`, and `bct add toggle-group` and get items-array driven components with correct `registryDeps` (`["checkbox"]`, `["radio"]`, `["toggle"]`) that install the base component alongside
  3. Developer can run `bct add slider` and get a Slider with `value`/`defaultValue`, `min`, `max`, `step`, `orientation` props; ref forwards to the native input element
  4. All Phase 3 components use Lucide icons exclusively (no inline SVG) and expose icon-override props where icons are used
**Plans**: TBD

### Phase 4: Specialized Inputs
**Goal**: Developers can use numeric stepper and multi-segment OTP inputs as drop-in bct-ui components
**Depends on**: Phase 3
**Requirements**: SPEC-01, SPEC-02
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add number-field` and get a Number Field with `label`, `value`/`defaultValue`, `min`, `max`, `step` props; increment/decrement use Lucide defaults with override props
  2. Developer can run `bct add otp-field` and get an OTP Field with configurable `length` (default 6), inline segment rendering, and an `onComplete` callback that fires when all segments are filled
  3. Both Phase 4 components forward ref to their native input element and render with only the minimum props required
**Plans**: TBD

### Phase 5: Overlays & Feedback
**Goal**: Developers can open portal-backed overlays and surface transient feedback using bct-ui components with smooth animations
**Depends on**: Phase 4
**Requirements**: OVER-01, OVER-02, OVER-03, OVER-04, OVER-05, OVER-06
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add dialog` and `bct add alert-dialog` and get portal-backed overlays with `trigger`, `title`, `description`, content/footer or confirm/cancel props; open and close transitions animate smoothly (no snap-out)
  2. Developer can run `bct add drawer` and get a side-anchored overlay (`side`: top/bottom/left/right) that slides in and out with correct `fill-mode: forwards` animation behavior
  3. Developer can run `bct add tooltip` and `bct add preview-card` and position them via `side` / `align` / `delay` props
  4. Developer can wrap their app in `<ToastProvider>`, call `toast({ title, description, variant })` from anywhere, and see toasts rendered with the four variants (default, success, error, warning)
  5. All Phase 5 components use the standardized overlay animation classes from Phase 0 and expose `classNames` slots including `backdrop` and `popup`
**Plans**: TBD
**Research required before planning**: yes — confirm Base UI 1.1 Drawer primitive availability, Toast imperative API shape (`toastManager`), and exact `data-open`/`data-closed` attribute names
**UI hint**: yes

### Phase 6: Popup & Menu Family
**Goal**: Developers can build popup-anchored selection inputs and multi-level menus from bct-ui components
**Depends on**: Phase 5
**Requirements**: POPUP-01, POPUP-02, POPUP-03, POPUP-04, POPUP-05, POPUP-06, POPUP-07
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add popover` and `bct add select` and get anchored popups; Select exposes an `options: [{value, label}]` prop, `placeholder`, `label`, and chevron icon override
  2. Developer can run `bct add menu` and `bct add context-menu` and pass a `MenuItem[]` discriminated union (item / separator / group / submenu) with per-item Lucide icons; Context Menu targets its children on right-click
  3. Developer can run `bct add menubar` and get a horizontal multi-menu with `menus: [{label, items}]`; the registry entry declares `registryDeps: ["menu"]`
  4. Developer can run `bct add combobox` and `bct add autocomplete` and get filterable selection inputs; both accept `options`, `value`/`defaultValue`, `placeholder`, `filterFn`; Autocomplete additionally supports `freeSolo`
  5. Every items-array component in this phase accepts the `renderItem` escape hatch defined in Phase 0
**Plans**: TBD
**Research required before planning**: yes — verify Combobox / Autocomplete filtering API in Base UI 1.1, decide Combobox vs Autocomplete split, confirm Menubar composition model
**UI hint**: yes

### Phase 7: Structure & Navigation
**Goal**: Developers can assemble layout/navigation UIs from bct-ui components, the full 0.5.0 registry is live, and the docs site previews every component
**Depends on**: Phase 6
**Requirements**: STRUCT-01, STRUCT-02, STRUCT-03, STRUCT-04, STRUCT-05, STRUCT-06, INFRA-02 (completion), INFRA-03, INFRA-04, INFRA-05, XCUT-01, XCUT-02, XCUT-03, XCUT-04, XCUT-05
**Success Criteria** (what must be TRUE):
  1. Developer can run `bct add accordion`, `collapsible`, `tabs`, `toolbar`, `scroll-area`, and `navigation-menu` and get working single-file components with the documented props (items/tabs/orientation/open/children/viewport)
  2. `registry.json` in 0.5.0 contains valid entries for all 37 components with correct `deps` (`@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react`) and `registryDeps` (empty except the four documented dependencies)
  3. Docs site `VALID_VERSIONS` includes `"0.5.0"` and `PREVIEW_REGISTRY` has preview wrappers rendering every one of the 37 components
  4. `pnpm verify-registry-version` passes against 0.5.0 with no errors
  5. Cross-cutting audit confirms: no arbitrary hex/rgb values in any component source, all form inputs forward ref to their native element, every component exposes `className` + `classNames`, every component renders with zero required props beyond content, and no inline SVG appears in any component file
**Plans**: TBD
**Research required before planning**: yes — verify Navigation Menu Viewport model in Base UI 1.1 before planning
**UI hint**: yes

## Dependencies Graph

```
Phase 0 (API Design)
   ↓
Phase 1 (Foundation + registry scaffold)
   ↓
Phase 2 (Form Basics)
   ↓
Phase 3 (Selection Inputs) ← depends on toggle/checkbox/radio from Phase 2 + 3
   ↓
Phase 4 (Specialized Inputs)
   ↓
Phase 5 (Overlays & Feedback) [research required]
   ↓
Phase 6 (Popup & Menu Family) [research required] ← reuses overlay animation conventions
   ↓
Phase 7 (Structure & Navigation + registry finalization) [research required]
```

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 0. Preparation & API Design | 0/0 | Not started | - |
| 1. Foundation Components | 0/0 | Not started | - |
| 2. Form Basics | 0/0 | Not started | - |
| 3. Selection Inputs | 0/0 | Not started | - |
| 4. Specialized Inputs | 0/0 | Not started | - |
| 5. Overlays & Feedback | 0/0 | Not started | - |
| 6. Popup & Menu Family | 0/0 | Not started | - |
| 7. Structure & Navigation | 0/0 | Not started | - |

## Coverage Summary

**Total v1 requirements:** 52
**Mapped to phases:** 52
**Orphaned:** 0

| Category | Count | Phase |
|----------|-------|-------|
| PREP-01–04 | 4 | Phase 0 |
| FOUND-01–05 | 5 | Phase 1 |
| FORM-01–06 | 6 | Phase 2 |
| SEL-01–06 | 6 | Phase 3 |
| SPEC-01–02 | 2 | Phase 4 |
| OVER-01–06 | 6 | Phase 5 |
| POPUP-01–07 | 7 | Phase 6 |
| STRUCT-01–06 | 6 | Phase 7 |
| XCUT-01–05 | 5 | Phase 7 (final audit) |
| INFRA-01 | 1 | Phase 1 |
| INFRA-02 | 1 | Phases 1 + 7 (authored per phase, completed in 7) |
| INFRA-03–05 | 3 | Phase 7 |

**Note on cross-cutting requirements:** XCUT-01–05 are enforced in every phase during implementation but validated as a milestone audit in Phase 7's success criterion 5. INFRA-02 (registry entries) is authored phase-by-phase as components ship; the final complete-set validation runs in Phase 7.

---
*Roadmap created: 2026-04-21*
*Next: `/gsd-plan-phase 0`*
