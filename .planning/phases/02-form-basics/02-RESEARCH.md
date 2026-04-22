# Phase 2: Form Basics - Research

**Researched:** 2026-04-22
**Domain:** Base UI Field/Fieldset/Form/Input/Switch/Toggle primitives + TextArea wrapper
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** TextArea added to Phase 2 scope as FORM-07. Mirrors Input prop shape: `label`, `helperText`, `errorText`, `size`, ref forwards to native `<textarea>`.
- **D-02:** TextArea does NOT include `icon` / `iconPosition` / `onIconClick` props.
- **D-03:** No `resize` prop. Consumers use `resize-*` Tailwind via `className`. JSDoc on `classNames` MUST include a note: `classNames={{ root: 'resize-y' }}`.
- **D-05:** 0.5.0 Input carries forward `icon` / `iconPosition` (left|right, default right) / `onIconClick` props from 0.4.0 TextInput. Icon typed as `React.ReactNode`. Ref forwards to native `<input>` (not the icon wrapper div).
- **D-07:** Toggle uses button-style with active (pressed) state. Appears outlined/tertiary when unpressed; filled primary background when pressed.
- **D-08:** Toggle variant set: `default | outline | ghost`.
- **D-09:** Toggle size follows Button's `sm | md | lg` pattern.
- **D-10:** Toggle exposes `pressed` / `defaultPressed` / `onPressedChange` from Base UI Toggle API.
- **D-11:** `form.tsx` is a thin wrapper around Base UI `Form.Root` with `onSubmit` passthrough and renders `children`. No built-in errors map prop, no submit button, no slot structure beyond `root`.

### Claude's Discretion

- **Field (FORM-01):** Claude decides internal slot structure — `root`, `label`, `helperText`, `errorText`. `required` prop renders a visual marker (asterisk) inside the label.
- **Fieldset (FORM-02):** `root` = `<fieldset>` element, `legend` prop renders inside a `<legend>` child. Simple structural wrapper.
- **Input size prop:** `sm | md | lg` following Button's height/padding pattern (h-8/h-10/h-12 respectively).
- **Switch classNames slots:** `root` = `<BaseSwitch.Root>` (track/pill); `indicator` = `<BaseSwitch.Thumb>`; outer wrapper div receives top-level `className` only.
- **React.useId() vs Math.random():** Use `React.useId()` for stable SSR-safe id generation in Input and TextArea.
- **D-04 (Claude):** Whether to retain `showCharCount` / `maxLength` / `rows` from 0.4.0 TextArea is Claude's discretion.
- **D-06 (Claude):** Input's classNames slot for the native `<input>` element is Claude's discretion — options: omit slot or reuse `content`. Must be consistent with TextArea.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FORM-01 | `bct add field` — Field with `label`, `helperText`, `errorText`, `required` props | Base UI `Field.Root` / `Field.Label` / `Field.Error` / `Field.Description` verified; slot design documented below |
| FORM-02 | `bct add fieldset` — Fieldset with `legend` prop | Base UI `Fieldset.Root` / `Fieldset.Legend` verified; renders `<fieldset>` + `<div>` (not `<legend>`) — see Pitfall 2 |
| FORM-03 | `bct add form` — Form with `onSubmit` passthrough | Base UI `Form` generic type verified; `onFormSubmit` is the correct prop name (not `onSubmit`) — see Pitfall 1 |
| FORM-04 | `bct add input` — Input with inline label/error/helperText, `type`, `placeholder`, `size`; ref → `<input>` | Base UI `Input` + `Field.*` primitives verified; `forwardRef` pattern documented |
| FORM-05 | `bct add switch` — Switch with `label`, `checked`/`defaultChecked`, `onChange`; thumb animates | `data-checked` / `data-unchecked` attributes verified on `SwitchRoot`; `onCheckedChange` is the correct prop name |
| FORM-06 | `bct add toggle` — Toggle with `pressed`/`defaultPressed`, `size`, `variant` | Base UI `Toggle` type verified; `data-pressed` attribute confirmed; wraps `BaseToggle` directly |
| FORM-07 | TextArea (scope addition per D-01) — mirrors Input prop shape, `showCharCount`/`rows` discretionary | 0.4.0 reference reviewed; Base UI `Field.*` for structure; `forwardRef` to native `<textarea>` |
</phase_requirements>

---

## Summary

