# Phase 1: Foundation Components - Context

**Gathered:** 2026-04-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the `packages/ui/src/registry/versions/0.5.0/` directory structure and implement five Base UI primitive wrappers: Button, Separator, Avatar, Progress, Meter. Deliverable: `bct add button/separator/avatar/progress/meter` produces a working single-file component for each. No docs site preview wrappers required in this phase (Phase 7 handles that).

</domain>

<decisions>
## Implementation Decisions

### Button Variants (FOUND-01)
- **D-01:** 0.5.0 Button ships exactly 9 variants per FOUND-01: `primary`, `secondary`, `tertiary`, `error`, `success`, `warning`, `info`, `text`, `icon`. The 0.4.0 `-muted` siblings (`primary-muted`, `secondary-muted`, etc.) are NOT carried forward — clean break. Consumers who need muted tones use `className` or `classNames` overrides.

### Avatar Implementation (FOUND-03)
- **D-02:** 0.5.0 Avatar wraps Base UI Avatar primitives (`Avatar.Root`, `Avatar.Image`, `Avatar.Fallback`) — not a custom `useState`/`onError` implementation. Consistent with 0.5.0's core value of wrapping Base UI components; Base UI handles image load/error lifecycle internally.
- **D-03:** Avatar exposes `fallbackIcon?: React.ReactNode` defaulting to Lucide `<User />`, per the Phase 0 D-09 icon prop convention. When there is no `fallback` text and no `src` (or image fails), `fallbackIcon` renders.
- **D-04:** Avatar retains `size` (`sm` | `md` | `lg` | `xl`) and `shape` (`circle` | `square`) props from 0.4.0 — genuinely useful, not in conflict with FOUND-03 which specifies the minimum required props rather than the full prop set.

### Progress Indeterminate (FOUND-04)
- **D-05:** Progress includes indeterminate state via `value={null}`. Base UI Progress natively supports this (sets `aria-valuenow` to undefined, adds `data-indeterminate` attribute). A pulsing animation class hooks into `[data-indeterminate]` in `index.css`. This is added in Phase 1 rather than deferred — trivial to add now, difficult to retrofit once consumers use the component.

### Meter Color Zones (FOUND-05)
- **D-06:** Meter ships as a single-color uniform fill only. Base UI's `getSegmentStyle` color zone API is not wrapped in Phase 1 — the prop API design for zones is complex and not required by FOUND-05. Color zones deferred to v2 requirements (no phase target yet). Consumers needing color zones can use `classNames?.root` for now.

### Claude's Discretion
- Registry scaffold: Create `packages/ui/src/registry/versions/0.5.0/components/` and `registry.json` with entries for the 5 Phase 1 components only. Add remaining entries incrementally per phase.
- Separator: Determine appropriate `decorative` default (likely `false` — semantic separator by default for a11y). No user input required.
- Animation class for Progress indeterminate: Claude names and implements the pulsing keyframe in `index.css` following the established `bct-*` naming pattern from Phase 0.
- Meter visual differentiation from Progress: Claude decides (e.g., subtle color difference, no indeterminate support for Meter).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### API Conventions (Phase 0 deliverables)
- `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — Full API spec: 20-slot classNames vocabulary, icon prop conventions, composition stack pattern. Every Phase 1 component must follow this.
- `.planning/phases/00-preparation-api-design/00-CONTEXT.md` — Phase 0 decisions (D-01 through D-10). D-09 (icon props as ReactNode) directly governs Avatar's `fallbackIcon` prop.

### Project Constraints
- `.planning/PROJECT.md` — Core constraints: single-file .tsx, deps list, no inline SVG, BCT tokens only
- `.planning/REQUIREMENTS.md` — FOUND-01–05 and INFRA-01–02 are the Phase 1 requirements
- `.planning/ROADMAP.md` — Phase 1 success criteria (5 items)
- `.planning/codebase/CONVENTIONS.md` — Code conventions: naming, composition stack, Biome formatting

### Existing Code (reference implementations)
- `packages/ui/src/registry/versions/0.4.0/components/button.tsx` — 0.4.0 Button reference; 0.5.0 trims to 9 variants
- `packages/ui/src/registry/versions/0.4.0/components/avatar.tsx` — 0.4.0 Avatar reference; 0.5.0 switches to Base UI backing
- `packages/ui/src/registry/versions/0.4.0/registry.json` — Registry entry format reference (title, description, category, files, deps, registryDeps)
- `packages/ui/src/assets/tokens/index.css` — Token definitions and animation classes; Progress indeterminate animation added here

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/ui/src/registry/versions/0.4.0/components/button.tsx`: Base implementation pattern — extends `BaseButton`, variant/size maps as `Record<string, string>`, `twMerge(variantStyles, sizeStyles, className)`. 0.5.0 reuses this structure with trimmed variant set.
- `packages/ui/src/registry/versions/0.4.0/components/avatar.tsx`: Props and size/shape maps can be carried forward; replace the `useState`/`onError` core with Base UI Avatar primitives.
- `index.css` animation classes (`.bct-dialog-*` pattern from Phase 0): Naming pattern for the Progress indeterminate animation class.

### Established Patterns
- `"use client"` directive: Required for Avatar (uses Base UI Image which tracks load state) and Progress/Meter if they use Base UI's controlled state. Not needed for Button or Separator.
- Variant/size maps: `const VARIANT_STYLES: Record<string, string>` at module scope when static; inline `const` inside function when dynamic.
- Icon props: `fallbackIcon?: React.ReactNode` — not `LucideIcon` type. Default assigned in destructuring: `{ fallbackIcon = <User />, ...props }`.

### Integration Points
- `packages/ui/src/registry/versions/0.5.0/` — New directory to create. Registry JSON must follow the exact format of `0.4.0/registry.json`.
- `packages/ui/src/assets/tokens/index.css` — Add one pulsing keyframe + `[data-indeterminate]` animation rule for Progress indeterminate state.
- `apps/docs/lib/versions.ts` — `VALID_VERSIONS` does NOT need updating in Phase 1; docs integration is Phase 7 scope.

</code_context>

<specifics>
## Specific Ideas

- Button's `icon` variant should produce a square button (equal width/height, no horizontal padding) — consistent with 0.4.0's `sizeStyles` for `icon` variant (`h-8 w-8 p-0` for sm, etc.).
- Avatar `fallbackIcon` default should be `<User className="text-typography-muted" />` sized relative to the `size` prop — follow 0.4.0's `iconSizeStyles` map approach.
- Progress and Meter are visually similar; differentiate via label positioning: Meter always shows the `label` prop as visible text (FOUND-05 specifically calls out `label`), Progress uses `label` as `aria-label` only.

</specifics>

<deferred>
## Deferred Ideas

- Meter color zones (`zones?: { from, to, className }[]`) — v2 requirement, not scheduled for a phase yet.
- Button `-muted` variant siblings — dropped from 0.5.0 scope entirely (not a deferred idea, a deliberate removal).
- Avatar `size="xl"` was in 0.4.0; carried forward per D-04.

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-components*
*Context gathered: 2026-04-21*
