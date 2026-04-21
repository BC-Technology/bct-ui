---
phase: 00-preparation-api-design
plan: 02
subsystem: design-tokens
tags: [css, animation, tokens, index.css]
requirements: [PREP-02, PREP-03]

dependency_graph:
  requires: []
  provides:
    - "bct-drawer-* animation classes (right/left/top/bottom/backdrop)"
    - "bct-tooltip-popup animation class"
    - "bct-popover-popup animation class"
    - "bct-menu-popup animation class"
    - "bct-select-popup animation class"
    - "bct-combobox-popup animation class"
    - "bct-toast-item animation class"
    - "bct-alert-dialog-backdrop and bct-alert-dialog-popup animation classes"
    - "--z-toast: 120 z-index token"
    - "slide-in-from-top/bottom and slide-out-to-top/bottom keyframes and animate tokens"
    - "--color-border-muted and --color-border-muted-hover values in light and dark theme blocks"
  affects:
    - "packages/ui/src/registry/versions/0.5.0/components/ (all Phase 5-7 components use these classes)"

tech_stack:
  added: []
  patterns:
    - "Animation class families: component applies .bct-{component}-{variant} as first arg to twMerge on animated element"
    - "data-open/data-closed attribute-driven animation via Base UI lifecycle"
    - "forwards fill-mode on all [data-closed] rules prevents backdrop flash during multi-element close"

key_files:
  created: []
  modified:
    - packages/ui/src/assets/tokens/index.css

decisions:
  - "Used forwards fill-mode on all [data-closed] rules to prevent element snap-back during coordinated close sequences"
  - "Drawer uses slide keyframes (not scale) to match physical affordance of panel sliding off-screen"
  - "Toast uses slide-in-from-right / slide-out-to-right matching common toast UX patterns"
  - "Tooltip uses faster 100ms/75ms timing vs 150ms/100ms for popover to feel more responsive"

metrics:
  duration_minutes: 15
  completed_date: "2026-04-21"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 0 Plan 02: index.css Animation Classes and Token Gaps Summary

**One-liner:** Extended index.css with 4 top/bottom slide keyframes, --z-toast token, border-muted values, and 13 new animation class families covering all Phase 5-7 overlay components.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add missing keyframes, animation tokens, z-index token, and border-muted values | `3126304` | packages/ui/src/assets/tokens/index.css |
| 2 | Add 13 animation class families after .bct-dialog-* block | `2fe7406` | packages/ui/src/assets/tokens/index.css |

## What Was Built

Two additive edits to `packages/ui/src/assets/tokens/index.css`:

**Task 1 additions:**
- `--z-toast: 120` in the `@theme` z-index block (layers above dialogs at 110)
- Four new animation tokens: `--animate-slide-in-from-top`, `--animate-slide-out-to-top`, `--animate-slide-in-from-bottom`, `--animate-slide-out-to-bottom`
- Four new `@keyframes` inside `@theme`: `slide-in-from-top`, `slide-out-to-top`, `slide-in-from-bottom`, `slide-out-to-bottom`
- `--color-border-muted: #f0f0f0` and `--color-border-muted-hover: #e0e0e0` in the `:root` light block
- `--color-border-muted: #525252` and `--color-border-muted-hover: #666666` in the `.dark` block

**Task 2 additions — 13 animation class families:**
- `bct-drawer-right`, `bct-drawer-left`, `bct-drawer-top`, `bct-drawer-bottom` — directional Drawer slide animations
- `bct-drawer-backdrop` — fade-in/fade-out for Drawer overlay
- `bct-tooltip-popup` — fast scale-in (100ms) / scale-out (75ms)
- `bct-popover-popup` — scale-in (150ms) / scale-out (100ms)
- `bct-menu-popup` — scale-in (150ms) / scale-out (100ms) shared by Menu, ContextMenu, Menubar
- `bct-select-popup` — scale-in (150ms) / scale-out (100ms)
- `bct-combobox-popup` — scale-in (150ms) / scale-out (100ms) shared by Combobox and Autocomplete
- `bct-toast-item` — slide-in-from-right / slide-out-to-right
- `bct-alert-dialog-backdrop` — fade-in / fade-out
- `bct-alert-dialog-popup` — slide-up / scale-out

Every `[data-closed]` rule uses `forwards` fill-mode (17/17).

## Verification Results

| Check | Result |
|-------|--------|
| New keyframes count (≥8) | 12 |
| --z-toast: 120 present | Pass |
| [data-open] rules (≥17) | 17 |
| [data-closed] with forwards (≥13) | 17 |
| color-border-muted values (light + dark) | Pass |

## Deviations from Plan

### Pre-existing Out-of-Scope Issues

**Biome format violation in existing lines**
- **Found during:** Task 1 verification
- **Issue:** Lines `--animate-slide-in-from-right` through `--animate-slide-out-to-left` in the existing `@theme` animation tokens block fail Biome's line-length formatter. This exists in the committed HEAD version before any edits.
- **Action:** Logged as out-of-scope per deviation rules (pre-existing, unrelated to this plan's changes). New lines added by this plan match the same formatting pattern as the existing animation token lines.
- **Files modified:** None

## Known Stubs

None. This plan adds only CSS rules — no UI rendering, no data sources, no stub patterns applicable.

## Threat Flags

None. This plan edits only a CSS design-token file with no executable code, user input, authentication, or deployed service boundaries.

## Self-Check: PASSED

- `packages/ui/src/assets/tokens/index.css` — confirmed modified (53 + 114 lines inserted across 2 commits)
- Commit `3126304` — verified present in git log
- Commit `2fe7406` — verified present in git log
- All 13 animation class families present with 2 rules each
- All 17 `[data-closed]` rules use `forwards` fill-mode