Phase 2 ships seven single-file `.tsx` form components that a developer can drop into any React project via `bct add`. Three are structural containers (Field, Fieldset, Form) and four are input primitives (Input, Switch, Toggle, TextArea). All seven wrap `@base-ui/react` primitives and follow the closed 20-slot `classNames` vocabulary from the Phase 0 API spec.

The research confirmed the exact Base UI prop names and data attributes for each primitive — several differ from intuition (e.g., Base UI Form uses `onFormSubmit` not `onSubmit`; `FieldsetLegend` renders a `<div>` not a `<legend>`; Switch exposes `onCheckedChange` not `onChange`). These details are captured in the Pitfalls section and Code Examples and must be propagated exactly to implementation tasks.

Every Phase 2 Base UI primitive carries `'use client'` in its compiled output, which means all seven bct-ui wrapper files must start with `"use client"`. The 0.4.0 reference implementations (text-input.tsx, switch.tsx, text-area.tsx) provide the structural pattern; the primary migration work is: rename slots to canonical vocabulary, replace `Math.random()` id generation with `React.useId()`, add `forwardRef`, add size props, and apply 0.5.0 API conventions.

**Primary recommendation:** Implement the three structural containers (Field, Fieldset, Form) in a single wave first, then the four input primitives (Input, Switch, Toggle, TextArea) in a second wave, adding vitest export stubs for all seven at the end.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@base-ui/react` | 1.1.0 | All primitive rendering, accessibility, keyboard handling | Locked project dep [VERIFIED: node_modules] |
| `clsx` | ^2.1.1 | Conditional class composition | Locked project dep [VERIFIED: package.json] |
| `tailwind-merge` | ^2.5.0 | Consumer className override merging | Locked project dep [VERIFIED: package.json] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `lucide-react` | ^0.460.0 | Icon rendering (Input icon prop) | Input's optional icon; no other Phase 2 component needs icons |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `React.useId()` for id generation | `Math.random()` | `useId` is SSR-safe, stable across hydration; `Math.random()` causes hydration mismatches (0.4.0 bug fixed in 0.5.0) |
| `Base UI Field.Root` as Field container | Plain `<div>` | `Field.Root` provides context that links `Field.Label`, `Field.Control`, `Field.Error`, `Field.Description` via aria without manual wiring |

**Installation:** No new packages — all deps already present in `packages/ui/package.json`. [VERIFIED: package.json]

---

## Architecture Patterns

### Recommended Project Structure

Seven new files in `packages/ui/src/registry/versions/0.5.0/components/`:

```
components/
├── field.tsx        # FORM-01 — Field container (Field.Root + Label/Error/Description)
├── fieldset.tsx     # FORM-02 — Fieldset container (Fieldset.Root + Legend)
├── form.tsx         # FORM-03 — Form wrapper (Form primitive)
├── input.tsx        # FORM-04 — Input with icon, size, inline field (Input + Field.*)
├── switch.tsx       # FORM-05 — Switch with label/description/error layout
├── toggle.tsx       # FORM-06 — Toggle with variant/size/pressed state
└── text-area.tsx    # FORM-07 — TextArea with inline field, showCharCount
```

Plus seven new entries added to `packages/ui/src/registry/versions/0.5.0/registry.json`.

### Pattern 1: forwardRef + displayName (all four input primitives)

Required for Input, Switch, Toggle, TextArea. The ref forwarding target differs per component (see table below).

```typescript
// Source: packages/ui/src/registry/versions/0.5.0/components/button.tsx (Phase 1 baseline)
// NOTE: Phase 2 inputs require forwardRef unlike stateless button
import { forwardRef } from "react"
import type * as React from "react"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, classNames, label, ...props }, ref) => {
    return (
      <Field.Root ...>
        <BaseInput ref={ref} className={...} {...props} />
      </Field.Root>
    )
  }
)
Input.displayName = "Input"
```

[VERIFIED: 00-API-SPEC.md Section 3, Base UI Input.d.ts]

**Ref forwarding targets for Phase 2:**

| Component | forwardRef target | HTMLElement type |
|-----------|------------------|-----------------|
| Input | Native `<input>` via `BaseInput` | `HTMLInputElement` |
| Switch | `BaseSwitch.Root` (`<span>`) | `HTMLElement` (SwitchRoot is `<span>`) |
| Toggle | `BaseToggle` (`<button>`) | `HTMLButtonElement` |
| TextArea | Native `<textarea>` via `Field.Control` | `HTMLTextAreaElement` |

[VERIFIED: Base UI SwitchRoot.d.ts — `React.RefAttributes<HTMLElement>`; Toggle.d.ts — `React.RefAttributes<HTMLButtonElement>`; Input.d.ts — `React.RefAttributes<HTMLInputElement>`]

### Pattern 2: "use client" directive — ALL seven Phase 2 components

Every Base UI primitive used in Phase 2 is compiled with `'use client'`. The bct-ui wrapper files must also include `"use client"` as the first line, before all imports. This matches the 0.4.0 TextArea convention and the Phase 1 avatar/progress/meter components.

[VERIFIED: inspected compiled JS for Field.Root, Fieldset.Root, Form, Input, Switch.Root, Toggle, field description/label/error modules — all carry `'use client'`]

### Pattern 3: Composition stack (from CONVENTIONS.md)

```typescript
// Outermost element
className={twMerge(
  clsx("base-classes", { "conditional-class": condition }),
  classNames?.root,
  className,
)}

