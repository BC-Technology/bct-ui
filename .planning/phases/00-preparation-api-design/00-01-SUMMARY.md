---
phase: 00-preparation-api-design
plan: "01"
subsystem: planning
tags: [api-spec, classnames, tokens, conventions, menuitem]
dependency_graph:
  requires: []
  provides:
    - ".planning/phases/00-preparation-api-design/00-API-SPEC.md"
  affects:
    - "packages/ui/src/registry/versions/0.5.0/components/"
tech_stack:
  added: []
  patterns:
    - "classNames 20-slot closed vocabulary (D-01, D-02)"
    - "twMerge(clsx(...), classNames?.slot, className) composition stack"
    - "React.ReactNode icon props with null=hide/undefined=default/ReactNode=replace"
    - "7-type MenuItem discriminated union owned by menu.tsx"
    - "renderItem escape hatch for items-array components"
key_files:
  created:
    - ".planning/phases/00-preparation-api-design/00-API-SPEC.md"
  modified: []
decisions:
  - "20-slot classNames vocabulary is closed — no component-specific slot additions permitted (D-01, D-02)"
  - "Icon props typed as React.ReactNode, not LucideIcon — null hides, undefined uses default, ReactNode replaces (D-09)"
  - "MenuItem 7-type discriminated union canonical owner is menu.tsx; context-menu.tsx and menubar.tsx import via registryDeps (D-07)"
  - "Token audit: PASS with two gaps — --z-toast and border-muted values both fixed in Plan 02"
metrics:
  duration_minutes: 15
  completed: "2026-04-21"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 00 Plan 01: API Spec — Slot Vocabulary, Icon Props, MenuItem Union, Token Audit Summary

**One-liner:** Authored `00-API-SPEC.md` — 341-line canonical spec covering 20-slot classNames vocabulary, 7-type MenuItem discriminated union, icon prop resolution pattern, ref forwarding targets, renderItem escape hatch, 5 pitfalls, and full token audit matrix with two gaps documented for Plan 02.

## What Was Built

A single authoritative planning document at `.planning/phases/00-preparation-api-design/00-API-SPEC.md` containing 7 sections that all Phase 1–7 component implementers must read before writing any component.

### Section Summary

| Section | Content |
|---------|---------|
| 1. classNames Slot Vocabulary | 20-slot closed vocabulary table, slot-to-component mapping, 0.4.0→0.5.0 rename table, composition stack pattern |
| 2. Icon Props Convention | 6 named override props, ReactNode typing rationale, null/undefined/ReactNode resolution pattern |
| 3. Ref Forwarding Targets | 11 form input components with forwardRef targets and native element types |
| 4. MenuItem Discriminated Union | Full TypeScript definitions for all 7 sub-interfaces (MenuItemBasic through MenuItemRadioGroup) |
| 5. renderItem Escape Hatch | Contract signature, usage pattern, Base UI compatibility constraint |
| 6. Common Pitfalls | 5 pitfalls from RESEARCH.md verbatim (fill-mode, inline Tailwind, slot drift, type duplication, LucideIcon typing) |
| 7. Token Audit | 21-row coverage matrix, 2 gaps documented with exact fix values, PASS verdict |

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Author classNames vocabulary + API conventions sections 1–6 | c867da7 | `.planning/phases/00-preparation-api-design/00-API-SPEC.md` (created) |
| 2 | Append token audit matrix (section 7) | bd62964 | `.planning/phases/00-preparation-api-design/00-API-SPEC.md` (appended) |

## Decisions Made

1. **20-slot vocabulary is final** — sections 1 and 1.1 lock it, with the rename table providing the 0.4.0→0.5.0 migration guide. No component may add a slot outside this list.

2. **React.ReactNode for all icon props** — not `LucideIcon`. Consumers pass pre-rendered JSX. The resolution pattern (`undefined` → default, `null` → hide, `ReactNode` → replace) is documented in section 2.

3. **MenuItem union canonical owner is `menu.tsx`** — `context-menu.tsx` and `menubar.tsx` use `registryDeps: ["menu"]` and `import type { MenuItem } from "./menu"` — no type duplication across files.

4. **Token audit verdict: PASS with two gaps** — all 37 target components can be implemented with existing BCT token variables. Two gaps (`--z-toast` and `border-muted` theme values) are documented with exact fix values for Plan 02.

## Deviations from Plan

None — plan executed exactly as written.

The context files (00-CONTEXT.md, 00-RESEARCH.md, 00-UI-SPEC.md) were untracked in the main repo and not present in the worktree working tree. They were copied from the main repo path to the worktree before reading — this is a routine worktree setup step, not a deviation.

## Known Stubs

None — this plan produces a planning document, not runtime code. No UI-rendering stubs exist.

## Threat Flags

None — this plan writes only a Markdown planning document. No network endpoints, auth paths, file access patterns, or schema changes were introduced.

## Self-Check: PASSED

- `.planning/phases/00-preparation-api-design/00-API-SPEC.md` — FOUND
- Commit `c867da7` — FOUND (sections 1–6)
- Commit `bd62964` — FOUND (section 7 token audit)
- All 20 slots present (cancelButton + confirmButton verified)
- MenuItemRadioGroup present (7-type union confirmed)
- Token audit PASS verdict present
- 5 pitfall subsections present
