# Requirements: bct-ui 0.5.0

**Defined:** 2026-04-21
**Core Value:** Every Base UI component has a working, styled, props-driven bct-ui wrapper that a developer can drop in and immediately customize without reading Base UI docs.

## v1 Requirements

### Preparation

- [ ] **PREP-01**: Canonical `classNames` slot vocabulary is defined before any component is written (root, trigger, popup, backdrop, list, item, icon, indicator, label, description, helperText, errorText, header, footer, content)
- [ ] **PREP-02**: Token audit completed — every CSS variable needed by all 37 components is present in `index.css`; no new tokens added mid-milestone without updating `index.css`
- [ ] **PREP-03**: Animation CSS classes for overlay open/close standardized in `index.css` (building on `.bct-dialog-*` pattern from 0.4.0)
- [ ] **PREP-04**: API conventions documented — icon prop naming (`triggerIcon`, `closeIcon`, etc. as `ReactNode`), ref forwarding targets, `items` array discriminated union shape for menu family, `renderItem` escape hatch pattern

### Foundation Components

- [ ] **FOUND-01**: Developer can `bct add button` and get a working Button with variant (`primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `text`, `icon`) and size (`sm`, `md`, `lg`) props
- [ ] **FOUND-02**: Developer can `bct add separator` and get a working Separator with `orientation` prop
- [ ] **FOUND-03**: Developer can `bct add avatar` and get a working Avatar with `src`, `alt`, and fallback content props
- [ ] **FOUND-04**: Developer can `bct add progress` and get a working Progress with `value`, `min`, `max` props and BCT token styling
- [ ] **FOUND-05**: Developer can `bct add meter` and get a working Meter with `value`, `min`, `max`, and `label` props

### Form Basic Components

- [ ] **FORM-01**: Developer can `bct add field` and get a working Field with `label`, `helperText`, `errorText`, and `required` props
- [ ] **FORM-02**: Developer can `bct add fieldset` and get a working Fieldset with `legend` prop
- [ ] **FORM-03**: Developer can `bct add form` and get a working Form with `onSubmit` passthrough and error state handling
- [ ] **FORM-04**: Developer can `bct add input` and get a working Input with inline label/error/helperText, `type`, `placeholder`, `size` props; ref forwards to native `<input>`
- [ ] **FORM-05**: Developer can `bct add switch` and get a working Switch with `label`, `checked`/`defaultChecked`, `onChange` props; thumb animates on state change
- [ ] **FORM-06**: Developer can `bct add toggle` and get a working Toggle with `pressed`/`defaultPressed`, `size`, `variant` props

### Selection Input Components

- [ ] **SEL-01**: Developer can `bct add checkbox` and get a working Checkbox with `label`, `checked`/`defaultChecked`, `indeterminate` props; checkmark icon is Lucide with override
- [ ] **SEL-02**: Developer can `bct add checkbox-group` and get a working Checkbox Group with `items: [{value, label}]`, `value`/`defaultValue` props; depends on `checkbox`
- [ ] **SEL-03**: Developer can `bct add radio` and get a working Radio with `label`, `value`, `checked`/`defaultChecked` props
- [ ] **SEL-04**: Developer can `bct add radio-group` and get a working Radio Group with `items: [{value, label}]`, `value`/`defaultValue`, `orientation` props; depends on `radio`
- [ ] **SEL-05**: Developer can `bct add toggle-group` and get a working Toggle Group with `items: [{value, label, icon?}]`, `value`/`defaultValue`, `multiple` props; depends on `toggle`
- [ ] **SEL-06**: Developer can `bct add slider` and get a working Slider with `value`/`defaultValue`, `min`, `max`, `step`, `orientation` props; ref forwards to native input

### Specialized Input Components

- [ ] **SPEC-01**: Developer can `bct add number-field` and get a working Number Field with `label`, `value`/`defaultValue`, `min`, `max`, `step` props; increment/decrement icons are Lucide with override
- [ ] **SPEC-02**: Developer can `bct add otp-field` and get a working OTP Field with `length` prop (default 6), inline segment rendering, and `onComplete` callback

### Overlay & Feedback Components

- [ ] **OVER-01**: Developer can `bct add dialog` and get a working Dialog with `trigger`, `title`, `description`, `children`, `footer` props; open/close animates smoothly
- [ ] **OVER-02**: Developer can `bct add alert-dialog` and get a working Alert Dialog with `trigger`, `title`, `description`, `confirmLabel`, `cancelLabel`, `onConfirm`, `onCancel` props
- [ ] **OVER-03**: Developer can `bct add drawer` and get a working Drawer with `trigger`, `title`, `children`, `side` (`top`|`bottom`|`left`|`right`) props; slides in/out with animation
- [ ] **OVER-04**: Developer can `bct add tooltip` and get a working Tooltip with `trigger`, `content`, `side`, `delay` props
- [ ] **OVER-05**: Developer can `bct add preview-card` and get a working Preview Card with `trigger`, `header`, `body`, `footer`, `side` props
- [ ] **OVER-06**: Developer can `bct add toast` and get a working Toast via `<ToastProvider>` wrapper + imperative `toast()` function; supports `title`, `description`, `variant` (`default`|`success`|`error`|`warning`)

### Popup & Menu Components

- [ ] **POPUP-01**: Developer can `bct add popover` and get a working Popover with `trigger`, `content`, `side`, `align` props
- [ ] **POPUP-02**: Developer can `bct add select` and get a working Select with `options: [{value, label}]`, `value`/`defaultValue`, `placeholder`, `label` props; chevron icon Lucide with override
- [ ] **POPUP-03**: Developer can `bct add menu` and get a working Menu (dropdown) with `trigger`, `items: MenuItem[]` (supports item/separator/group/submenu types), Lucide icon per item
- [ ] **POPUP-04**: Developer can `bct add context-menu` and get a working Context Menu with `children` (right-click target), `items: MenuItem[]` same shape as Menu
- [ ] **POPUP-05**: Developer can `bct add menubar` and get a working Menubar with `menus: [{label, items: MenuItem[]}]` prop; depends on `menu`
- [ ] **POPUP-06**: Developer can `bct add combobox` and get a working Combobox with `options`, `value`/`defaultValue`, `placeholder`, `filterFn` props; search input filters options
- [ ] **POPUP-07**: Developer can `bct add autocomplete` and get a working Autocomplete with `options`, `value`/`defaultValue`, `placeholder`, `filterFn`, `freeSolo` props

### Structure & Navigation Components

- [ ] **STRUCT-01**: Developer can `bct add accordion` and get a working Accordion with `items: [{value, title, children}]`, `multiple`, `defaultValue` props; chevron icon animates; uses Lucide with override
- [ ] **STRUCT-02**: Developer can `bct add collapsible` and get a working Collapsible with `trigger`, `children`, `open`/`defaultOpen` props; animates height
- [ ] **STRUCT-03**: Developer can `bct add tabs` and get a working Tabs with `tabs: [{value, label, content}]`, `value`/`defaultValue`, `orientation` props
- [ ] **STRUCT-04**: Developer can `bct add toolbar` and get a working Toolbar with `items: MenuItem[]` prop; renders buttons/toggles/separators from item type
- [ ] **STRUCT-05**: Developer can `bct add scroll-area` and get a working Scroll Area with styled scrollbars using BCT tokens; `orientation` prop
- [ ] **STRUCT-06**: Developer can `bct add navigation-menu` and get a working Navigation Menu with `items: NavItem[]` (supports link/submenu types); viewport animates

### Cross-Cutting Quality

- [ ] **XCUT-01**: All 37 components use only BCT CSS variable tokens — no arbitrary hex/rgb values in component source
- [ ] **XCUT-02**: All form input components forward ref to the native form element (enables react-hook-form compatibility)
- [ ] **XCUT-03**: All 37 components accept `className` (top-level) and `classNames` (per-slot) override props
- [ ] **XCUT-04**: All 37 components render usefully with no required props beyond content (zero-config usability)
- [ ] **XCUT-05**: No inline SVG in any component source — all icons via lucide-react named imports

### Registry & Infrastructure

- [ ] **INFRA-01**: `packages/ui/src/registry/versions/0.5.0/` directory structure created
- [ ] **INFRA-02**: All 37 components have valid `registry.json` entries with correct `deps` and `registryDeps`
- [ ] **INFRA-03**: `VALID_VERSIONS` in docs site updated to include `"0.5.0"`
- [ ] **INFRA-04**: `PREVIEW_REGISTRY` updated with preview wrappers for all 37 components in docs site
- [ ] **INFRA-05**: `pnpm verify-registry-version` passes for 0.5.0 before publish

## v2 Requirements

### Advanced Interactions

- **ADV-01**: Toast supports `toast.promise()` helper for async operations
- **ADV-02**: Drawer supports snap-points / bottom-sheet affordance
- **ADV-03**: Select and Combobox support `groupBy` for grouped option lists
- **ADV-04**: Combobox supports `creatable` mode (free-form tag creation)
- **ADV-05**: Navigation Menu supports `linkComponent` prop for Next.js Link integration recipe

### CLI Tooling

- **CLI-01**: `bct doctor` validates consumer project has correct `index.css` token version
- **CLI-02**: `bct diff <component>` shows what changed between installed version and latest

### Non-Base-UI Components

- **EXTRA-01**: Badge component (carried from 0.4.0 pattern)
- **EXTRA-02**: Card component (carried from 0.4.0 pattern)
- **EXTRA-03**: Breadcrumbs component (carried from 0.4.0 pattern)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Compound component exports (`Accordion.Root`, etc.) | 0.5.0 uses props-driven wrappers; compound API adds complexity without value given the items-prop model |
| Non-Base UI components (color-picker, date-picker, file-upload, badge, card, etc.) | 0.5.0 scope is strictly the Base UI component list |
| New peer dependencies | Stack is locked; single-file distribution model requires minimal deps |
| CSS-only styling (no Tailwind) | Would require separate stylesheet distribution; Tailwind+CSS vars is the established 0.4.0 pattern |
| Multi-file components | Registry CLI copies individual files; components must be self-contained |
| Breaking changes to 0.4.0 | Existing version folder is immutable; consumers on 0.4.0 are unaffected |
| Inline SVG icons | Lucide only in 0.5.0 |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PREP-01 | Phase 0 | Pending |
| PREP-02 | Phase 0 | Pending |
| PREP-03 | Phase 0 | Pending |
| PREP-04 | Phase 0 | Pending |
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| FORM-01 | Phase 2 | Pending |
| FORM-02 | Phase 2 | Pending |
| FORM-03 | Phase 2 | Pending |
| FORM-04 | Phase 2 | Pending |
| FORM-05 | Phase 2 | Pending |
| FORM-06 | Phase 2 | Pending |
| SEL-01 | Phase 3 | Pending |
| SEL-02 | Phase 3 | Pending |
| SEL-03 | Phase 3 | Pending |
| SEL-04 | Phase 3 | Pending |
| SEL-05 | Phase 3 | Pending |
| SEL-06 | Phase 3 | Pending |
| SPEC-01 | Phase 4 | Pending |
| SPEC-02 | Phase 4 | Pending |
| OVER-01 | Phase 5 | Pending |
| OVER-02 | Phase 5 | Pending |
| OVER-03 | Phase 5 | Pending |
| OVER-04 | Phase 5 | Pending |
| OVER-05 | Phase 5 | Pending |
| OVER-06 | Phase 5 | Pending |
| POPUP-01 | Phase 6 | Pending |
| POPUP-02 | Phase 6 | Pending |
| POPUP-03 | Phase 6 | Pending |
| POPUP-04 | Phase 6 | Pending |
| POPUP-05 | Phase 6 | Pending |
| POPUP-06 | Phase 6 | Pending |
| POPUP-07 | Phase 6 | Pending |
| STRUCT-01 | Phase 7 | Pending |
| STRUCT-02 | Phase 7 | Pending |
| STRUCT-03 | Phase 7 | Pending |
| STRUCT-04 | Phase 7 | Pending |
| STRUCT-05 | Phase 7 | Pending |
| STRUCT-06 | Phase 7 | Pending |
| XCUT-01 | Phase 7 (enforced across all phases; audited Phase 7) | Pending |
| XCUT-02 | Phase 7 (enforced across all phases; audited Phase 7) | Pending |
| XCUT-03 | Phase 7 (enforced across all phases; audited Phase 7) | Pending |
| XCUT-04 | Phase 7 (enforced across all phases; audited Phase 7) | Pending |
| XCUT-05 | Phase 7 (enforced across all phases; audited Phase 7) | Pending |
| INFRA-01 | Phase 1 | Pending |
| INFRA-02 | Phases 1–7 (authored incrementally; completed Phase 7) | Pending |
| INFRA-03 | Phase 7 | Pending |
| INFRA-04 | Phase 7 | Pending |
| INFRA-05 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 52 total
- Mapped to phases: 52
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-21*
*Last updated: 2026-04-21 after roadmap creation*
