---
phase: 01-foundation-components
reviewed: 2026-04-21T00:00:00Z
depth: standard
files_reviewed: 13
files_reviewed_list:
  - packages/ui/package.json
  - packages/ui/src/assets/tokens/index.css
  - packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts
  - packages/ui/src/registry/versions/0.5.0/components/avatar.tsx
  - packages/ui/src/registry/versions/0.5.0/components/button.tsx
  - packages/ui/src/registry/versions/0.5.0/components/meter.tsx
  - packages/ui/src/registry/versions/0.5.0/components/progress.tsx
  - packages/ui/src/registry/versions/0.5.0/components/separator.tsx
  - packages/ui/src/registry/versions/0.5.0/registry.json
  - packages/ui/tsconfig.json
  - packages/ui/vitest.config.ts
  - apps/docs/components/docs/component-preview.tsx
  - packages/ui/src/registry/versions/0.4.0/components/dialog.tsx
findings:
  critical: 0
  warning: 5
  info: 5
  total: 10
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-04-21
**Depth:** standard
**Files Reviewed:** 13
**Status:** issues_found

## Summary

This review covers the Wave 0 foundation components for v0.5.0 (button, separator, avatar, progress, meter), plus supporting infrastructure files (package.json, tsconfig, vitest config, index.css, registry.json) and the docs component-preview. No critical issues were found. Five warnings flag bugs or logic errors that could cause incorrect runtime behaviour; five info items flag code quality and consistency issues.

The component implementations are generally well-structured and follow established project conventions. The most impactful issues are: (1) the `tsconfig.json` `exclude` glob that silently omits the `__tests__` directory from type-checking, (2) a prop-type mismatch in `progress.tsx` where the interface declares `value?: number | null` but the default of `0` widens the actual prop to always be `number`, hiding the `null` indeterminate path from callers who rely on the prop being optional, (3) the `aria-label` on the Meter root is redundant and conflicts with an already-rendered `<BaseMeter.Label>`, and (4) the package version (`"0.3.0"`) has not been bumped to `0.5.0` to match the registry being written.

---

## Warnings

### WR-01: tsconfig.json excludes the `__tests__` directory — tests are never type-checked

**File:** `packages/ui/tsconfig.json:7`
**Issue:** The `exclude` pattern `"src/registry/versions/*/components/**/*"` uses `components/**/*` but the test files live at `src/registry/versions/0.5.0/__tests__/`. This means the `__tests__` folder is currently excluded from `tsc --noEmit` and will never surface type errors in tests. The test file imports from `../components/button` etc., so any interface mismatch would go unnoticed during `pnpm typecheck`.
**Fix:** Narrow the exclude to target only the component source files and leave `__tests__` in scope:
```json
"exclude": ["src/registry/versions/*/components/**/*"]
```
becomes:
```json
"exclude": ["src/registry/versions/*/components/**/*.tsx"]
```
Or, if the intent is to exclude the entire registry from compilation (registry files are copied verbatim, not built), add a separate include for the `__tests__` directory:
```json
"include": ["src/**/*.ts", "src/**/*.tsx"],
"exclude": [
  "src/registry/versions/*/components/**/*",
  "src/registry/versions/*/__tests__/**/*"
]
```
The second form is preferable — it makes the deliberate exclusion of test files explicit.

---

### WR-02: `progress.tsx` — `value?: number | null` interface vs. default `0` makes indeterminate state unreachable without explicit `null`

**File:** `packages/ui/src/registry/versions/0.5.0/components/progress.tsx:9-11,21`
**Issue:** `ProgressProps` declares `value?: number | null`, signalling that callers can pass `null` for the indeterminate animation. However, the function parameter defaults `value = 0`. This means a caller who omits `value` entirely gets `0` (no progress) not `null` (indeterminate). More importantly, the `clsx` condition at line 47 checks `value === null` to apply `bct-progress-indeterminate`, so the indeterminate state can only ever be reached by explicitly passing `value={null}`, which requires the caller to know this internal contract. The prop description in the type is silent on this. This is a usability bug: there is no way to get an indeterminate progress bar without reading the source.

