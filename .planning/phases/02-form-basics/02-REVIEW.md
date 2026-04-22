---
phase: 02-form-basics
reviewed: 2026-04-22T00:00:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - packages/ui/package.json
  - packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
  - packages/ui/src/registry/versions/0.5.0/components/avatar.tsx
  - packages/ui/src/registry/versions/0.5.0/components/field.tsx
  - packages/ui/src/registry/versions/0.5.0/components/fieldset.tsx
  - packages/ui/src/registry/versions/0.5.0/components/form.tsx
  - packages/ui/src/registry/versions/0.5.0/components/input.tsx
  - packages/ui/src/registry/versions/0.5.0/components/meter.tsx
  - packages/ui/src/registry/versions/0.5.0/components/progress.tsx
  - packages/ui/src/registry/versions/0.5.0/components/switch.tsx
  - packages/ui/src/registry/versions/0.5.0/components/text-area.tsx
  - packages/ui/src/registry/versions/0.5.0/components/toggle.tsx
  - packages/ui/src/registry/versions/0.5.0/registry.json
  - packages/ui/tsconfig.json
findings:
  critical: 1
  warning: 3
  info: 4
  total: 8
status: issues_found
---

# Phase 02: Code Review Report

**Reviewed:** 2026-04-22T00:00:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

All 12 component source files, the test suite, registry manifest, and tsconfig were reviewed.
The majority of components (field, fieldset, form, progress, switch, toggle, avatar) are
structurally sound. `Field.Error` correctly uses `match={true}` in all three field-bearing
components, and `Switch` correctly wraps in `BaseField.Root`/`BaseField.Label`. One crash-level
bug was found in `Meter` where the label sub-component is rendered outside its required
context. Three warnings cover a stale char-count state in `TextArea` for controlled usage, an
aria wiring conflict in `Input`, and a package version mismatch that will break publishing.
Four info items cover minor redundancies and a tsconfig gap.

---

## Critical Issues

### CR-01: `Meter.Label` rendered outside `Meter.Root` — context error at runtime

**File:** `packages/ui/src/registry/versions/0.5.0/components/meter.tsx:32-40`

**Issue:** `BaseMeter.Label` is placed as a sibling above `BaseMeter.Root` in the JSX tree.
Internally `MeterLabel` unconditionally calls `useMeterRootContext()`, which reads from a
React context provided only by `MeterRoot`. Since no `MeterRoot` has been mounted as an
ancestor of the label, this hook throws a runtime error whenever `label` is truthy. The
component is completely unusable with a label.

Verified by inspecting
`node_modules/@base-ui/react/meter/label/MeterLabel.js` — the `useMeterRootContext()` call
is unconditional and the context default value does not silently swallow the missing provider.

**Fix:** Move `BaseMeter.Label` inside `BaseMeter.Root`. Base UI places the label inside the
root and uses context plus `aria-labelledby` to associate it with the accessible value. The
outer `<div>` wrapper for layout and the `classNames.label` override remain valid.

Also remove the now-redundant `aria-label={label}` from `BaseMeter.Root` — once the label is
inside the root, Base UI wires `aria-labelledby` automatically.

```tsx
export function Meter({ value, min = 0, max = 100, label, className, classNames, ...props }: MeterProps) {
  return (
    <div className="flex flex-col gap-1">
      <BaseMeter.Root
        value={value}
        min={min}
        max={max}
        className={twMerge(
          clsx("relative h-3 w-full overflow-hidden rounded-full bg-surface-2"),
          classNames?.root,
          className,
        )}
        {...props}
      >
        {label != null && (
          <BaseMeter.Label
            className={twMerge(
              clsx("text-sm text-typography-secondary"),
              classNames?.label,
            )}
          >
            {label}
          </BaseMeter.Label>
        )}
        <BaseMeter.Track className="size-full">
          <BaseMeter.Indicator
            className={twMerge(
              clsx("h-full rounded-full bg-primary"),
              classNames?.indicator,
            )}
          />
        </BaseMeter.Track>
      </BaseMeter.Root>
    </div>
  )
}
```

---

## Warnings

### WR-01: `TextArea` char-count does not track controlled `value` prop changes

**File:** `packages/ui/src/registry/versions/0.5.0/components/text-area.tsx:77-84`

**Issue:** `charCount` state is initialized once from `props.defaultValue ?? props.value ?? ""`
and then updated only via `handleChange` (user typing events). When the component is used as a
controlled input — where the parent drives `value` externally — `charCount` goes stale after
the initial render. Programmatic value changes (form reset, paste via imperative code, parent
state updates) do not update the displayed count.

```tsx
// Current — charCount stales on controlled re-renders
const [charCount, setCharCount] = useState(() => {
  const initial = props.defaultValue ?? props.value ?? ""
  return typeof initial === "string" ? initial.length : 0
})
```

**Fix:** Derive the displayed count directly from `props.value` when the component is
controlled, falling back to internal state for uncontrolled:

```tsx
const isControlled = props.value !== undefined
const displayCount =
  isControlled && typeof props.value === "string"
    ? props.value.length
    : charCount

// Replace charCount with displayCount in the JSX:
{showCharCount && (
  <span aria-live="polite" className="text-xs text-typography-muted">
    {maxLength ? `${displayCount} / ${maxLength}` : `${displayCount}`}
  </span>
)}
```

---

### WR-02: `Input` manual `aria-describedby` overwrites Base UI's auto-wired value

