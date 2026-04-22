# Phase 2: Form Basics - Context

**Gathered:** 2026-04-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship form structural containers (Field, Fieldset, Form) and basic input primitives (Input, Switch, Toggle) as single-file .tsx Base UI wrappers, plus TextArea added as FORM-07 via this discussion. Deliverable: `bct add field / fieldset / form / input / switch / toggle / text-area` all produce working, labeled, composable components. No docs site preview wrappers in this phase (Phase 7 scope).

</domain>

<decisions>
## Implementation Decisions

### TextArea (FORM-07 — Scope Addition)
- **D-01:** TextArea is added to Phase 2 scope as FORM-07. It mirrors Input's prop shape: `label`, `helperText`, `errorText`, `size`, ref forwards to native `<textarea>`. Modeled after 0.4.0 `text-area.tsx` which already uses Base UI `Field.Root` / `Field.Control` / `Field.Error` / `Field.Description` internally.
- **D-02:** TextArea does NOT include `icon` / `iconPosition` / `onIconClick` props — icons inside multiline inputs are uncommon; consumers who need decoration compose via `className`.
- **D-03:** No `resize` prop — consumers set `resize-none` / `resize-y` / `resize` via Tailwind className override. JSDoc on TextArea's `classNames` prop MUST include a note documenting `resize-*` usage as an override example (e.g., `classNames={{ root: 'resize-y' }}`).
- **D-04 (Claude):** Whether to retain `showCharCount` / `maxLength` / `rows` from 0.4.0 TextArea is Claude's discretion — these are useful and already implemented in 0.4.0; keeping them is reasonable if they don't add undue complexity.

### Input Icon Props (FORM-04)
- **D-05:** 0.5.0 Input carries forward the `icon` / `iconPosition` (left | right, default right) / `onIconClick` props from 0.4.0 TextInput. Icon is typed as `React.ReactNode`. Ref forwards to the native `<input>` element inside the wrapper div — the icon wrapper div does not intercept the ref.
- **D-06 (Claude):** Input's classNames slot for the native `<input>` element is Claude's discretion. The canonical 20-slot vocabulary does not include an "input" slot. Options: omit the slot (consumers style via CSS selectors) or reuse `content`. Whichever is chosen must be consistent with TextArea.

### Toggle Visual Design (FORM-06)
- **D-07:** Toggle uses button-style with active (pressed) state: appears as an outlined/tertiary-style button when unpressed; gets a filled primary background when pressed. Same visual language as Button.
- **D-08:** Toggle variant set: `default | outline | ghost`. `default` = filled on press (no border unpressed), `outline` = border always + fill on press, `ghost` = no border ever + tinted background on press.
- **D-09:** Toggle size follows Button's `sm | md | lg` pattern.
- **D-10:** Toggle exposes `pressed` / `defaultPressed` / `onPressedChange` from Base UI Toggle.Root API.

### Form Component Scope (FORM-03)
- **D-11:** `form.tsx` is a thin wrapper: wraps Base UI `Form.Root` with an `onSubmit` passthrough and renders `children`. No built-in errors map prop, no submit button, no slot structure beyond `root` (the form element). Consumers compose `Field` + `Input` inside.

