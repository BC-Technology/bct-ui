---
phase: 1
slug: foundation-components
status: draft
nyquist_compliant: true
wave_0_complete: true
wave_0_plan: "01-01"
wave_0_task: 3
created: 2026-04-21
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (via `packages/ui`) |
| **Config file** | `packages/ui/vitest.config.ts` (or none — Wave 0 installs) |
| **Quick run command** | `pnpm --filter @bctechnology/ui test --run` |
| **Full suite command** | `pnpm --filter @bctechnology/ui test --run && pnpm --filter @bctechnology/ui typecheck` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `pnpm --filter @bctechnology/ui test --run`
- **After every plan wave:** Run `pnpm --filter @bctechnology/ui test --run && pnpm --filter @bctechnology/ui typecheck`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | INFRA-01 | — | N/A | smoke | `test -d packages/ui/src/registry/versions/0.5.0 && test -f packages/ui/src/registry/versions/0.5.0/registry.json` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-01 | — | N/A | unit | `pnpm --filter @bctechnology/ui test --run -- button` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-02 | — | N/A | unit | `pnpm --filter @bctechnology/ui test --run -- separator` | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-03 | — | N/A | unit | `pnpm --filter @bctechnology/ui test --run -- avatar` | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 1 | FOUND-04 | — | N/A | unit | `pnpm --filter @bctechnology/ui test --run -- progress` | ❌ W0 | ⬜ pending |
| 1-01-06 | 01 | 1 | FOUND-05 | — | N/A | unit | `pnpm --filter @bctechnology/ui test --run -- meter` | ❌ W0 | ⬜ pending |
| 1-02-01 | 02 | 2 | INFRA-02 | — | N/A | smoke | `node -e "const r=require('./packages/ui/src/registry/versions/0.5.0/registry.json'); ['button','separator','avatar','progress','meter'].forEach(k=>{ if(!r[k]) throw new Error('missing: '+k) }); console.log('ok')"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Wave 0 setup is performed by **Plan 01-01, Task 3**. All three requirements below are authored in that task as part of Wave 1 execution. Plans 01-02 and 01-03 (Wave 2) depend on these files existing before they can run.

- [x] `packages/ui/src/registry/versions/0.5.0/__tests__/components.test.ts` — stubs for FOUND-01 through FOUND-05 (authored by 01-01 Task 3)
- [x] `packages/ui/vitest.config.ts` — installed and configured by 01-01 Task 3
- [x] `packages/ui/src/registry/versions/0.5.0/` — directory + registry.json skeleton (authored by 01-01 Task 1)

*Wave 0 is complete after Plan 01-01 executes. Plans 01-02 and 01-03 must not run until Plan 01-01 is done (enforced by wave=2 and depends_on=["01-01"] in their frontmatter).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `bct add button` copies a renderable file to `src/components/` | INFRA-01 | CLI side-effect requires a real consumer project | Run `bct add button` in a fresh Vite project, verify `src/components/button.tsx` exists and renders |
| All variants render without visual regressions | FOUND-01 | Visual output requires browser inspection | Open docs preview page, cycle through all 9 `variant` + 3 `size` combinations |
| Avatar fallback shows when image 404s | FOUND-03 | Network behavior not unit-testable | Pass a broken `src` URL, verify fallback text renders |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies (Wave 0 is Plan 01-01 Task 3)
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (vitest + test stubs + registry scaffold in Plan 01-01 Task 3)
- [x] No watch-mode flags
- [x] Feedback latency < 20s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved (Wave 0 completed by Plan 01-01 Task 3; Plans 01-02 and 01-03 append vitest run to biome check per automated verify)
