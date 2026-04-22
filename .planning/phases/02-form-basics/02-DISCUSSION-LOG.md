# Phase 2: Form Basics - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-22
**Phase:** 02-form-basics
**Areas discussed:** TextArea inclusion, Input icon props, Toggle visual design, Form component scope

---

## TextArea Inclusion

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — add as FORM-07 | Mirrors Input prop shape (label, helperText, errorText, size, ref to `<textarea>`). 0.4.0 had text-area.tsx so consumers may expect it. | ✓ |
| No — defer to a future phase | Phase 2 stays at 6 FORM-01–06 requirements. | |
| Yes — undocumented add | Add to Phase 2 implementation without creating a FORM-07 requirement. | |

**User's choice:** Yes — add as FORM-07
**Notes:** Mirrors Input API. No resize prop; JSDoc on `classNames` should document `resize-*` as override. No icon props on TextArea.

### Follow-up: TextArea resize prop

| Option | Description | Selected |
|--------|-------------|----------|
| No resize prop — use className | Consumers set resize-none / resize-y via Tailwind className override. | ✓ |
| Yes — resize prop (none \| vertical \| both) | Explicit control at prop level. | |

**User's choice:** No resize prop — use classNames. Note added: docs about resize in JSDoc for classNames.

---

## Input Icon Props

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — keep icon props | Carry forward icon / iconPosition / onIconClick from 0.4.0 TextInput. Ref still forwards to native `<input>`. | ✓ |
| No — drop icon props | Input stays a plain labeled input. | |
| Partial — icon + iconPosition only | Visual decoration without click handler. | |

**User's choice:** Yes — keep icon props
**Notes:** Icon typed as `React.ReactNode`. iconPosition defaults to "right". TextArea does NOT get icon props.

---

## Toggle Visual Design

### Pressed/unpressed appearance

| Option | Description | Selected |
|--------|-------------|----------|
| Button-style with active state | Tertiary/outlined unpressed; filled primary background when pressed. | ✓ |
| Subtle highlight only | Transparent unpressed; light tinted background pressed. | |
| Outlined with fill | Border always; fills on press. | |

**User's choice:** Button-style with active state

### Variant set

| Option | Description | Selected |
|--------|-------------|----------|
| Mirror Button subset: default \| outline \| ghost | default = filled on press, outline = border + fill, ghost = no border + tinted. | ✓ |
| Single style — no variant prop | One visual treatment; className for overrides. | |
| Full Button variants | All 9 variants matching Button. Overkill for Toggle. | |

**User's choice:** Mirror Button subset: default | outline | ghost
**Notes:** Size follows sm | md | lg. pressed/defaultPressed/onPressedChange from Base UI Toggle.Root.

---

## Form Component Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Thin wrapper: onSubmit passthrough only | Wraps Base UI Form.Root with onSubmit + children. No built-in errors map or submit button. | ✓ |
| Medium: onSubmit + errors map prop | Adds errors?: Record<string, string> prop propagated to named fields. | |
| Full: onSubmit + errors + submit button slot | Most opinionated; locks layout. | |

**User's choice:** Thin wrapper — onSubmit passthrough only
**Notes:** Consumers compose Field + Input inside. Error state handled at Field level.

---

## Claude's Discretion

- TextArea: whether to retain showCharCount / maxLength / rows from 0.4.0
- Input/TextArea: classNames slot for the native `<input>` / `<textarea>` element (not in canonical 20-slot vocabulary)
- Switch outer wrapper slot strategy (root = BaseSwitch.Root track, not outer div)
- Field internal structure and required marker
- Fieldset legend element structure
- Input size prop heights (sm/md/lg following Button pattern)
- `React.useId()` vs `Math.random()` for id generation

## Deferred Ideas

None — discussion stayed within phase scope.