// Internal named slots
className={twMerge("internal-base-classes", classNames?.label)}
```

[VERIFIED: CONVENTIONS.md, 00-API-SPEC.md Section 1]

### Pattern 4: Field.Root + Field.Label auto-association (no manual htmlFor needed)

`Field.Label` automatically associates with `Field.Control` via Base UI's `LabelableProvider` context — no `htmlFor`/`id` wiring needed when using the Base UI primitive family together.

However: the `id` prop must still be accepted on Input/TextArea for cases where consumers use their own `<label>` outside the component. `React.useId()` should generate the internal id as a fallback when `id` is not passed.

[VERIFIED: FieldLabel.d.ts, FieldRoot.js source — uses LabelableProvider context]

### Pattern 5: Toggle variant/size using Record maps (Button pattern)

Toggle follows the same `VARIANT_STYLES` / size `Record<string, string>` pattern as Button. The key addition is `data-pressed:` modifier classes for pressed-state styling.

```typescript
// Source: packages/ui/src/registry/versions/0.5.0/components/button.tsx (pattern)
const VARIANT_STYLES: Record<string, string> = {
  default: clsx(
    "border-transparent bg-transparent text-typography-primary",
    "hover:bg-surface-1-hover",
    "data-pressed:bg-primary data-pressed:text-primary-on",
  ),
  outline: clsx(
    "border border-border bg-transparent text-typography-primary",
    "hover:border-border-hover hover:bg-surface-1-hover",
    "data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-on",
  ),
  ghost: clsx(
    "border-transparent bg-transparent text-typography-primary",
    "hover:bg-surface-1-hover",
    "data-pressed:bg-surface-2 data-pressed:text-typography-primary",
  ),
}
```

[VERIFIED: button.tsx pattern; Toggle.d.ts `data-pressed` from ToggleDataAttributes.d.ts]

### Pattern 6: Form wrapper — onFormSubmit not onSubmit

Base UI Form exposes `onFormSubmit` (not `onSubmit`). Per D-11 the bct-ui `form.tsx` wrapper accepts `onSubmit` (the standard React form prop) and passes it through via native `<form>` event — or alternatively accepts `onFormSubmit` from the Base UI API. Since D-11 says "onSubmit passthrough", the implementation should accept the native `onSubmit` from the underlying `<form>` element by spreading `...props` onto the Form primitive, which accepts all `<form>` element props via `BaseUIComponentProps<'form', ...>`.

[VERIFIED: Form.d.ts — `FormProps extends BaseUIComponentProps<'form', Form.State>`; this means all native `<form>` attributes including `onSubmit` are accepted via spread]

### Anti-Patterns to Avoid

- **Using `onChange` on Switch:** Base UI SwitchRoot does not expose `onChange`. The correct prop is `onCheckedChange: (checked: boolean, eventDetails) => void`. [VERIFIED: SwitchRoot.d.ts]
- **Using `<legend>` element directly inside Fieldset:** `Fieldset.Legend` renders a `<div>` by default, not a native `<legend>`. The `root` slot (`Fieldset.Root`) renders the `<fieldset>`. To render inside a native `<legend>`, you'd need to use the `render` prop. For Phase 2, wrapping in `Fieldset.Legend` (which renders as `<div>`) is the Base UI-idiomatic approach. [VERIFIED: FieldsetLegend.d.ts — `React.RefAttributes<HTMLDivElement>`]
- **Using `data-open/data-closed` on form components:** These data attributes are for overlay components only. Form components use `data-checked`, `data-pressed`, `data-disabled`, `data-invalid` etc.
- **Slot names outside the 20-slot vocabulary:** `textarea`, `inputWrapper`, `switch`, `thumb`, `error`, `charCount` are all 0.4.0 slot names — none map to canonical 0.5.0 slots. Use `root`, `label`, `helperText`, `errorText`, `indicator`, `content` instead.
- **Forgetting forwardRef on TextArea:** The 0.4.0 TextArea does not use `forwardRef` — this is a regression from the XCUT-02 requirement. 0.5.0 must add it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Label-control aria association | Manual `htmlFor`/`id` wiring | `Field.Root` + `Field.Label` + `Field.Control` | Base UI's LabelableProvider context handles association automatically when primitives are composed together |
| Validity state / error messaging | Custom invalid prop tracking | `Field.Root invalid={!!errorText}` | Field.Root propagates `data-invalid` and validity context to all child Field.* primitives |
| Keyboard-accessible toggle button | Custom `useState` + `onKeyDown` | `Base UI Toggle` | Handles `Space`/`Enter` activation, `aria-pressed`, focus management — do not reimplement |
| Switch hidden input for form submission | Manual hidden `<input type="checkbox">` | `BaseSwitch.Root` | SwitchRoot renders its own hidden input beside the `<span>` — this is already wired for form submission |
| SSR-safe unique IDs | `Math.random()` | `React.useId()` | `React.useId()` is deterministic across server and client renders; available in React 18 (project baseline) |

**Key insight:** Using Base UI Field family primitives instead of plain HTML elements costs nothing and eliminates manual aria wiring, validation state propagation, and label association — problems that are trivially wrong when hand-rolled.

---

## Common Pitfalls

### Pitfall 1: Base UI Form uses `onFormSubmit`, not `onSubmit`
**What goes wrong:** Developer writes `<Form onSubmit={handler}>` expecting the Base UI prop — it silently does nothing because `onFormSubmit` is the Base UI-specific handler.
**Why it happens:** `onSubmit` is the native HTML event; Base UI wraps it as `onFormSubmit` with a typed `FormValues` parameter.
**How to avoid:** Per D-11, the bct-ui `form.tsx` should spread all `...props` onto Base UI `Form`, which accepts all native `<form>` attributes (including `onSubmit`) via `BaseUIComponentProps<'form', ...>`. Do NOT create a custom `onSubmit` prop — let it pass through naturally. Document in JSDoc that both `onSubmit` (native) and `onFormSubmit` (Base UI typed) work.
**Warning signs:** Submit handler never fires; TypeScript errors about `onFormSubmit` not existing.
[VERIFIED: Form.d.ts]

### Pitfall 2: FieldsetLegend renders a `<div>`, not a native `<legend>` element
**What goes wrong:** The Fieldset component renders a `<fieldset>` wrapping a `<div>` instead of `<fieldset>` + `<legend>`. The legend text is inaccessible to assistive technologies that expect a `<legend>` element.
**Why it happens:** `FieldsetLegend` defaults to rendering a `<div>` (`React.RefAttributes<HTMLDivElement>`). Base UI's docs recommend using the `render` prop to substitute a `<legend>` element when semantic HTML is needed.
**How to avoid:** Use `<Fieldset.Legend render={<legend />}>` so it renders as a native `<legend>`. This is the accessible pattern. The bct-ui `fieldset.tsx` wrapper MUST use this render override for semantic correctness.
**Warning signs:** Screenreader announces the fieldset without a group label; HTML inspector shows `<div>` where `<legend>` is expected.
[VERIFIED: FieldsetLegend.d.ts — HTMLDivElement default]

### Pitfall 3: Switch uses `onCheckedChange`, not `onChange`
**What goes wrong:** `<Switch onChange={handler}>` is silently ignored — Base UI SwitchRoot does not expose `onChange`.
**Why it happens:** React form convention uses `onChange`; Base UI uses semantically named event handlers.
**How to avoid:** The bct-ui `switch.tsx` props interface should expose `onCheckedChange?: (checked: boolean, eventDetails: ...) => void` directly from the Base UI type, or alternatively accept `onChange` as a convenience prop and forward it as `onCheckedChange`. Given D-10 (Toggle exposes `onPressedChange` directly), the consistent 0.5.0 pattern is to expose the Base UI prop name (`onCheckedChange`).
**Warning signs:** Switch state never changes when handler is provided; no TypeScript error because `onChange` passes through `...props` as a generic event.
[VERIFIED: SwitchRoot.d.ts — no `onChange` prop; `onCheckedChange` is the only handler]

### Pitfall 4: Slot vocabulary drift from 0.4.0
**What goes wrong:** Planner or implementer copies 0.4.0 classNames interface verbatim and ships `switch`, `thumb`, `textarea`, `inputWrapper`, `error`, `charCount` — all non-canonical.
**Why it happens:** 0.4.0 interfaces are in the same codebase as a tempting copy-paste source.
**How to avoid:** The 0.5.0 → 0.4.0 slot rename table in 00-API-SPEC.md must be applied at authoring time:
- `switch` → `root` (Switch component)
- `thumb` → `indicator` (Switch/Slider)
- `error` → `errorText` (all form inputs)
- `inputWrapper` → drop or reuse `content` (Input)
- `textarea` → drop or reuse `content` (TextArea)
- `charCount` → not in vocabulary — omit the slot, expose `showCharCount` as a boolean prop instead
[VERIFIED: 00-API-SPEC.md Section 1 — slot rename table]

### Pitfall 5: Missing `"use client"` on all seven components
**What goes wrong:** Component works in Vite apps but throws "React hook rules" or hydration errors in Next.js App Router when used in Server Components.
**Why it happens:** All Base UI Form-family primitives are compiled with `'use client'` internally, but the wrapper file still needs the directive to mark its own boundary.
**How to avoid:** Every Phase 2 file must begin with `"use client"` as the very first line, before any import.
[VERIFIED: inspected compiled JS for all Phase 2 Base UI primitives — all carry `'use client'`]

### Pitfall 6: forwardRef missing on TextArea (0.4.0 regression)
**What goes wrong:** `register` from react-hook-form cannot wire the textarea, because the ref never reaches the native `<textarea>` element.
**Why it happens:** 0.4.0 TextArea does not use `forwardRef`. Copying it directly would preserve this bug.
**How to avoid:** Add `forwardRef<HTMLTextAreaElement, TextAreaProps>` wrapping. Pass the forwarded ref to `Field.Control`'s `render` prop as `ref={ref}` on the `<textarea>` element.
[VERIFIED: 0.4.0 text-area.tsx — no forwardRef; 00-API-SPEC.md Section 3 documents TextArea ref target]

---

## Code Examples

Verified patterns from official sources and codebase inspection:

### Field — Base UI Field family composition
```typescript
// Source: Base UI field/index.parts.d.ts + FieldRoot.d.ts [VERIFIED]
import { Field } from "@base-ui/react/field"

