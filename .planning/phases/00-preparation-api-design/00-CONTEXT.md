# Phase 0: Preparation & API Design - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase produces documented API conventions and verified CSS infrastructure (tokens + animations) that all 37 component implementations in Phases 1–7 will follow — no components are built here, only the spec that prevents rework. Deliverables: canonical slot vocabulary (written to `00-API-SPEC.md`), token audit result, updated `index.css` animation classes, and documented API conventions for icon props, ref forwarding, `MenuItem` union shape, and `renderItem` escape hatch.

</domain>

<decisions>
## Implementation Decisions

### classNames Slot Vocabulary (PREP-01)
- **D-01:** The canonical vocabulary is a **closed list** — components use only these named slots, no component-specific extras. If a sub-part doesn't map to a canonical slot, reconsider the component's structure.
- **D-02:** Final canonical slot list (20 slots):
  `root`, `trigger`, `popup`, `backdrop`, `list`, `item`, `icon`, `indicator`, `label`, `description`, `helperText`, `errorText`, `header`, `footer`, `content`, `title`, `close`, `actions`, `cancelButton`, `confirmButton`
  — The first 15 come from REQUIREMENTS PREP-01; `title`, `close`, `actions`, `cancelButton`, `confirmButton` are added to match 0.4.0 patterns and avoid regressing consumers upgrading from 0.4.0.

### Animation CSS Classes (PREP-03)
- **D-03:** All overlay open/close animations are defined as CSS classes in `index.css`, using the `[data-open]` / `[data-closed]` selector pattern — same approach as 0.4.0 Dialog (`.bct-dialog-backdrop`, `.bct-dialog-modal`, etc.). The inline Tailwind `data-open:animate-*` pattern used in 0.4.0 AlertDialog and DropdownMenu is **deprecated** for 0.5.0.
- **D-04:** Animation class naming is **component-specific**: each overlay type gets its own family (e.g. `.bct-drawer-bottom`, `.bct-tooltip-popup`, `.bct-toast-item`). This allows per-component timing curves — tooltips appear fast (100ms), drawers slide slow (300ms). Consistent with the existing `.bct-dialog-*` family.
- **D-05:** All new animation class families must use `forwards` fill-mode on `[data-closed]` rules to prevent snap-out.

### MenuItem Discriminated Union (PREP-04)
- **D-06:** The `MenuItem` type is a **7-type discriminated union** on a `type` field:
  `item | separator | group | submenu | checkItem | radioItem | radioGroup`
  — `checkItem` and `radioItem` expose Base UI's native `Menu.CheckboxItem` and `Menu.RadioItem` APIs. `radioGroup` is the container for `radioItem` entries.
- **D-07:** `menu.tsx` is the **canonical owner** of the `MenuItem` union and all sub-types. `context-menu.tsx` and `menubar.tsx` declare `registryDeps: ["menu"]` and import the type via `import type { MenuItem } from "./menu"`. No type duplication across files.
- **D-08:** The **`renderItem` escape hatch** contract is: `renderItem?: (item: MenuItem) => React.ReactNode`. Applied at the item level — Base UI still handles keyboard navigation, selection, and accessibility. Consumer gets item data and returns custom JSX.

### Icon Props (PREP-04)
- **D-09:** Icon props are typed as `React.ReactNode` (not `LucideIcon`). Each component with a default icon exposes a named override prop following the pattern: `triggerIcon`, `closeIcon`, `checkIcon`, `indicatorIcon`, `incrementIcon`, `decrementIcon`. Defaults are Lucide imports; passing `null` hides the icon; passing any `ReactNode` replaces it.

### Convention Document Location
- **D-10:** The API spec lives as a **planning artifact** at `.planning/phases/00-preparation-api-design/00-API-SPEC.md`. It is NOT shipped with the package — CLAUDE.md and the component source serve as contributor documentation. Downstream GSD agents reference it via CONTEXT.md canonical refs.

### Claude's Discretion
- Token audit format (PREP-02): Claude decides how to structure the audit output in `00-API-SPEC.md` — a checklist or table mapping each of the 37 components' CSS variable needs against `index.css` is fine.
- Ref forwarding targets (PREP-04): Claude documents the obvious mapping (Input → `<input>`, Select → `<select>`, Slider → `<input type="range">`, etc.) without needing user input per component.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in the planning files listed below.

### Planning Artifacts
- `.planning/PROJECT.md` — Core value, constraints, key decisions, out-of-scope list
- `.planning/REQUIREMENTS.md` — Full v1 requirement set; PREP-01–04 are Phase 0's specific requirements
- `.planning/ROADMAP.md` — Phase 0 success criteria (4 items), dependency graph
- `.planning/codebase/CONVENTIONS.md` — Established code conventions (naming, styling, TypeScript patterns)

### Existing Code to Audit
- `packages/ui/src/assets/tokens/index.css` — Current token definitions and animation classes; Phase 0 extends this file
- `packages/ui/src/registry/versions/0.4.0/components/dialog.tsx` — Reference implementation for CSS animation class pattern
- `packages/ui/src/registry/versions/0.4.0/components/alert-dialog.tsx` — Reference for slot vocabulary (classNames interface)
- `packages/ui/src/registry/versions/0.4.0/components/dropdown-menu.tsx` — Reference for existing MenuItem shape (flat, to be extended)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `index.css` animation classes (`.bct-dialog-backdrop`, `.bct-dialog-modal`, `.bct-dialog-panel-right/left`): Phase 0 documents the naming pattern and adds new classes for Drawer, Tooltip, Toast, Popover, PreviewCard families.
- `DropdownMenuItem` interface in `dropdown-menu.tsx`: Starting point for the extended `MenuItem` discriminated union — Phase 0 documents the expanded shape.

### Established Patterns
- `classNames` prop with per-slot keys: Exists in 0.4.0 Dialog, AlertDialog, Tabs, etc. Phase 0 locks down the vocabulary so Phase 1+ implement consistently.
- `twMerge(clsx(...), classNames?.slot, className)`: Standard composition stack — already documented in CONVENTIONS.md, Phase 0 enforces via spec.
- `data-open` / `data-closed` attributes: Base UI sets these on overlay elements; all animation CSS classes hook into these selectors.

### Integration Points
- `packages/ui/src/assets/tokens/index.css`: Phase 0 adds new `.bct-*` animation class families for overlays not yet covered (Drawer, Tooltip, Toast, Popover, PreviewCard). Also validates all required CSS variables exist.
- `.planning/phases/00-preparation-api-design/00-API-SPEC.md`: New file created by Phase 0 — referenced by CONTEXT.md canonical refs for all subsequent phases.

</code_context>

<specifics>
## Specific Ideas

- The 7-type MenuItem union (`item | separator | group | submenu | checkItem | radioItem | radioGroup`) should be documented with a TypeScript code example in `00-API-SPEC.md` so implementers in Phases 6–7 don't need to derive it from scratch.
- Phase 0 does NOT implement any components — if the token audit (PREP-02) finds missing CSS variables, those additions to `index.css` are the only code changes permitted in this phase.
- The animation class families for Phase 5–6 components (Drawer, Tooltip, Toast, Popover, PreviewCard) should be stubbed into `index.css` in Phase 0 even though they won't be used until Phase 5. This prevents Phase 5 from needing to touch `index.css` for animation setup.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 00-preparation-api-design*
*Context gathered: 2026-04-21*
