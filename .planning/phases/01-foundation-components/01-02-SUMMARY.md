---
plan: 01-02
phase: 01-foundation-components
status: complete
completed: 2026-04-21
tasks_total: 2
tasks_complete: 2
---

## Summary

Implemented `button.tsx` and `separator.tsx` as single-file registry components for the 0.5.0 registry. Both components pass `pnpm biome check` with zero errors.

## What Was Built

### button.tsx
- 9 variants: primary, secondary, tertiary, error, success, warning, info, text, icon
- 3 sizes: sm (h-8), md (h-10), lg (h-12)
- Icon variant produces square sizing (h-N w-N p-0 regardless of size)
- `classNames.root` slot exposed for consumer overrides
- No `-muted` variants; no `bg-accent` (uses `bg-surface-1-hover` per XCUT-01)
- `active:scale-[0.98]` on all variants for tactile feedback
- Built on `@base-ui/react/button` with no "use client" directive needed

### separator.tsx
- `orientation` prop: "horizontal" (w-full h-px) | "vertical" (h-full w-px)
- `bg-divider` token for separator line color
- `classNames.root` slot exposed
- No "use client" directive (purely presentational)
- Built on `@base-ui/react/separator`

## Key Files

### Created
- `packages/ui/src/registry/versions/0.5.0/components/button.tsx`
- `packages/ui/src/registry/versions/0.5.0/components/separator.tsx`

## Test Status

Both button and separator test stubs pass (export-exists checks via dynamic import). Avatar, progress, and meter stubs were unblocked with minimal function stubs so the full test suite could run — overwritten by plan 01-03 real implementations.

## Deviations

None from the plan spec. Biome auto-fix applied class ordering on button.tsx (useSortedClasses). Added minimal stubs for avatar/progress/meter to unblock test runner — these were overwritten by plan 01-03 implementations post-merge.

## Self-Check: PASSED
