# Project Research Summary

**Project:** bct-ui 0.5.0 — props-driven wrappers for all Base UI primitives
**Domain:** React component library, registry-distributed, headless-primitive wrapping
**Researched:** 2026-04-21
**Confidence:** HIGH (stack locked; patterns empirically proven in 0.4.0; pitfalls grounded in existing source)

---

## Executive Summary

bct-ui 0.5.0 wraps all 37 Base UI primitives as props-driven single-file components. The stack is fully locked — `@base-ui/react@1.1.0`, `tailwindcss@4.x`, `clsx`, `tailwind-merge`, `lucide-react` — no new peer deps permitted. Every pattern needed is already proven in 0.4.0 (Button, Accordion, Dialog, Select, Tabs).

The primary risks are cross-cutting API decisions that must be resolved before mass implementation: slot vocabulary (`classNames` key names), icon prop shape, array API escape hatch (`renderItem`), and ref forwarding targets. Getting these wrong mid-stream causes rewrites across all 37 files.

---

## Stack

The stack is locked at the repo lockfile level. No decisions remain open.

| Package | Version | Role |
|---------|---------|------|
| `@base-ui/react` | 1.1.0 | Headless primitives — subpath imports `@base-ui/react/<name>` |
| `tailwindcss` | 4.x | Utility styling — `@theme` bridges CSS vars to utility classes |
| `tailwind-merge` | 2.6.1 | Class conflict resolution — consumer `className` always wins |
| `clsx` | 2.1.1 | Conditional class composition for variant/size maps |
| `lucide-react` | 0.460.0 | All built-in icons — named imports only |

**Explicitly excluded:** cva, tailwind-variants, framer-motion, radix-ui, react-hook-form, cmdk, any CSS-in-JS.

**Four wrapper patterns (all proven in 0.4.0):**
1. Single-primitive pass-through (Button, Separator, Avatar)
2. Compound collapse via `items` array (Accordion, Tabs, Select, Menu)
3. Portal-backed overlay with `data-open`/`data-closed` animation (Dialog, Popover, Tooltip)
4. Controlled/uncontrolled passthrough via `...props` spread (all form inputs)

---

## Component Count and Complexity

> **Note:** PROJECT.md says "36" but the enumerated list has 37. Radio Group and Radio are both listed separately. Reconcile at Phase 1 when registry entries are authored.

| Tier | Count | Components |
|------|-------|-----------|
| **Simple** | ~12 | Avatar, Button, Collapsible, Field, Fieldset, Form, Meter, Progress, Scroll Area, Separator, Switch, Toggle |
| **Medium** | ~16 | Alert Dialog, Checkbox, Checkbox Group, Dialog, Input, Number Field, OTP Field, Popover, Preview Card, Radio, Radio Group, Slider, Tabs, Toggle Group, Toolbar, Tooltip |
| **Complex** | ~9 | Autocomplete, Combobox, Context Menu, Drawer, Menu, Menubar, Navigation Menu, Select, Toast |

---

## Recommended Phase Order

| Phase | Focus | Components |
|-------|-------|-----------|
| **0** | Preparation / API Design | Slot vocabulary, token audit, lint rules, animation convention — no components |
| **1** | Foundation | Button, Separator, Avatar, Progress, Meter |
| **2** | Form Basics | Field, Fieldset, Form, Input, Switch, Toggle |
| **3** | Selection Inputs | Checkbox, Checkbox Group, Radio, Radio Group, Toggle Group, Slider |
| **4** | Specialized Inputs | Number Field, OTP Field |
| **5** | Overlays & Feedback | Dialog, Alert Dialog, Drawer, Tooltip, Preview Card, Toast |
| **6** | Popup & Menu Family | Popover, Select, Menu, Context Menu, Menubar, Combobox, Autocomplete |
| **7** | Structure & Navigation | Accordion, Collapsible, Tabs, Toolbar, Scroll Area, Navigation Menu |

**Phases needing research before planning:** Phase 5 (Drawer, Toast), Phase 6 (Combobox/Autocomplete filtering API), Phase 7 (Navigation Menu Viewport model).

---

## Critical Pitfalls