**File:** `packages/ui/src/registry/versions/0.5.0/components/input.tsx:95-98`

**Issue:** `BaseInput` is internally `Field.Control`. `Field.Control` derives
`aria-describedby` from IDs registered by `Field.Description` and `Field.Error` via the
`LabelableProvider` context. The manually computed value:

```tsx
aria-describedby={errorText ? errorId : helperText ? helperId : undefined}
```

is part of `...props` → `elementProps`, which is spread last in `Field.Control`'s internal
`mergeProps` call chain, meaning it wins and overrides the auto-computed value from context.
If the IDs happen to differ from what Base UI computes (e.g. because `Field.Error`/
`Field.Description` generate their own IDs internally), the manual value may point at the
wrong elements or produce a stale reference.

The `aria-invalid={!!errorText || undefined}` on `BaseInput` is similarly redundant: `Field.Root`
already sets `invalid={!!errorText}` and `Field.Control` reflects that via `getValidationProps`
which injects `aria-invalid: true` when `state.valid === false`.

**Fix:** Remove the manual `aria-invalid` and `aria-describedby` from `BaseInput` and let
Base UI's field context handle aria wiring. Keep the explicit `id` props on `Field.Error` and
`Field.Description` since those register with `setMessageIds`:

```tsx
<BaseInput
  ref={ref}
  className={twMerge(
    INPUT_BASE,
    SIZE_STYLES[size],
    icon && iconPosition === "left" && "pl-10",
    icon && iconPosition === "right" && "pr-10",
    classNames?.content,
  )}
  {...props}
/>
```

---

### WR-03: `package.json` version is `0.3.0` but all registry paths and components target `0.5.0`

**File:** `packages/ui/package.json:3`

**Issue:** `"version": "0.3.0"` while the registry lives at
`src/registry/versions/0.5.0/` and the `prepublishOnly` script calls
`scripts/verify-registry-version.mjs`, which presumably checks that the package version
matches the registry version. Publishing will either fail at that verification step or publish
under the wrong npm tag, causing `bct add <component>` to fetch source from the wrong GitHub
release tag.

**Fix:**

```json
"version": "0.5.0",
```

---

## Info

### IN-01: `Input` manually constructs IDs that duplicate Base UI's auto-derived IDs

**File:** `packages/ui/src/registry/versions/0.5.0/components/input.tsx:66-70, 94`

**Issue:** `useId()` → `inputId` → `errorId`/`helperId` are manually derived and passed to
`BaseInput` as `id={inputId}`. `BaseInput` (`Field.Control`) already assigns a `controlId`
from its own internal ID generation via `LabelableProvider`. Passing an explicit `id` overrides
the context-derived ID. The `Field.Label` wires to the control via `aria-labelledby` through
context (not `htmlFor`), so the explicit `id` is not needed for label association either.

The manual `errorId` and `helperId` passed to `Field.Error` and `Field.Description` as `id`
props are fine and necessary — they are what registers those elements with `setMessageIds`.

**Fix:** Remove `id: idProp` from destructuring, remove `generatedId`/`inputId` generation,
and remove `id={inputId}` from `BaseInput`. The `errorId`/`helperId` for `Field.Error` and
`Field.Description` can be derived from the generated IDs of those elements if needed, or
left to Base UI's internal ID generation since `mergeProps` will still merge the context IDs.

---

### IN-02: `Switch` ref typed as `HTMLElement` — unnecessarily broad

**File:** `packages/ui/src/registry/versions/0.5.0/components/switch.tsx:41`

**Issue:** `forwardRef<HTMLElement, SwitchProps>` matches the Base UI type
(`RefAttributes<HTMLElement>`) but gives callers an `HTMLElement` typed ref, requiring a cast
to access any `HTMLSpanElement`-specific members. `BaseSwitch.Root` renders a `<span>`.

**Fix:**

```tsx
export const Switch = forwardRef<HTMLSpanElement, SwitchProps>(
```

---

### IN-03: `tsconfig.json` excludes all component files from type-checking

**File:** `packages/ui/tsconfig.json:7`

**Issue:** `"exclude": ["src/registry/versions/*/components/**/*"]` means `tsc --noEmit`
(the `typecheck` script) silently skips every component file. Type errors in any of the
reviewed components would not surface in CI.

**Fix:** This exclusion is likely intentional (components are user-land, not library code),
but it should be noted that the `typecheck` script provides no coverage for component types.
Consider a separate `tsconfig.components.json` that includes those paths and add a separate
typecheck step if type safety in components is a project goal.

---

### IN-04: Module-level style constants use redundant `clsx()` wrapping

**Files:** `packages/ui/src/registry/versions/0.5.0/components/switch.tsx:25`, `packages/ui/src/registry/versions/0.5.0/components/toggle.tsx:19`

**Issue:** `const trackStyles = clsx("…single string…")` and
`const BASE_STYLES = clsx("…single string…")` — `clsx` called with one string argument is
a no-op; it returns the string unchanged. This is harmless but wastes a call on module load
and is inconsistent with the plain-string `VARIANT_STYLES` and `SIZE_STYLES` constants in
the same files.

**Fix:** Use plain string assignment for single-argument module-level constants:

```tsx
// switch.tsx
const trackStyles =
  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full " +
  "border border-border bg-surface-2 ..."

// toggle.tsx
const BASE_STYLES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap ..."
```

Multi-argument `clsx(a, b, c)` calls in these files are intentional and correct.

---

_Reviewed: 2026-04-22T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