// Field.Root renders <div>, propagates validity context
// Field.Label renders <label>, auto-associated via LabelableProvider
// Field.Error renders <div>, only shown when field is invalid
// Field.Description renders <div>, for helper text

<Field.Root invalid={!!errorText} className={...}>
  <Field.Label className={...}>
    {label}
    {required && <span aria-hidden="true" className="text-error ml-0.5">*</span>}
  </Field.Label>
  {children}
  {errorText && (
    <Field.Error match className={...}>{errorText}</Field.Error>
  )}
  {helperText && !errorText && (
    <Field.Description className={...}>{helperText}</Field.Description>
  )}
</Field.Root>
```

### Fieldset — with semantic `<legend>` via render prop
```typescript
// Source: FieldsetRoot.d.ts + FieldsetLegend.d.ts [VERIFIED]
import { Fieldset } from "@base-ui/react/fieldset"

// Fieldset.Root renders <fieldset>
// Fieldset.Legend renders <div> by default — override with render prop for semantic <legend>
<Fieldset.Root className={twMerge("...", classNames?.root, className)}>
  {legend && (
    <Fieldset.Legend render={<legend />} className={twMerge("...", classNames?.legend)}>
      {legend}
    </Fieldset.Legend>
  )}
  {children}
</Fieldset.Root>
```

Note: `legend` is not in the canonical 20-slot vocabulary. Since the `legend` prop renders directly inside `Fieldset.Legend`, a `classNames.legend` slot is appropriate — however it is NOT in the 20-slot vocabulary. The planner must decide: either expose no `classNames` slot for legend (consumers use CSS selectors) or note this as an approved exception. Given that `label` is in the vocabulary and legend is the fieldset equivalent of label, using `classNames?.label` for the legend element is a reasonable mapping that stays within vocabulary.

### Form — thin wrapper with native onSubmit passthrough
```typescript
// Source: Form.d.ts [VERIFIED] — FormProps extends BaseUIComponentProps<'form', Form.State>
import { Form } from "@base-ui/react/form"

