# Phase 0: Preparation & API Design - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-21
**Phase:** 00-preparation-api-design
**Areas discussed:** Slot vocabulary scope, Animation class convention, MenuItem discriminated union, Convention document location

---

## Slot Vocabulary Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Closed list | Only canonical slots exist — no component-specific extras | ✓ |
| Baseline + extras | 15 standard slots, components can add their own | |

**User's choice:** Closed list

---

| Option | Description | Selected |
|--------|-------------|----------|
| Add title + close + actions | Extend to 18 slots to match 0.4.0 patterns | ✓ |
| Keep 15, remap old patterns | Dialog's 'title' → 'label', 'close' → 'icon', 'actions' → 'footer' | |

**User's choice:** Add title + close + actions

---

| Option | Description | Selected |
|--------|-------------|----------|
| Add cancelButton + confirmButton | Total 20 slots for precise action-button targeting | ✓ |
| Use footer only | Single 'footer' slot covers entire button row | |

**User's choice:** Add cancelButton + confirmButton

**Notes:** Final canonical vocabulary = 20 slots: root, trigger, popup, backdrop, list, item, icon, indicator, label, description, helperText, errorText, header, footer, content, title, close, actions, cancelButton, confirmButton.

---

## Animation Class Convention

| Option | Description | Selected |
|--------|-------------|----------|
| CSS classes in index.css | `.bct-*[data-open]` rules in index.css — same as 0.4.0 Dialog | ✓ |
| Tailwind data-* utilities in TSX | `data-open:animate-*` inline in component files | |

**User's choice:** CSS classes in index.css

---

| Option | Description | Selected |
|--------|-------------|----------|
| Component-specific names | `.bct-drawer-*`, `.bct-tooltip-*` — different timing per type | ✓ |
| Shared generic names | `.bct-overlay-*` covers all with one rule | |

**User's choice:** Component-specific names

**Notes:** Standardize on 0.4.0 Dialog's pattern. Deprecate inline Tailwind animation utilities from AlertDialog/DropdownMenu. All `[data-closed]` rules use `forwards` fill-mode.

---

## MenuItem Discriminated Union

| Option | Description | Selected |
|--------|-------------|----------|
| item \| separator \| group \| submenu | 4-type union per REQUIREMENTS spec | |
| Add checkItem \| radioItem \| radioGroup | 7-type union exposing Base UI's full checkbox/radio API | ✓ |

**User's choice:** 7-type union (item | separator | group | submenu | checkItem | radioItem | radioGroup)

---

| Option | Description | Selected |
|--------|-------------|----------|
| menu.tsx owns it, others import via registryDeps | Single source of truth; context-menu and menubar import from ./menu | ✓ |
| Duplicate types per file | Each file defines identical MenuItem union independently | |

**User's choice:** menu.tsx owns the canonical type

---

| Option | Description | Selected |
|--------|-------------|----------|
| renderItem?: (item: MenuItem) => ReactNode | Item-level render prop; Base UI handles nav/a11y | ✓ |
| children replaces items entirely | Full replacement — consumer wires Base UI sub-components | |

**User's choice:** `renderItem?: (item: MenuItem) => React.ReactNode`

---

## Convention Document Location

| Option | Description | Selected |
|--------|-------------|----------|
| Planning artifact only | `.planning/phases/00-*/00-API-SPEC.md` — GSD-native, not shipped | ✓ |
| Committed to 0.5.0 registry dir | `packages/ui/src/registry/versions/0.5.0/CONVENTIONS.md` | |
| TypeScript types file in src/ | Machine-readable spec as exported interfaces | |

**User's choice:** Planning artifact only (`.planning/phases/00-preparation-api-design/00-API-SPEC.md`)

---

## Claude's Discretion

- Token audit format and structure in API-SPEC.md
- Ref forwarding target mapping per component type

## Deferred Ideas

None — discussion stayed within phase scope.
