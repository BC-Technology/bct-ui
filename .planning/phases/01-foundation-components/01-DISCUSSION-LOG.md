# Phase 1: Foundation Components - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-21
**Phase:** 01-foundation-components
**Areas discussed:** Button variants, Avatar backing, Progress indeterminate, Meter color zones

---

## Button Variants

| Option | Description | Selected |
|--------|-------------|----------|
| 9 per FOUND-01 | Ship exactly what the spec says. Consumers use className/classNames for custom variants. Clean break from 0.4.0's muted sprawl. | ✓ |
| 16 from 0.4.0 | Carry all -muted siblings forward for 0.4.0 parity. | |

**User's choice:** 9 per FOUND-01 (Recommended)
**Notes:** None provided. The recommended option was selected.

---

## Avatar Backing

| Option | Description | Selected |
|--------|-------------|----------|
| Base UI Avatar wrapper | Wraps Avatar.Root / Avatar.Image / Avatar.Fallback. Consistent with 0.5.0 core value. Base UI handles image load/error state natively. | ✓ |
| Custom div (like 0.4.0) | Keep the useState + onError pattern. Simpler, no new Base UI import. Diverges from 0.5.0 philosophy. | |

**User's choice:** Base UI Avatar wrapper (Recommended)
**Notes:** None provided.

### Avatar follow-up: fallbackIcon + size/shape props

| Option | Description | Selected |
|--------|-------------|----------|
| Yes to both (fallbackIcon + size + shape) | Add fallbackIcon?: ReactNode per Phase 0 D-09. Keep size (sm/md/lg/xl) and shape (circle/square) from 0.4.0. | ✓ |
| Only src/alt/fallback (strict FOUND-03) | Exactly what the spec says. No size, no shape, no icon override. | |

**User's choice:** Yes to both (Recommended)
**Notes:** FOUND-03 specifies minimum required props, not the complete prop set.

---

## Progress Indeterminate

| Option | Description | Selected |
|--------|-------------|----------|
| Include indeterminate | value={null} → pulsing animation. Base UI handles a11y. One animation class in index.css. Trivial now, annoying to retrofit later. | ✓ |
| Strictly FOUND-04 only | Only value/min/max. No indeterminate state. | |

**User's choice:** Include indeterminate (Recommended)
**Notes:** None provided.

---

## Meter Color Zones

| Option | Description | Selected |
|--------|-------------|----------|
| Single-color fill only | Uniform fill using BCT token color. getSegmentStyle complex to wrap cleanly. Zones deferred to v2. | ✓ |
| Add color zones prop | Expose zones?: { from, to, className }[] for gauge-style coloring. More work to implement. | |

**User's choice:** Single-color fill only (Recommended)
**Notes:** None provided.

---

## Claude's Discretion

- Separator `decorative` default
- Registry scaffold: 5-component entries only in Phase 1
- Progress indeterminate animation class naming in index.css
- Visual differentiation between Progress and Meter

## Deferred Ideas

- Meter color zones → v2 (no phase scheduled)
