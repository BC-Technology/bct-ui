---
phase: 0
slug: preparation-api-design
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-21
---

# Phase 0 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | none — Phase 0 is a documentation/CSS authoring phase |
| **Config file** | none — Wave 0 installs none |
| **Quick run command** | `pnpm biome check packages/ui/src/assets/tokens/index.css` |
| **Full suite command** | `pnpm biome check packages/ui/src/assets/tokens/index.css && grep -c "bct-" packages/ui/src/assets/tokens/index.css` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm biome check packages/ui/src/assets/tokens/index.css`
- **After every plan wave:** Run full suite command above
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 0-01-01 | 01 | 1 | PREP-01 | — | N/A | manual | `grep -c "classNames" .planning/phases/00-preparation-api-design/00-API-SPEC.md` | ✅ | ⬜ pending |
| 0-01-02 | 01 | 1 | PREP-02 | — | N/A | manual | `grep -c "css-variable" .planning/phases/00-preparation-api-design/00-API-SPEC.md` | ✅ | ⬜ pending |
| 0-02-01 | 02 | 2 | PREP-03 | — | N/A | automated | `grep -c "bct-drawer\|bct-tooltip\|bct-popover\|bct-toast" packages/ui/src/assets/tokens/index.css` | ✅ | ⬜ pending |
| 0-02-02 | 02 | 2 | PREP-04 | — | N/A | manual | `grep -c "triggerIcon\|closeIcon\|renderItem" .planning/phases/00-preparation-api-design/00-API-SPEC.md` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Phase 0 is documentation and CSS authoring only — no test framework installation needed.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Slot vocabulary closed list (20 slots) documented | PREP-01 | Document artifact, not code | Read 00-API-SPEC.md, verify all 20 slot names present and no extras |
| Token audit coverage matrix complete | PREP-02 | Requires visual inspection of matrix | Read token audit section, verify all 37 components have ✓ |
| Animation class families syntactically valid CSS | PREP-03 | CSS syntax, no test runner | Open browser or run PostCSS against index.css |
| API conventions cover all 4 areas | PREP-04 | Documentation completeness | Read API conventions section for icon props, ref forwarding, MenuItem union, renderItem |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