// All native <form> props (including onSubmit) pass through via ...props
// onFormSubmit is the Base UI typed handler — both work
<Form
  className={twMerge("...", classNames?.root, className)}
  {...props}
>
  {children}
</Form>
```

### Input — forwardRef to native `<input>`, inline Field composition
```typescript
// Source: Input.d.ts + 0.4.0 text-input.tsx [VERIFIED]
import { Input as BaseInput } from "@base-ui/react/input"
import { Field } from "@base-ui/react/field"
import { forwardRef } from "react"

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorText, required, icon, iconPosition = "right",
     onIconClick, size = "md", className, classNames, ...props }, ref) => {
    const id = React.useId()
    const inputId = props.id ?? id

    return (
      <Field.Root invalid={!!errorText} className={twMerge("flex flex-col gap-1.5", classNames?.root, className)}>
        {label && (
          <Field.Label className={twMerge("font-medium text-sm text-typography-primary", classNames?.label)}>
            {label}
            {required && <span aria-hidden="true" className="ml-0.5 text-error">*</span>}
          </Field.Label>
        )}
        <div className="relative">
          <BaseInput
            ref={ref}
            id={inputId}
            className={twMerge(INPUT_SIZE_STYLES[size], { "pl-10": icon && iconPosition === "left", "pr-10": icon && iconPosition === "right" }, classNames?.content)}
            {...props}
          />
          {icon && <button type="button" onClick={onIconClick} className={twMerge("absolute inset-y-0 ...", classNames?.icon)}>{icon}</button>}
        </div>
        {errorText && <Field.Error match className={twMerge("text-error text-sm", classNames?.errorText)}>{errorText}</Field.Error>}
        {helperText && !errorText && <Field.Description className={twMerge("text-sm text-typography-muted", classNames?.helperText)}>{helperText}</Field.Description>}
      </Field.Root>
    )
  }
)
Input.displayName = "Input"
```

### Switch — data-checked for state styling
```typescript
// Source: SwitchRoot.d.ts + SwitchRootDataAttributes.d.ts [VERIFIED]
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import { forwardRef } from "react"

