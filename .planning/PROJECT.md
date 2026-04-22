# bct-ui 0.5.0

## What This Is

bct-ui is a registry-distributed React component library built on Base UI primitives. Consumers run `bct add <component>` to copy component source into their project. Version 0.5.0 is a comprehensive rewrite that covers all 36 Base UI components as neutral, props-driven wrappers — more complete and adaptable than 0.4.0 while maintaining the same BCT token system and Tailwind-based styling.

## Core Value

Every Base UI component has a working, styled, props-driven bct-ui wrapper that a developer can drop in and immediately customize without reading Base UI docs.

## Requirements

### Validated

- ✓ Versioned registry system (`packages/ui/src/registry/versions/<semver>/`) — existing
- ✓ CLI `bct add <component>` distributes component source to consumer projects — existing
- ✓ Next.js docs site with live component previews — existing
- ✓ 0.4.0 component set (button, accordion, dialog, select, etc.) — existing
- ✓ BCT design token system in `index.css` (`--color-primary`, `--color-surface-1`, etc.) — existing
- ✓ Tailwind v4 + CSS variable bridge via `@theme` in index.css — existing

### Validated in Phase 00 (Preparation & API Design)

- ✓ `classNames` 20-slot closed vocabulary established (`00-API-SPEC.md`) — PREP-01
- ✓ `index.css` extended: `--z-toast: 120`, `--color-border-muted`/`--color-border-muted-hover` values, 4 new slide keyframes, 13 animation class families for Phase 5–7 overlays — PREP-02, PREP-03
- ✓ API conventions locked: icon props typed as `React.ReactNode`, ref forwarding targets for 11 form inputs, 7-type `MenuItem` discriminated union, `renderItem` escape hatch — PREP-04

### Validated in Phase 01 (Foundation Components)

- ✓ 0.5.0 registry directory structure with `registry.json` and `components/` subfolder — INFRA-01
- ✓ 5 foundation components implemented as single-file .tsx registry components — FOUND-01 through FOUND-05
  - `button.tsx` — 9 variants (primary/secondary/tertiary/error/success/warning/info/text/icon), 3 sizes, no "use client"
  - `separator.tsx` — orientation prop, `bg-divider` token, no "use client"
  - `avatar.tsx` — Base UI tri-part composition, size/shape/fallbackIcon, "use client"
  - `progress.tsx` — determinate/indeterminate via `bct-progress-indeterminate` CSS class, "use client"
  - `meter.tsx` — visible `BaseMeter.Label`, `h-3` track, required `value: number`, "use client"
- ✓ vitest configured for `packages/ui` with 5 passing test stubs — INFRA-02 (partial)
- ✓ `bct-progress-indeterminate` animation added to `index.css` — required before progress.tsx

### Validated in Phase 02 (Form Basics)

- ✓ `field.tsx` — Base UI Field wrapper with label, helperText, errorText (via `match={true}`), required marker, inline/stacked layout — FORM-01
- ✓ `fieldset.tsx` — Base UI Fieldset wrapper with legend and disabled propagation — FORM-02
- ✓ `form.tsx` — Native `<form>` wrapper with onSubmit passthrough — FORM-03
- ✓ `input.tsx` — Base UI Input with type/placeholder/size/icon/iconLabel props, forwardRef to native `<input>`, focus-visible ring on icon button — FORM-04
- ✓ `switch.tsx` — Base UI Switch with animated thumb, wrapped in BaseField.Root for accessible label wiring — FORM-05
- ✓ `toggle.tsx` — Base UI Toggle with pressed/size/variant props — FORM-06
- ✓ 7 registry entries added to `registry.json` for all Phase 2 components — INFRA-02 (partial)
- ✓ 12 vitest stubs passing

### Active

- [ ] All 36 Base UI components implemented as props-driven wrapper components
- [ ] Each component uses Tailwind utility classes referencing BCT CSS variables exclusively
- [ ] Each component has a working default (usable without any props beyond required content)
- [ ] Each component exposes `classNames` prop for sub-part style overrides
- [ ] Components using icons use Lucide defaults with a prop to override (`triggerIcon`, `closeIcon`, etc.)
- [ ] All components registered in `packages/ui/src/registry/versions/0.5.0/registry.json`
- [ ] Docs site updated: `VALID_VERSIONS` includes `"0.5.0"`, preview wrappers added for all components

### Out of Scope

- Compound component API (Accordion.Root, Accordion.Item, etc.) — 0.5.0 uses props-driven wrappers, not compound pattern
- Non-Base UI components from 0.4.0 (color-picker, date-picker, date-range-picker, file-upload, file-upload-input, file-icon, file-details-dialog, image-preview-dialog, rich-text-input, badge, card, breadcrumbs, pagination, skeleton, alert, spinner, header, sidebar, portal) — 0.5.0 scope is strictly the Base UI component list
- Full compound sub-component exports — one named export per component concept
- Custom component implementations not based on Base UI primitives
- Breaking changes to 0.4.0 components — they remain untouched in their version folder

## Context

**Current registry:** 0.4.0 has ~30 components but many are BCT-opinionated (custom card, breadcrumbs, file upload, etc.) and only ~15 map to Base UI primitives. The API pattern wraps everything into a single component with an `items` prop — this pattern continues in 0.5.0.

**Styling approach:** Components use Tailwind utility classes in TSX. All color/spacing values reference BCT CSS variables (`var(--color-primary)`, etc.) defined in index.css, which is distributed via `bct init`. This means 0.5.0 components require the bct-ui `index.css` to be present in the consumer project.

**Base UI scope:** All 36 components from base-ui.com — Accordion, Alert Dialog, Autocomplete, Avatar, Button, Checkbox, Checkbox Group, Collapsible, Combobox, Context Menu, Dialog, Drawer, Field, Fieldset, Form, Input, Menu, Menubar, Meter, Navigation Menu, Number Field, OTP Field, Popover, Preview Card, Progress, Radio, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Toggle Group, Toolbar, Tooltip.

**Icon system:** Lucide React is already a peer dep in some 0.4.0 components. All 0.5.0 icon usage goes through Lucide — no inline SVG. Each component with an icon has a sensible default and a prop override.

**Component complexity spectrum:** Some components (Button, Separator, Avatar) are simple wrappers. Others (Combobox, Autocomplete, Navigation Menu, Drawer) are complex multi-part components that will need more thought around the props-driven wrapper API.

## Constraints

- **Compatibility**: All 0.5.0 components must work with the existing `index.css` token system — no new token names unless added to index.css
- **Distribution**: Components must be single-file `.tsx` (the registry copies individual files — no multi-file components)
- **Dependencies**: Only `@base-ui/react`, `clsx`, `tailwind-merge`, and `lucide-react` as deps — no new peer deps
- **Styling**: No inline SVG in component source — Lucide only
- **Registry**: Must include `registry.json` entries with correct `deps` and `registryDeps` for all components

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Props-driven wrappers (not compound API) | Simpler DX than Base UI — consumers don't need to know sub-component structure | — Pending |
| Keep BCT token names (--color-primary etc.) | Backwards compatibility with existing consumer index.css | — Pending |
| Tailwind in TSX + CSS vars (not plain CSS classes) | Consistent with 0.4.0 pattern, avoids maintaining separate CSS class definitions | — Pending |
| Drop non-Base UI components from 0.5.0 | Focus: comprehensive Base UI coverage is more valuable than carrying forward custom components | — Pending |
| Single-file component constraint | Registry architecture requires it — each component is one `.tsx` file copied to consumer | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-22 after Phase 02 (Form Basics) complete*