**Fix:** Add a dedicated `indeterminate` boolean prop, or document the `null` contract clearly and change the default to `null` if indeterminate-by-default is desired. At minimum, change the default so omitting `value` does not silently suppress the animation:
```tsx
export function Progress({
  value = null,   // indeterminate when not provided
  min = 0,
  max = 100,
  ...
}: ProgressProps) {
```
If `0` is the intended default, keep `value = 0` but add a JSDoc comment to `value` in the interface:
```tsx
/**
 * Current progress value. Pass `null` for indeterminate (animated) state.
 * @default 0
 */
value?: number | null
```

---

### WR-03: `meter.tsx` — duplicate accessible label: both `aria-label` and `<BaseMeter.Label>` are rendered simultaneously

**File:** `packages/ui/src/registry/versions/0.5.0/components/meter.tsx:44-46`
**Issue:** When `label` is provided, the component renders a visible `<BaseMeter.Label>` child (line 33) AND passes `aria-label={label}` to `<BaseMeter.Root>` (line 46). ARIA spec treats `aria-label` as overriding the associated label element. The result is that the visible label text and the `aria-label` string are both present, which causes screen readers to announce the label twice in some implementations and creates a maintenance hazard (they can diverge). The `<BaseMeter.Label>` sub-component exists precisely to provide the accessible association — the explicit `aria-label` is redundant and potentially harmful.
**Fix:** Remove the `aria-label` from `<BaseMeter.Root>` when a label is provided (or always, since `<BaseMeter.Label>` handles association internally via Base UI):
```tsx
<BaseMeter.Root
  value={value}
  min={min}
  max={max}
  // aria-label removed — BaseMeter.Label provides the accessible name
  className={...}
  {...props}
>
```
If an `aria-label` fallback for the no-label case is desired, use it conditionally:
```tsx
aria-label={label == null ? "Meter" : undefined}
```

---

### WR-04: `avatar.tsx` — empty string `src` passed to `<BaseAvatar.Image>` when no `src` prop provided

**File:** `packages/ui/src/registry/versions/0.5.0/components/avatar.tsx:80`
**Issue:** `src={src ?? ""}` is passed to `<BaseAvatar.Image>`. When no `src` is provided, this causes the browser to fetch the current page URL as the image source (an empty `src` resolves to the document base). This can produce an unexpected network request and may interfere with Base UI's fallback detection logic, which typically relies on the image load failing or the `src` being absent/null.
**Fix:** Do not render `<BaseAvatar.Image>` at all when `src` is absent, or pass `src` conditionally. If Base UI requires the Image sub-component to always be present (for its internal state machine), pass the original value without the null-coalescing empty string:
```tsx
<BaseAvatar.Image
  src={src}          // let Base UI handle undefined/missing src
  alt={alt ?? "Avatar"}
  className={twMerge("size-full object-cover", classNames?.image)}
/>
```

---

### WR-05: `package.json` — published package version is `"0.3.0"` while registry targets `0.5.0`

**File:** `packages/ui/package.json:3`
**Issue:** The `"version"` field is `"0.3.0"`, but the CLI fetches component source from GitHub at the tag matching the installed package version (per CLAUDE.md architecture notes). If the package is published at `0.3.0`, `bct add <component>` will attempt to fetch from a `v0.3.0` tag which does not contain the `0.5.0` registry. The `prepublishOnly` script runs `verify-registry-version.mjs`; if that script checks for version/registry alignment it would catch this before publish, but the mismatch is still a bug that will silently break the registry lookup for any pre-publish `bct add` invocations (e.g., local linking).
**Fix:** Bump the package version to `0.5.0` to match the registry being authored:
```json
"version": "0.5.0"
```

---

## Info