1. **`classNames` slot vocabulary drift** — 37 components with ad-hoc slot names creates consumer confusion. **Prevention:** Define canonical vocabulary (`root`, `trigger`, `popup`, `backdrop`, `list`, `item`, `icon`, `indicator`, `label`, `description`, `helperText`, `errorText`, `header`, `footer`, `content`) in Phase 0 and enforce via test.

2. **`index.css` token contract breaks in consumer projects** — new tokens added during development silently fail for consumers with older `index.css`. **Prevention:** Freeze token set at milestone start; audit all 37 components; forbid arbitrary Tailwind values (`bg-[#...]`) via lint.

3. **Animation `fill-mode: forwards` missing on close** — floating components snap out instead of animating. The 0.4.0 Dialog already encodes the solution (`.bct-dialog-*` CSS classes). **Prevention:** Standardize named CSS classes per overlay family in Phase 0; include close-animation checklist item per component.

4. **Array API can't express realistic items** — flat `items: Option[]` fails for separators, groups, submenus, per-item icons. **Prevention:** Use discriminated union (`{type: "item" | "separator" | "group" | "submenu"}`) for Menu family; add `renderItem` escape hatch on all items-array components.

5. **Ref forwarding missing or targeting wrong element** — breaks react-hook-form `register`. **Prevention:** For all form inputs, ref MUST reach the native form element; validate with a `register` example in docs.

---

## API Conventions to Establish in Phase 0

**Every component must have:**
- `className?: string` — top-level override, always last in `twMerge`
- `classNames?: { root, ... }` — per-slot overrides using canonical vocabulary
- `defaultValue` + `value` — controlled and uncontrolled both work
- `<part>Icon?: ReactNode` — Lucide default, consumer-replaceable
- `size?: "sm" | "md" | "lg"` where meaningful
- Zero-prop render — works with no required props beyond content

**Icon prop naming convention:** `triggerIcon`, `closeIcon`, `chevronIcon`, `checkIcon`, etc. — always `ReactNode`, never `ComponentType`.

**Shared item shape (Menu family):**
```ts
type MenuItem =
  | { type: "item"; label: string; icon?: ReactNode; onClick?: () => void; disabled?: boolean }
  | { type: "separator" }
  | { type: "group"; label: string; items: MenuItem[] }
  | { type: "submenu"; label: string; icon?: ReactNode; items: MenuItem[] }
```

**`registryDeps` (the only ones needed):**

| Component | `registryDeps` |
|-----------|---------------|
| `checkbox-group` | `["checkbox"]` |
| `radio-group` | `["radio"]` |
| `toggle-group` | `["toggle"]` |
| `menubar` | `["menu"]` |
| All others | `[]` |

---

## Open Decisions

| Decision | When to resolve | Recommendation |
|----------|----------------|---------------|
| **Drawer** — discrete primitive vs Dialog alias | Phase 5 start | Verify `@base-ui/react/drawer` in 1.1; prefer discrete if it exists |
| **Toast** — render component vs provider + imperative hook | Phase 5 start | Lean toward `<ToastProvider>` + `toast()` imperative; verify `toastManager` API |
| **Combobox vs Autocomplete** — two components or one | Phase 6 start | Mirror Base UI split — ship both as separate wrappers |
| **36 vs 37 count** | Phase 1 start | Confirm Radio/Radio Group import paths; reconcile at registry authoring |
| **TextArea scope** | Phase 2 start | Convenience wrapper around `<Input render={<textarea />}>` — not a separate Base UI primitive |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Locked in `pnpm-lock.yaml`; patterns proven in 0.4.0 |
| Features (simple/medium) | HIGH | Direct extension of existing patterns |
| Features (complex) | MEDIUM | Combobox, Autocomplete, NavigationMenu, Toast APIs need Base UI 1.1 verification |
| Architecture | HIGH | Single-file constraint, registry model, `registryDeps` all verified |
| Pitfalls | HIGH (project-specific) / MEDIUM (Base UI internals) | Project-grounded pitfalls HIGH; exact `data-*` attribute names MEDIUM |

**Gaps to address at implementation:**
- Base UI 1.1 `data-*` attribute names — verify at Phase 1 start
- Root-as-context-provider vs DOM-rendering Root — triage all 37 before Phase 1
- Drawer and Toast API specifics — dedicated Phase 5 research required

---

*Research completed: 2026-04-21 | Ready for roadmap: yes*
