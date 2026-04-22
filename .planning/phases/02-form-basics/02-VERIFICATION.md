---
phase: 02-form-basics
verified: 2026-04-22T09:50:00Z
status: human_needed
score: 4/4 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 3/4
  gaps_closed:
    - "Developer can assemble a labeled form with helper text, error text, and required markers using Field / Input / TextArea (match={true} applied to all Field.Error calls; Switch accessible label wired via BaseField.Root; TextArea initial char count fixed; Input icon a11y fixed)"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Render Field with errorText='Required field' in a browser or jsdom test environment"
    expected: "A visible red error message 'Required field' appears below the field control"
    why_human: "match={true} is now present on all BaseField.Error / Field.Error calls; confirming the fix works end-to-end requires a React rendering environment"
  - test: "Render Switch with label='Enable notifications' and inspect the accessibility tree with a screen reader or browser accessibility inspector"
    expected: "The switch element is announced as 'Enable notifications, switch' (or equivalent)"
    why_human: "Accessible name wiring via LabelableContext/BaseField.Label requires a real rendering environment; DOM attribute inspection alone does not confirm screen reader behavior"
---

# Phase 2: Form Basics Verification Report

**Phase Goal:** Developers can compose basic HTML-form UIs using bct-ui form container and input primitives
**Verified:** 2026-04-22T09:50:00Z
**Status:** human_needed
**Re-verification:** Yes — after gap closure from initial verification (status was gaps_found, score 3/4)

## Re-verification Summary

All three blocker gaps from the initial verification have been resolved:

1. **CR-01 (match={true})** — `match={true}` is present on `BaseField.Error` in `field.tsx` (line 57), `Field.Error` in `input.tsx` (line 144), `Field.Error` in `text-area.tsx` (line 136), and `BaseField.Error` in `switch.tsx` (line 81). Error text will now render when `errorText` is passed.

2. **CR-02 (Switch accessible name)** — `switch.tsx` now wraps its body in `BaseField.Root` with `invalid={!!errorText}`, replaces the plain `<span>` label with `BaseField.Label`, error text with `BaseField.Error match={true}`, and description with `BaseField.Description`. `LabelableContext` is populated; `BaseSwitch.Root` now receives a proper accessible name.

3. **WR-01 (TextArea initial char count)** — `useState(0)` replaced with a lazy initializer `useState(() => { const initial = props.defaultValue ?? props.value ?? ""; return typeof initial === "string" ? initial.length : 0 })`. `aria-live="polite"` added to the counter span.

4. **WR-02 (Input icon a11y)** — `iconLabel?: string` added to `InputProps`. Icon span `aria-label` now uses `iconLabel ?? "Icon action"`. Focus-visible ring classes (`rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus`) added to the icon span.

5. **WR-03 (registry.json lucide-react in input deps)** — `lucide-react` removed from the `input` entry. `input.deps` is now `["@base-ui/react", "clsx", "tailwind-merge"]`.

Previous passing items (SC-2, SC-3, SC-4) show no regressions.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|---------|
| 1 | Developer can run `bct add field` / `fieldset` / `form` and assemble a labeled form with helper text, error text, required markers, a legend, and `onSubmit` passthrough | VERIFIED | `match={true}` confirmed on all Field.Error calls (field.tsx:57, input.tsx:144, text-area.tsx:136). `render={<legend />}` confirmed in fieldset.tsx:37. `{...props}` spread on BaseForm in form.tsx. Error text will now render. |
| 2 | Developer can run `bct add input` and get an Input with `type`, `placeholder`, `size`, inline label/error/helperText props; ref forwards to native `<input>` | VERIFIED | `forwardRef<HTMLInputElement>` at input.tsx:47. SIZE_STYLES record (sm/md/lg). label/error/helper render conditionally. `classNames.content` on native input (D-06). `aria-invalid` + `aria-describedby` wired. `iconLabel` prop present. Focus ring on icon span. |
| 3 | Developer can run `bct add switch` and `bct add toggle`; Switch thumb animates on state change; Toggle exposes `pressed`, `size`, `variant` props | VERIFIED | switch.tsx: `data-checked:translate-x-5` on thumb; `transition-transform duration-200` present; `forwardRef<HTMLElement>`. toggle.tsx: VARIANT_STYLES (default/outline/ghost) + SIZE_STYLES (sm/md/lg) + `data-pressed:` classes; `forwardRef<HTMLButtonElement>`. |
| 4 | All Phase 2 components forward ref to their native form element and accept `className` / `classNames` per Phase 0 vocabulary | VERIFIED | Input: `forwardRef<HTMLInputElement>`; Switch: `forwardRef<HTMLElement>` (SwitchRoot renders span); Toggle: `forwardRef<HTMLButtonElement>`; TextArea: `forwardRef<HTMLTextAreaElement>` via `Field.Control render={<textarea ref={ref}>}`. Field/Fieldset/Form are structural wrappers — not ref-forwarding targets per Phase 0 API spec. All 7 components expose `className` + `classNames` with correct slots. |