// SwitchRoot renders <span> (not <button>) with a hidden <input> alongside
// data-checked present when checked; data-unchecked present when unchecked
// classNames slot mapping: root → BaseSwitch.Root (track), indicator → BaseSwitch.Thumb
const switchStyles = clsx(
  "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full",
  "transition-colors duration-200 ease-in-out",
  "outline-none focus-visible:ring-2 focus-visible:ring-primary-focus ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "border border-border bg-surface-2 hover:bg-surface-3",
  "data-checked:border-primary data-checked:bg-primary data-checked:hover:bg-primary-hover",
)
const thumbStyles = clsx(
  "pointer-events-none inline-block size-5 rounded-full bg-surface-1 shadow-sm",
  "translate-x-0.5 transition-transform duration-200",
  "data-checked:translate-x-5",
)
// Note: outer wrapper div gets top-level className only (no classNames slot per D-decision)
```

### Toggle — data-pressed for state styling
```typescript
// Source: Toggle.d.ts + ToggleDataAttributes.d.ts [VERIFIED]
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { forwardRef } from "react"

// data-pressed attribute present when pressed === true
// Variant styles use data-pressed: modifier
const VARIANT_STYLES: Record<string, string> = {
  default: clsx(
    "border-transparent bg-transparent text-typography-primary",
    "hover:bg-surface-1-hover",
    "data-pressed:bg-primary data-pressed:text-primary-on",
  ),
  outline: clsx(
    "border border-border bg-transparent text-typography-primary",
    "hover:border-border-hover",
    "data-pressed:border-primary data-pressed:bg-primary data-pressed:text-primary-on",
  ),
  ghost: clsx(
    "border-transparent bg-transparent text-typography-primary",
    "hover:bg-surface-1-hover",
    "data-pressed:bg-surface-2",
  ),
}
```

### registry.json entries (7 components)
```json
{
  "field": {
    "title": "Field",
    "description": "Form field container with label, helper text, and error text. Wraps Base UI Field primitives.",
    "category": "form-inputs",
    "files": [{ "src": "components/field.tsx", "dst": "field.tsx" }],
    "deps": ["@base-ui/react", "clsx", "tailwind-merge"],
    "registryDeps": []
  },
  "fieldset": { ... "deps": ["@base-ui/react", "clsx", "tailwind-merge"], "registryDeps": [] },
  "form": { ... "deps": ["@base-ui/react", "clsx", "tailwind-merge"], "registryDeps": [] },
  "input": { ... "deps": ["@base-ui/react", "clsx", "lucide-react", "tailwind-merge"], "registryDeps": [] },
  "switch": { ... "deps": ["@base-ui/react", "clsx", "tailwind-merge"], "registryDeps": [] },
  "toggle": { ... "deps": ["@base-ui/react", "clsx", "tailwind-merge"], "registryDeps": [] },
  "text-area": { ... "deps": ["@base-ui/react", "clsx", "tailwind-merge"], "registryDeps": [] }
}
```

Note: `lucide-react` is only needed for `input` (icon prop). The other six components have no icon usage.
[VERIFIED: 0.5.0 registry.json format from existing entries; icon prop only in Input per CONTEXT.md]

---

## Open Design Decision: Input's native `<input>` classNames slot (D-06)

**Decision needed (Claude's discretion):** What classNames key names the native `<input>` element inside Input, and what classNames key names the native `<textarea>` inside TextArea?

**Options:**
1. **Reuse `content`** — `content` is in the canonical vocabulary and is used for "main body area". It fits semantically. TextArea would use `classNames?.content` for the `<textarea>`.
2. **No named slot** — consumers override via CSS selectors (e.g., `.my-input input { ... }`). Simpler but less ergonomic.

**Recommendation:** Use `classNames?.content` for both `Input`'s native `<input>` and `TextArea`'s native `<textarea>`. This is consistent, stays within the 20-slot vocabulary, and gives consumers a clean override path. This decision must be consistent across both components (D-06 requirement).

---

## Open Design Decision: Fieldset legend classNames slot

**Decision needed:** `legend` is not in the canonical 20-slot vocabulary, but it is a distinct styleable element.

**Recommendation:** Map `classNames?.label` to `Fieldset.Legend` — it is the fieldset-level equivalent of a field label and the `label` slot is in the canonical vocabulary. This keeps vocabulary closed while remaining meaningful. Document in JSDoc: `classNames.label — styles the legend element`.

---

## TextArea Discretionary Props (D-04)

The 0.4.0 TextArea has `showCharCount`, `maxLength`, and `rows`. Analysis of the 0.4.0 implementation:
- `rows` (default 4) — directly on `<textarea>`. Useful, low complexity. **Retain.**
- `maxLength` — passed to `<textarea>`. Required for `showCharCount` to show `/N`. **Retain if showCharCount retained.**
- `showCharCount` — requires `useState` to track character count. Adds ~8 lines of state logic. Useful for textareas. **Retain.**
- `charCount` slot — non-canonical. Use no classNames slot for the char count display; consumers override via CSS selector if needed.

**Recommendation:** Retain all three (`rows`, `maxLength`, `showCharCount`). They are already implemented in 0.4.0, add real value, and the complexity cost is minimal. This aligns with D-04 discretion.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest ^4.1.5 |
| Config file | `packages/ui/vitest.config.ts` |
| Quick run command | `pnpm --filter @bctechnology/ui test` |
| Full suite command | `pnpm --filter @bctechnology/ui test` |

[VERIFIED: packages/ui/vitest.config.ts, packages/ui/package.json]

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FORM-01 | `field.tsx` exports `Field` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-02 | `fieldset.tsx` exports `Fieldset` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-03 | `form.tsx` exports `Form` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-04 | `input.tsx` exports `Input` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-05 | `switch.tsx` exports `Switch` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-06 | `toggle.tsx` exports `Toggle` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |
| FORM-07 | `text-area.tsx` exports `TextArea` function | unit | `pnpm --filter @bctechnology/ui test` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `pnpm --filter @bctechnology/ui test`
- **Per wave merge:** `pnpm --filter @bctechnology/ui test`
- **Phase gate:** All 7 export stubs pass before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] Add 7 export stub tests to `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` — covers FORM-01 through FORM-07

---

## Environment Availability

Step 2.6: SKIPPED — Phase 2 is purely code authoring. All required tools (pnpm, node, tsup, vitest) were validated in Phase 1. No new external dependencies.

---

## Project Constraints (from CLAUDE.md)

| Constraint | Impact on Phase 2 |
|------------|------------------|
| Single-file `.tsx` per component | Each of the 7 components is one file; no shared helpers |
| Only `@base-ui/react`, `clsx`, `tailwind-merge`, `lucide-react` as deps | No new packages; `lucide-react` only in `input.tsx` |
| No inline SVG | Input icon prop is `React.ReactNode` — consumers pass Lucide icons |
| BCT tokens only — no new token names | All Phase 2 styling uses existing tokens verified in Phase 0 |
| `registry.json` entries required | 7 new entries to add with correct `deps`/`registryDeps` |
| Biome `useSortedClasses` at error level | All Tailwind classes in `clsx`/`className` must be in Biome sort order |
| `import type * as React from "react"` | Type-only React import convention; `forwardRef` imported from `"react"` directly |
| `"use client"` at top when using hooks/Base UI stateful primitives | All 7 Phase 2 components need `"use client"` — confirmed via compiled Base UI inspection |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `classNames?.content` is the correct slot name for native `<input>`/`<textarea>` — this is Claude's discretion (D-06), not yet a locked decision | Open Design Decision | Wrong slot name would violate vocabulary or be inconsistent between Input/TextArea |
| A2 | `Fieldset.Legend render={<legend />}` is the correct idiom to get a semantic `<legend>` element | Code Examples | If Base UI changed this API, the fieldset would render a `<div>` instead of `<legend>` |
| A3 | `showCharCount`, `rows`, `maxLength` retained in TextArea | TextArea Discretionary Props | If omitted, D-04 is unresolved; if included, adds minor complexity |

---

## Sources

### Primary (HIGH confidence)
- `packages/ui/node_modules/@base-ui/react/` — Type definitions and compiled source for all Phase 2 primitives [VERIFIED: direct file inspection]
  - `field/index.parts.d.ts`, `field/root/FieldRoot.d.ts`, `field/label/FieldLabel.d.ts`, `field/error/FieldError.d.ts`
  - `fieldset/root/FieldsetRoot.d.ts`, `fieldset/legend/FieldsetLegend.d.ts`
  - `form/Form.d.ts`
  - `input/Input.d.ts`
  - `switch/root/SwitchRoot.d.ts`, `switch/stateAttributesMapping.js`, `switch/root/SwitchRootDataAttributes.d.ts`
  - `toggle/Toggle.d.ts`, `toggle/ToggleDataAttributes.d.ts`
- `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — 20-slot vocabulary, slot rename table, ref forwarding targets [VERIFIED]
- `packages/ui/src/registry/versions/0.4.0/components/text-input.tsx` — 0.4.0 Input reference [VERIFIED]
- `packages/ui/src/registry/versions/0.4.0/components/switch.tsx` — 0.4.0 Switch reference [VERIFIED]
- `packages/ui/src/registry/versions/0.4.0/components/text-area.tsx` — 0.4.0 TextArea reference [VERIFIED]
- `packages/ui/src/registry/versions/0.5.0/components/button.tsx` — Phase 1 Button: variant/size Record pattern [VERIFIED]
- `packages/ui/vitest.config.ts` — Test infrastructure [VERIFIED]

### Secondary (MEDIUM confidence)
- `.planning/codebase/CONVENTIONS.md` — Coding conventions (import order, styling patterns, component shape) [VERIFIED]
- `.planning/phases/02-form-basics/02-CONTEXT.md` — User decisions D-01 through D-11 [VERIFIED]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all deps verified in node_modules and package.json
- Architecture: HIGH — Base UI type definitions inspected directly; slot names verified against API spec
- Pitfalls: HIGH — all verified against compiled Base UI source (prop names, render element types, data attributes)
- Test infrastructure: HIGH — vitest config and existing test file inspected

**Research date:** 2026-04-22
**Valid until:** 2026-05-22 (stable; Base UI 1.1.0 locked in package.json)