### IN-01: `components.test.ts` — test descriptions claim to verify `ButtonProps` export but assertions only check function shape

**File:** `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts:7-30`
**Issue:** All five test descriptions say "exports Button and ButtonProps" (etc.), but the assertions only check `typeof mod.Button === "function"`. The exported interface types (`ButtonProps`, `SeparatorProps`, etc.) are erased at runtime — they cannot be asserted with `typeof`. The test descriptions create a false impression of coverage. No actual export assertion exists for the `Props` types.
**Fix:** Either remove the `Props` mention from the descriptions to match what is actually verified:
```ts
it("button.tsx exports Button", async () => {
```
Or add a meaningful structural check if a runtime object is desired:
```ts
expect(mod.Button.length).toBeGreaterThanOrEqual(0) // has a callable signature
```

---

### IN-02: `button.tsx` — `sizeStyles` object recreated on every render

**File:** `packages/ui/src/registry/versions/0.5.0/components/button.tsx:88-92`
**Issue:** `const sizeStyles: Record<string, string> = { ... }` is defined inside the `Button` function body and recreates the object on every render. Unlike `VARIANT_STYLES` (module-level), this breaks the pattern established in the same file. With `variant` already captured in the closure, the object construction on every call is unnecessary overhead.
**Fix:** Move `sizeStyles` outside the component, or convert it to a two-level map keyed by `[variant === "icon"]`:
```ts
// Outside the component:
const SIZE_STYLES_ICON: Record<string, string> = {
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
  lg: "h-12 w-12 p-0",
}
const SIZE_STYLES_DEFAULT: Record<string, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
}
// Inside Button:
const sizeClass = (variant === "icon" ? SIZE_STYLES_ICON : SIZE_STYLES_DEFAULT)[size]
```

---

### IN-03: `component-preview.tsx` — `containerRef` declared but never used

**File:** `apps/docs/components/docs/component-preview.tsx:29`
**Issue:** `const containerRef = useRef<HTMLDivElement>(null)` is declared at line 29 but the ref is never attached to a DOM element (`ref={containerRef}` is absent from the JSX). This is dead code and will trigger the `noUnusedLocals` lint rule if it is enabled.
**Fix:** Remove the unused ref:
```tsx
// Remove this line:
const containerRef = useRef<HTMLDivElement>(null)
```
If the ref was intended for a future feature (e.g., measuring the preview container), add a comment explaining the intent.

---

### IN-04: `index.css` — `@keyframes pulse-wave` defined but never referenced by an `--animate-*` token

**File:** `packages/ui/src/assets/tokens/index.css:338-350`
**Issue:** `@keyframes pulse-wave` is defined in the `@theme` block but there is no corresponding `--animate-pulse-wave` token. All other keyframes in the file have matching animation tokens. This keyframe is dead code — it cannot be used via the Tailwind token system and is not reachable via a `bct-*` class in the rest of the file.
**Fix:** Either add a token:
```css
--animate-pulse-wave: pulse-wave 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
```
or remove the orphaned keyframe block.

---

### IN-05: `vitest.config.ts` — test glob only covers `.test.ts` / `.test.tsx`; no `__tests__` subdirectory pattern for future test files

**File:** `packages/ui/vitest.config.ts:7-10`
**Issue:** The `include` patterns are pinned to the `0.5.0/__tests__/` directory. When Wave 1 or later waves add test files under `0.5.0/__tests__/` or a new version directory, they will be picked up correctly for the existing version, but any test file under `src/registry/versions/0.6.0/__tests__/` etc. will be silently ignored. This is a minor operational issue rather than a bug today.
**Fix:** Consider a version-agnostic glob as a follow-up:
```ts
include: [
  "src/registry/versions/**/__tests__/**/*.test.ts",
  "src/registry/versions/**/__tests__/**/*.test.tsx",
],
```
This can be deferred until a second version's tests are authored.

---

_Reviewed: 2026-04-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