**Score:** 4/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `packages/ui/src/registry/versions/0.5.0/components/field.tsx` | Field component — FORM-01 | VERIFIED | Exports `Field` + `FieldProps`. `"use client"` first line. `BaseField.Error match={true}` at line 57. `invalid={!!errorText}`. `classNames`: root/label/helperText/errorText. |
| `packages/ui/src/registry/versions/0.5.0/components/fieldset.tsx` | Fieldset component — FORM-02 | VERIFIED | Exports `Fieldset` + `FieldsetProps`. `"use client"` first line. `render={<legend />}` at line 37. `rounded-lg border border-border px-4 py-3`. `classNames`: root/label. |
| `packages/ui/src/registry/versions/0.5.0/components/form.tsx` | Form thin wrapper — FORM-03 | VERIFIED | Exports `Form` + `FormProps`. `"use client"` first line. Thin `BaseForm` wrapper; `{...props}` spread (D-11). `flex flex-col gap-4`. No errors map or submit button. |
| `packages/ui/src/registry/versions/0.5.0/components/input.tsx` | Input with icon/size/inline field — FORM-04 | VERIFIED | Exports `Input` (`forwardRef<HTMLInputElement>`) + `InputProps`. SIZE_STYLES sm/md/lg. `icon`/`iconPosition`/`onIconClick`/`iconLabel` (D-05 + WR-02 fix). `classNames.content` on native input (D-06). `aria-invalid` + `aria-describedby`. `match={true}` on Field.Error. Focus ring on icon span. |
| `packages/ui/src/registry/versions/0.5.0/components/switch.tsx` | Switch with animated thumb — FORM-05 | VERIFIED | Exports `Switch` (`forwardRef<HTMLElement>`) + `SwitchProps`. `"use client"` first line. `BaseField.Root` wraps body (CR-02 fix). `BaseField.Label` for accessible name. `BaseField.Error match={true}` (line 81). `data-checked:translate-x-5` on thumb. `classNames`: root/indicator/label/description/errorText. |
| `packages/ui/src/registry/versions/0.5.0/components/toggle.tsx` | Toggle with variant/size/pressed state — FORM-06 | VERIFIED | Exports `Toggle` (`forwardRef<HTMLButtonElement>`) + `ToggleProps`. `"use client"` first line. `VARIANT_STYLES` (default/outline/ghost) + `SIZE_STYLES` (sm/md/lg) + `data-pressed:` classes. `classNames.root`. No regressions. |
| `packages/ui/src/registry/versions/0.5.0/components/text-area.tsx` | TextArea with inline field, showCharCount — FORM-07 | VERIFIED | Exports `TextArea` (`forwardRef<HTMLTextAreaElement>`) + `TextAreaProps`. `Field.Control render={<textarea ref={ref}>}` (Pitfall 6 fix). `match={true}` on Field.Error (line 136). Lazy `useState()` reads `defaultValue ?? value` (WR-01 fix). `aria-live="polite"` on char count span. JSDoc resize-none example (D-03). No icon props (D-02). |
| `packages/ui/src/registry/versions/0.5.0/registry.json` | Registry entries for all 7 Phase 2 components | VERIFIED | 12 total entries. All 7 Phase 2 entries: `registryDeps=[]`, `category="form-inputs"`. `input.deps` = `["@base-ui/react", "clsx", "tailwind-merge"]` (lucide-react removed, WR-03 fix). All 5 Phase 1 entries unchanged. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| field.tsx | @base-ui/react/field | BaseField.Root / .Label / .Error match={true} / .Description | WIRED | Import at line 3; match={true} at line 57 |
| fieldset.tsx | @base-ui/react/fieldset | BaseFieldset.Root + Legend render={<legend />} | WIRED | Import at line 3; render={<legend />} at line 37 |
| form.tsx | @base-ui/react/form | BaseForm with `{...props}` spread | WIRED | Import at line 3; spread on BaseForm |
| input.tsx | @base-ui/react/input | BaseInput forwardRef to native input | WIRED | Import at line 3; `forwardRef<HTMLInputElement>` |
| input.tsx | @base-ui/react/field | Field.Root / .Label / .Error match={true} / .Description | WIRED | Import at line 4; match={true} at line 144 |
| switch.tsx | @base-ui/react/field | BaseField.Root / .Label / .Error match={true} / .Description | WIRED | Import at line 3 (CR-02 fix); match={true} at line 81 |
| switch.tsx | @base-ui/react/switch | BaseSwitch.Root + BaseSwitch.Thumb | WIRED | Import at line 4; both primitives used |
| toggle.tsx | @base-ui/react/toggle | BaseToggle with data-pressed: variant styles | WIRED | Import at line 3; data-pressed: in VARIANT_STYLES |
| text-area.tsx | @base-ui/react/field | Field.Root + Field.Control render prop + Field.Error match={true} | WIRED | Import at line 3; Field.Control at line 107; match={true} at line 136 |
| registry.json | components/*.tsx | files[0].src entries | WIRED | All 12 entries confirmed; input deps corrected |

### Data-Flow Trace (Level 4)

All Phase 2 components are UI-only wrappers with no server data or async state. Dynamic data flows from consumer props directly into JSX.

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| text-area.tsx | charCount | lazy `useState(() => props.defaultValue ?? props.value ?? "")` + `handleChange` | Yes — reads real initial value; updates on input | FLOWING (WR-01 fixed: lazy initializer now reflects pre-populated value) |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| All 12 test stubs pass | `pnpm --filter @bctechnology/ui test` | 12 passed (1 test file), 456ms | PASS |
| registry.json has 12 entries | `node -e "console.log(Object.keys(require(...)).length)"` | 12 | PASS |
| input entry has no lucide-react | `node -e "console.log(r.input.deps.includes('lucide-react'))"` | false | PASS |
| input deps correct | `node -e "console.log(r.input.deps.join(','))"` | @base-ui/react,clsx,tailwind-merge | PASS |
| match={true} in field.tsx | `grep -c 'match={true}' field.tsx` | 1 | PASS |
| match={true} in input.tsx | `grep -c 'match={true}' input.tsx` | 1 | PASS |
| match={true} in text-area.tsx | `grep -c 'match={true}' text-area.tsx` | 1 | PASS |
| match={true} in switch.tsx | `grep -c 'match={true}' switch.tsx` | 1 | PASS |
| BaseField.Root in switch.tsx | `grep -c 'BaseField\.' switch.tsx` | 8 (Root x2, Label x2, Error x2, Description x2) | PASS |
| Lazy charCount initializer | `grep -c 'useState(() =>' text-area.tsx` | 1 | PASS |
| aria-live on char count span | `grep -c 'aria-live="polite"' text-area.tsx` | 1 | PASS |
| iconLabel in input.tsx | `grep -c 'iconLabel' input.tsx` | 3 (interface, destructuring, aria-label usage) | PASS |
| Focus ring on icon span | `grep -c 'focus-visible:ring-2' input.tsx` | 1 | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| FORM-01 | 02-02, 02-06 | `bct add field` — Field with label/helperText/errorText/required | SATISFIED | field.tsx exports Field; `match={true}` on BaseField.Error; errorText now renders |
| FORM-02 | 02-02 | `bct add fieldset` — Fieldset with legend prop | SATISFIED | fieldset.tsx exports Fieldset; `render={<legend />}` semantic fix present |
| FORM-03 | 02-02 | `bct add form` — Form with onSubmit passthrough | SATISFIED | form.tsx exports Form; `{...props}` spread passes onSubmit through (D-11) |
| FORM-04 | 02-04, 02-06, 02-07 | `bct add input` — Input with type/placeholder/size/inline label/error/helperText; ref forwards to native input | SATISFIED | `forwardRef<HTMLInputElement>`; SIZE_STYLES; `match={true}`; `iconLabel`; focus ring |
| FORM-05 | 02-03, 02-07 | `bct add switch` — Switch with label/checked/defaultChecked/onCheckedChange; thumb animates | SATISFIED | `forwardRef<HTMLElement>`; `data-checked:translate-x-5`; `BaseField.Label` for accessible name (CR-02 fix). Note: REQUIREMENTS.md says `onChange` — implementation correctly uses `onCheckedChange` (Base UI API), which passes through `...props`. This is intentional per 02-CONTEXT.md. |
| FORM-06 | 02-03 | `bct add toggle` — Toggle with pressed/defaultPressed/size/variant | SATISFIED | `forwardRef<HTMLButtonElement>`; VARIANT_STYLES (default/outline/ghost); SIZE_STYLES (sm/md/lg); `data-pressed:` classes |
| FORM-07 | 02-04, 02-06, 02-07 | TextArea scope extension (not in REQUIREMENTS.md; added via CONTEXT.md D-01) | SATISFIED | `forwardRef<HTMLTextAreaElement>`; `match={true}`; lazy charCount; `aria-live`; no icon props |

**Note on FORM-07:** This requirement ID appears throughout the plans but is absent from REQUIREMENTS.md (the traceability table ends at FORM-06 for Phase 2). TextArea was added as a scope extension via CONTEXT.md. This is a documentation gap only; the implementation is sound and the requirement is effectively satisfied.

**Note on orphaned requirement IDs in plans:** Plans 02-01 references FORM-07 in its `requirements` frontmatter. This is consistent with the CONTEXT.md scope extension. No unmapped REQUIREMENTS.md IDs are orphaned for Phase 2.

### Anti-Patterns Found

No blockers or warnings found in the current codebase state. All previous anti-patterns have been resolved:

| File | Line | Pattern | Severity | Resolution |
|------|------|---------|----------|------------|
| field.tsx | 57 | `BaseField.Error match={true}` | Blocker (resolved) | `match={true}` added in Plan 06 |
| input.tsx | 144 | `Field.Error match={true}` | Blocker (resolved) | `match={true}` added in Plan 06 |
| text-area.tsx | 136 | `Field.Error match={true}` | Blocker (resolved) | `match={true}` added in Plan 06 |
| switch.tsx | — | Plain `<span>` label now `<BaseField.Label>` | Warning (resolved) | CR-02 fixed in Plan 07 |
| text-area.tsx | 77 | Lazy initializer reads `defaultValue ?? value` | Warning (resolved) | WR-01 fixed in Plan 07 |
| input.tsx | 110 | `iconLabel` prop + focus ring on icon span | Warning (resolved) | WR-02 fixed in Plan 07 |
| registry.json | — | `lucide-react` removed from input deps | Warning (resolved) | WR-03 fixed in Plan 06 |

`placeholder:text-typography-muted` in input.tsx and text-area.tsx are Tailwind CSS variant modifiers (not stub placeholders). Not flagged.

No hex color literals (`#...` or `rgb(...)`) found in any Phase 2 component file. All styling uses BCT CSS variable tokens (XCUT-01 satisfied for this phase).

### Human Verification Required

#### 1. Error Text Render (post match={true} fix)

**Test:** Render `<Field errorText="Required field"><input /></Field>` (or `<Input errorText="Required field" />`) in a browser or jsdom test environment.
**Expected:** A visible element with "Required field" appears in red below the control.
**Why human:** The CR-01 analysis is based on source code reading of Base UI's FieldError implementation. Confirming the `match={true}` fix works end-to-end requires a React rendering environment (browser or @testing-library/react with jsdom).

#### 2. Switch Accessible Name

**Test:** Render `<Switch label="Enable notifications" />` and inspect the accessibility tree with a screen reader (VoiceOver, NVDA) or browser accessibility inspector (Chrome DevTools > Accessibility pane).
**Expected:** The switch element is announced as "Enable notifications, switch" (or locale equivalent).
**Why human:** Accessible name wiring via `LabelableContext` + `BaseField.Label` requires a real rendering environment. DOM attribute inspection shows the elements exist but does not confirm the name computation is correct for all assistive technologies.

### Gaps Summary

No remaining programmatic gaps. All four ROADMAP Success Criteria are verified:

1. Field / Fieldset / Form compose into labeled forms with error text, helper text, required markers, legend, and onSubmit passthrough — all structural elements correct, error text now renders via `match={true}`.
2. Input forwards ref to native `<input>`, supports size/inline label/error/helper, icon with accessible name and focus ring.
3. Switch animates thumb, Toggle exposes variant/size/pressed — both `forwardRef` with `displayName`.
4. All Phase 2 components forward ref and accept `className` / `classNames` per Phase 0 vocabulary.

Two human verification items remain (error text render confirmation and switch accessible name) before the phase can be marked `passed`.

---

_Verified: 2026-04-22T09:50:00Z_
_Verifier: Claude (gsd-verifier)_