### Claude's Discretion
- **Field (FORM-01):** Claude decides internal slot structure — `root` (the Field.Root wrapper), `label` (Field.Label), `helperText` (Field.Description), `errorText` (Field.Error). `required` prop renders a visual marker (asterisk) inside the label.
- **Fieldset (FORM-02):** `root` = the `<fieldset>` element, `legend` prop renders inside a `<legend>` child. Simple structural wrapper with minimal styling.
- **Input size prop:** `sm | md | lg` following Button's height/padding pattern (h-8/h-10/h-12 respectively).
- **Switch classNames slots:** Per Phase 0 API spec slot rename table ("switch → no slot, base element is root"), `root` = `<BaseSwitch.Root>` (the track/pill); `indicator` = `<BaseSwitch.Thumb>`; outer wrapper div receives top-level `className` only (no named classNames slot for the wrapper).
- **`React.useId()` vs `Math.random()`:** Use `React.useId()` for stable SSR-safe id generation in Input and TextArea (available in React 18 — already the project's React version).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

No external specs — requirements fully captured in decisions above and in the planning files below.

### API Conventions (Phase 0 deliverables)
- `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — Full API spec: 20-slot classNames vocabulary (Section 1), icon prop conventions (Section 2), ref forwarding targets for all Phase 2 form inputs (Section 3: Input → `<input>`, Switch → `BaseSwitch.Root`, Toggle → `BaseToggle.Root`). Every Phase 2 component must follow this.
- `.planning/phases/00-preparation-api-design/00-CONTEXT.md` — Phase 0 decisions D-01–D-10; slot rename table (switch → root, thumb → indicator, error → errorText).

### Project Constraints
- `.planning/PROJECT.md` — Core constraints: single-file .tsx, deps list, no inline SVG, BCT tokens only, no new peer deps
- `.planning/REQUIREMENTS.md` — FORM-01 through FORM-06 are the Phase 2 requirements; TextArea (FORM-07) is added in this phase per this context
- `.planning/ROADMAP.md` — Phase 2 success criteria (4 items); note that FORM-07 expands the component count to 7 for this phase

### Reference Implementations
- `packages/ui/src/registry/versions/0.4.0/components/text-input.tsx` — 0.4.0 TextInput: icon/iconPosition/onIconClick pattern, inline label/helperText/error, aria-describedby wiring — primary reference for 0.5.0 Input
- `packages/ui/src/registry/versions/0.4.0/components/switch.tsx` — 0.4.0 Switch: label/description/error layout pattern; 0.5.0 renames slots (switch → root, thumb → indicator, error → errorText) per API spec
- `packages/ui/src/registry/versions/0.4.0/components/text-area.tsx` — 0.4.0 TextArea: already uses Base UI Field.Root/Field.Control/Field.Error/Field.Description; showCharCount/rows props; primary reference for 0.5.0 TextArea
- `packages/ui/src/registry/versions/0.5.0/components/button.tsx` — Phase 1 Button: variant/size record pattern, composition stack — Toggle follows same structure with pressed-state styles added

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `packages/ui/src/registry/versions/0.4.0/components/text-input.tsx`: Near-complete reference for 0.5.0 Input — update to `forwardRef`, add `size` prop (sm/md/lg height/padding), adopt canonical slot renames, replace `Math.random()` id with `React.useId()`.
- `packages/ui/src/registry/versions/0.4.0/components/switch.tsx`: Label/description layout pattern reusable; rename slots to 0.5.0 vocabulary; add `forwardRef` targeting `BaseSwitch.Root`.
- `packages/ui/src/registry/versions/0.4.0/components/text-area.tsx`: Already uses Base UI Field parts — adapt slot names (textarea → Claude discretion, error → errorText, helperText → helperText), add size prop, switch id generation to `React.useId()`.
- `packages/ui/src/registry/versions/0.5.0/components/button.tsx`: Variant/size `Record<string, string>` maps, composition stack — Toggle reuses this pattern with `pressed`/`defaultPressed` logic.

### Established Patterns
- `forwardRef` + `displayName`: Required for all Phase 2 form inputs (Input, Switch, Toggle, TextArea) per the API spec ref forwarding table.
- `"use client"` directive: Required for Switch, Toggle (stateful Base UI primitives). Input and TextArea use Base UI Field/Input primitives which may also require it — check @base-ui/react docs at implementation time.
- Composition stack: `twMerge(clsx("base-classes", { condition }), classNames?.slot, className)` — apply to every named slot and the top-level `className`.
- `React.useId()` for stable id generation: Use instead of `Math.random()` for SSR safety in Input and TextArea.

### Integration Points
- `packages/ui/src/registry/versions/0.5.0/registry.json` — Add entries for all 7 Phase 2 components: `field`, `fieldset`, `form`, `input`, `switch`, `toggle`, `text-area`. All entries: `deps: ["@base-ui/react", "clsx", "tailwind-merge", "lucide-react"]`, `registryDeps: []`.
- `packages/ui/src/registry/versions/0.5.0/components/` — 7 new single-file .tsx components in this phase.
- `packages/ui/src/assets/tokens/index.css` — No new tokens expected; token audit in Phase 0 confirmed coverage. Verify at implementation: `--color-primary`, `--color-border`, `--color-surface-*`, `--color-error`, `--color-typography-*` cover all Phase 2 styling needs.

</code_context>

<specifics>
## Specific Ideas

- TextArea `classNames` JSDoc should include an explicit example: `classNames={{ root: 'resize-y' }}` to make the resize override discoverable.
- Toggle pressed state uses Base UI's `data-pressed` attribute — style it as `data-pressed:bg-primary` (default variant), `data-pressed:bg-primary data-pressed:border-primary` (outline variant), `data-pressed:bg-surface-2` (ghost variant).
- Switch: the outer label-alignment wrapper div receives top-level `className` only. `classNames.root` maps to `<BaseSwitch.Root>` (the pill/track). This matches the Phase 0 API spec rename decision and avoids needing a non-canonical wrapper slot.
- Input: maintain 0.4.0's `aria-invalid` / `aria-describedby` wiring for accessibility — these should carry forward to 0.5.0.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-form-basics*
*Context gathered: 2026-04-22*
