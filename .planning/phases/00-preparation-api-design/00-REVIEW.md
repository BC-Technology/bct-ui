---
phase: 00-preparation-api-design
reviewed: 2026-04-21T00:00:00Z
depth: standard
files_reviewed: 1
files_reviewed_list:
  - packages/ui/src/assets/tokens/index.css
findings:
  critical: 0
  warning: 5
  info: 4
  total: 9
status: issues_found
---

# Phase 00: Code Review Report

**Reviewed:** 2026-04-21
**Depth:** standard
**Files Reviewed:** 1
**Status:** issues_found

## Summary

Reviewed `packages/ui/src/assets/tokens/index.css` as modified for Phase 00. The additions are largely sound: the four new slide keyframes are correctly formed, all new `--animate-*` tokens follow existing naming conventions, `--color-border-muted` / `--color-border-muted-hover` are correctly registered in `@theme` and defined in both `:root` and `.dark`, and `--z-toast: 120` is correctly placed at the top of the z-index stack. All `[data-closed]` rules include `animation-fill-mode: forwards` as required.

Five warnings were found: an asymmetric open/close animation pair on the alert dialog popup, a `slide-up` keyframe whose transform assumptions will break if the popup is not centered with the exact `translate(-50%, -50%)` trick, a potential contrast regression in the dark-mode `--color-light-on` value, and two z-index collisions that could cause stacking problems. Four informational items cover orphaned keyframes, token-vs-keyframe-name inconsistency in animation rules, and missing directional variants for toast.

---

## Warnings

### WR-01: Asymmetric open/close animation pair on `bct-alert-dialog-popup`

**File:** `packages/ui/src/assets/tokens/index.css:1181-1185`
**Issue:** `[data-open]` uses `slide-up` (a translate-based keyframe) but `[data-closed]` uses `scale-out` (a scale-based keyframe). The two animations operate on different CSS transform functions, so the closing animation does not reverse the opening motion. The popup slides in but scales out, which is visually jarring and inconsistent with every other open/close pair in this file (all others use matching in/out pairs, e.g. `scale-in` / `scale-out`, `slide-in-from-right` / `slide-out-to-right`).
**Fix:** Match the close animation to the open animation. Either use `scale-in` / `scale-out` (same as `bct-dialog-modal`) or define and use an explicit `slide-down` keyframe for the close:

```css
/* Option A — use scale pair (simplest, consistent with bct-dialog-modal) */
.bct-alert-dialog-popup[data-open] {
    animation: scale-in 200ms cubic-bezier(0, 0, 0.2, 1);
}
.bct-alert-dialog-popup[data-closed] {
    animation: scale-out 150ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

/* Option B — keep slide-up open, add a matching slide-down close keyframe */
@keyframes slide-down {
    0%   { transform: translate(-50%, -50%); opacity: 1; }
    100% { transform: translate(-50%, -45%); opacity: 0; }
}
.bct-alert-dialog-popup[data-open] {
    animation: slide-up 150ms ease-out;
}
.bct-alert-dialog-popup[data-closed] {
    animation: slide-down 150ms ease-in forwards;
}
```

---

### WR-02: `slide-up` keyframe bakes in a centering transform that is not self-contained

