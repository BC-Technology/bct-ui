---
phase: 2
slug: form-basics
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-22
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest ^4.1.5 |
| **Config file** | `packages/ui/vitest.config.ts` |
| **Quick run command** | `pnpm --filter @bctechnology/ui test` |
| **Full suite command** | `pnpm --filter @bctechnology/ui test` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter @bctechnology/ui test`
- **After every plan wave:** Run `pnpm --filter @bctechnology/ui test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** ~5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 2-W0-01 | Wave 0 | 0 | FORM-01 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-02 | Wave 0 | 0 | FORM-02 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-03 | Wave 0 | 0 | FORM-03 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-04 | Wave 0 | 0 | FORM-04 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-05 | Wave 0 | 0 | FORM-05 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-06 | Wave 0 | 0 | FORM-06 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |
| 2-W0-07 | Wave 0 | 0 | FORM-07 | — | N/A | unit | `pnpm --filter @bctechnology/ui test` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` — add 7 export stub tests covering FORM-01 through FORM-07 (field, fieldset, form, input, switch, toggle, text-area)

*Existing vitest infrastructure is in place; only the stub test additions are needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Switch thumb animation on state change | FORM-05 | CSS transition requires visual inspection | Toggle switch in a browser; verify thumb slides smoothly via `transition-transform duration-200` |
| Toggle pressed-state visual fill | FORM-06 | Color change requires visual verification | Click toggle in each variant (`default`, `outline`, `ghost`) and verify correct background color change |
| Fieldset `<legend>` semantic rendering | FORM-02 | Assistive technology behavior requires manual testing | Inspect DOM and verify `<legend>` element (not `<div>`) renders inside `<fieldset>`; check with screenreader |
| react-hook-form `register` wires to Input | FORM-04 | Integration behavior | Use `register()` from react-hook-form with Input; verify `ref` reaches native `<input>` and form submission captures value |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