**File:** `packages/ui/src/assets/tokens/index.css:316-325`
**Issue:** The `slide-up` keyframe hardcodes `translate(-50%, -45%)` → `translate(-50%, -50%)`. This only produces the intended effect when the animated element is already positioned with `top: 50%; left: 50%` and relies on the transform to center itself. Any popup that uses a different centering strategy (e.g., CSS `margin: auto`, `inset: 0`, Flexbox centering, or Base UI's built-in positioning for `bct-alert-dialog-popup`) will get an unintended translate applied on top of its own positioning, causing it to appear off-center or fly in from the wrong position.

The `bct-alert-dialog-popup` class applies this keyframe at line 1182, making this a concrete misuse risk now.
**Fix:** Replace `slide-up` with a transform-neutral approach. Use the `scale-in` keyframe instead (no translate), or rewrite `slide-up` to use only a `translateY` offset that does not assume absolute centering:

```css
/* Rewrite slide-up to be self-contained — no centering assumption */
@keyframes slide-up {
    0%   { transform: translateY(8px); opacity: 0; }
    100% { transform: translateY(0);   opacity: 1; }
}
```

Note: if `slide-up` is currently consumed elsewhere with the centering assumption (e.g. an existing dialog), verify those usages before changing the keyframe — or create a new keyframe name and leave `slide-up` as-is for backwards compatibility.

---

### WR-03: `--color-light-on` is `#ffffff` in dark mode — likely contrast regression

**File:** `packages/ui/src/assets/tokens/index.css:650`
**Issue:** In both light and dark mode, `--color-light` is `#f0f0f0` (a near-white color). In light mode `--color-light-on` is correctly `#000000` (black on white = high contrast). In dark mode `--color-light-on` is `#ffffff` (white on near-white = near-zero contrast). Any component that renders text using `color: var(--color-light-on)` over a `background: var(--color-light)` background in dark mode will be essentially invisible.
**Fix:** Restore the dark-mode value to match the light-mode convention:

```css
/* In .dark / [data-theme="dark"] block */
--color-light: #f0f0f0;
--color-light-on: #000000; /* black on near-white — same as light mode */
```

---

### WR-04: `--z-header`, `--z-dropdown`, and `--z-popover` all resolve to `50`

**File:** `packages/ui/src/assets/tokens/index.css:239-241`
**Issue:** Three tokens with the same z-index value means there is no guaranteed stacking order between the header, dropdowns anchored to it, and popovers. In practice, a dropdown or popover opened from a header button will paint at the same z-level as the header itself. Whether it appears above or below depends entirely on DOM order and stacking context, which is fragile. If the dropdown's container establishes a new stacking context (e.g., via `transform`, `filter`, or `will-change`), it may render behind the header's adjacent elements.
**Fix:** Separate the values to establish an explicit order:

```css
--z-header:   50;
--z-dropdown: 55;   /* above header so anchored menus always clear it */
--z-popover:  55;   /* same tier as dropdown — both float above header */
--z-tooltip:  60;   /* already correct, above dropdowns/popovers */
```

---

### WR-05: Missing `forwards` fill-mode on `bct-alert-dialog-backdrop[data-closed]` duration mismatch with popup close

**File:** `packages/ui/src/assets/tokens/index.css:1176-1179` and `1184-1185`
**Issue:** The backdrop closes in 300ms (line 1178) and the popup closes in 150ms (line 1185). As documented in the block comment at line 1036-1040, `forwards` is required so the element holds its final state while Base UI waits for the longest sibling animation to finish. The backdrop correctly has `forwards`. However the popup closes in 150ms while the backdrop takes 300ms — this means Base UI waits 300ms to unmount, during which the popup has already finished its 150ms animation. Without `forwards` on the popup's `[data-closed]` rule, the popup would snap back to its `data-open` visual state for the remaining 150ms. The current code does have `forwards` on the popup rule (line 1185), so that part is correct.

The actual bug is the duration asymmetry itself: the popup disappears visually at 150ms but the DOM node is held for 300ms (backdrop duration). During that 150ms gap the popup is invisible (held at `scale(0.95), opacity: 0` by `forwards`) but still occupies layout space and intercepts pointer events, potentially blocking clicks on content underneath the backdrop.
**Fix:** Align the durations so popup and backdrop finish together, or accept the gap and ensure the popup has `pointer-events: none` when closed:

```css
/* Option A — match popup duration to backdrop */
.bct-alert-dialog-popup[data-closed] {
    animation: scale-out 300ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

/* Option B — match backdrop duration to popup */
.bct-alert-dialog-backdrop[data-closed] {
    animation: fade-out 150ms ease-out forwards;
}
```

---

## Info

### IN-01: `pulse-wave` keyframe is defined but never referenced

**File:** `packages/ui/src/assets/tokens/index.css:338-350`
**Issue:** The `@keyframes pulse-wave` block is defined inside `@theme` but has no corresponding `--animate-pulse-wave` token and is not referenced by any `bct-*` animation class. It is dead code.
**Fix:** Either add a token and a consumer, or remove the keyframe to keep `@theme` clean:

```css
/* Remove if unused */
/* @keyframes pulse-wave { ... } */

/* Or add a token if it will be used by a spinner/skeleton component */
--animate-pulse-wave: pulse-wave 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
```

---

### IN-02: Animation classes reference keyframe names directly instead of `--animate-*` tokens

**File:** `packages/ui/src/assets/tokens/index.css:1043-1185` (all `bct-*` animation rules)
**Issue:** The `@theme` block defines `--animate-*` custom properties (e.g. `--animate-scale-in`, `--animate-slide-in-from-right`) with duration and easing baked in, but all `bct-*` animation classes use raw keyframe names with inline duration/easing values (e.g. `animation: scale-in 150ms cubic-bezier(0, 0, 0.2, 1)`). The tokens are bypassed entirely. This means the token values and the class values can drift independently — if a token's duration is changed, none of the `bct-*` classes update.

This is an info-level consistency gap, not a runtime bug, since the classes define their own complete `animation` shorthand.
**Fix:** Either consume the tokens in the classes, or document that the `--animate-*` tokens are intended for direct Tailwind utility usage (e.g. `animation-[var(--animate-scale-in)]`) and the `bct-*` classes intentionally use component-specific timing that may differ. The latter is a valid design choice but should be a deliberate one.

---

### IN-03: `bct-toast-item` only has a slide-in-from-right / slide-out-to-right variant

**File:** `packages/ui/src/assets/tokens/index.css:1163-1168`
**Issue:** Toast notifications commonly appear from multiple screen edges (bottom-center, top-right, bottom-left, etc.). The current implementation hardcodes right-edge animation. If a toast component supports `position` variants, it will need additional animation classes. No other directional toast variants exist.
**Fix:** No immediate action required if the toast component only supports right-edge positioning in 0.5.0. Add a note in the toast component's API design doc that the animation class must be extended when additional positions are added.

---

### IN-04: `fade-in-50` / `fade-out-50` keyframes and tokens have no `bct-*` consumer

**File:** `packages/ui/src/assets/tokens/index.css:289-314` and `220-222`
**Issue:** `@keyframes fade-in-50` and `@keyframes fade-out-50` (and their `--animate-fade-in-50` / `--animate-fade-out-50` tokens) are defined but not used by any `bct-*` class. These appear to be from a pre-existing version. Not harmful, but they add dead weight.
**Fix:** Keep if a planned component (e.g. overlay, skeleton) will use them; otherwise remove to reduce bundle size.

---

_Reviewed: 2026-04-21_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
